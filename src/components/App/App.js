import React, {useEffect, useState} from "react";
import './App.css';
import '../../vendor/Inter Web/inter.css';
import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Popup from "../Popup/Popup";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import {getProfile, login, register, token, updateProfile} from "../../utils/MainApi";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import {UserContext} from "../../context/userContext";
import ProtectedRoute from "../ProtectedRouter/ProtectedRouter";
import LoginRouter from "../LoginRouter/LoginRouter";

function App() {
    // Стейты
    const [loggedIn, setLoggedIn] = useState(false);
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [infoToolTip, setInfoToolTip] = useState({});
    const [user, setUser] = useState({});

    // Попап
    const handleProfileOpen = () => {
        setIsProfilePopupOpen(!isProfilePopupOpen);
    }

    // Валидация
    const handleChangeValidation = (e, setInput, setIsValid, isValid, setError) => {
        const input = e.target;
        setInput(input.value);
        setIsValid(input.validity.valid);
        !isValid ? setError(input.validationMessage) : setError('');
    }

    // Регистрация
    const history = useHistory();

    const handleRegister = ({name, email, password}) => {
        return register(name, email, password)
            .then(() => {
                setInfoToolTip({isOpen: true, status: true, messageText: "Вы успешно зарегистрировались!"})
                // history.push('/signin')
                handleLogin({email, password})
                setTimeout(() => {
                    history.push('/movies')
                }, 150)
            })
            .catch((err) => {
                setInfoToolTip({isOpen: true, status: false, messageText: "Не удалось зарегистрироваться :(", err})
            })
    };

    const handleLogin = ({email, password}) => {
        return login(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    tokenCheck();
                    setTimeout(() => {
                        history.push('/movies')
                    }, 150)
                    return data;
                }
                setInfoToolTip({isOpen: true, status: true, messageText: "Вы успешно вошли!"})
            })
            .catch((err) => {
                console.log('Ошибка входа', err)
                setInfoToolTip({isOpen: true, status: true, messageText: `Ошибка входа!`})
            })
    }

    const handleUpdateProfile = ({name, email}) => {
        return updateProfile(name, email)
            .then((data) => {
                setUser(data);
                setInfoToolTip({isOpen: true, status: true, messageText: "Данные успешно изменены!"})
            })
            .catch((err) => {
                console.log('Ошибка редактирования профиля', err)
                setInfoToolTip({isOpen: true, status: false, messageText: 'Ошибка редактирования профиля'})
            })
    }

    const tokenCheck = () => {
        if (localStorage.getItem('token')) {
            let jwt = localStorage.getItem('token')
            token(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true)
                        setUser(res);
                    }
                })
                .catch((err) => console.log(`Ошибка токена ${err}`));
        }
    }

    // Проверяем есть ли токен в запросе
    useEffect(() => {
        tokenCheck();
        if (loggedIn) {
            getProfile()
                .then((user) => {
                    setUser(user);
                })
                .catch((err) => {
                    console.log(`Ошибка получения данных о пользователе ${err}`)
                })
        }
    }, [loggedIn])

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('input');
        localStorage.removeItem('toggle');
        localStorage.removeItem('films');
        history.push('/');
        setLoggedIn(false)
    }

    const closeInfoPopup = () => {
        setInfoToolTip({isOpen: false});
    }


    return (
        <UserContext.Provider value={user}>
            <>
                <Switch>
                    <Route exact path='/'>
                        <Header isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen}
                                loggedIn={loggedIn} gray='header__gray'/>
                        <Main/>
                        <Footer/>
                    </Route>
                    <ProtectedRoute loggedIn={loggedIn} path='/movies'>
                        <Header isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen}
                                loggedIn={loggedIn} grayish='header__grayish'/>
                        <Movies/>
                        <Footer/>
                    </ProtectedRoute>
                    <LoginRouter loggedIn={loggedIn} path='/signup'>
                        <Register onLogin={handleLogin} onRegister={handleRegister} onChangeValidation={handleChangeValidation}/>
                    </LoginRouter>
                    <LoginRouter loggedIn={loggedIn} path='/signin'>
                        <Login onLogin={handleLogin} onChangeValidation={handleChangeValidation}/>
                    </LoginRouter>
                    <ProtectedRoute loggedIn={loggedIn} path='/profile'>
                        <Header isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen}
                                loggedIn={loggedIn} white='header__white'/>
                        <Profile onUpdateProfile={handleUpdateProfile} onSignOut={signOut}
                                 onChangeValidation={handleChangeValidation}/>
                    </ProtectedRoute>
                    <ProtectedRoute loggedIn={loggedIn} path='/saved-movies'>
                        <Header isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen}
                                loggedIn={loggedIn} grayish='header__grayish'/>
                        <SavedMovies/>
                        <Footer/>
                    </ProtectedRoute>
                    <Route path='*'>
                        <NotFoundPage/>
                    </Route>
                </Switch>
                <Popup isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen}/>
                <InfoToolTip isOpen={infoToolTip.isOpen} config={infoToolTip} onClose={closeInfoPopup}/>
            </>
        </UserContext.Provider>
    )
}

export default App;
