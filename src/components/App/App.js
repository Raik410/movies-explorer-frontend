import React, {useEffect, useState} from "react";
import './App.css';
import '../../vendor/Inter Web/inter.css';
import {Route, Switch, useHistory} from "react-router-dom";
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
import {getProfile, login, register, token, updateProfile} from "../utils/MainApi";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import {UserContext} from "../../context/userContext";
import ProtectedRoute from "../ProtectedRouter/ProtectedRouter";

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
                history.push('/signin')
            })
            .catch(() => {
                setInfoToolTip({isOpen: true, status: false, messageText: "Что-то пошло не так."})
            })
    };

    const handleLogin = ({email, password}) => {
        return login(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    tokenCheck();
                    return data;
                }
            })
            .catch((err) => {
                console.log('Ошибка входа', err)
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
                setInfoToolTip({isOpen: true, status: false, messageText: "Что-то пошло не так."})
            })
    }

    const tokenCheck = () => {
        if (localStorage.getItem('token')) {
            let jwt = localStorage.getItem('token')
            token(jwt)
                .then((res) => {
                    if (res) {
                        setUser(res);
                        setLoggedIn(true);
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
                    <Route path='/signup'>
                        <Register onLogin={handleLogin} onRegister={handleRegister} onChangeValidation={handleChangeValidation}/>
                    </Route>
                    <Route path='/signin'>
                        <Login onLogin={handleLogin} onChangeValidation={handleChangeValidation}/>
                    </Route>
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
