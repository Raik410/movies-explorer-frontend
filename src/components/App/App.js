import React, {useEffect, useState} from "react";
import './App.css';
import '../../vendor/Inter Web/inter.css';
import {Switch, Route, useHistory} from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Popup from "../Popup/Popup";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import MoviesButton from "../MoviesButton/MoviesButton";
import MoviesCardList from "../moviesCardList/moviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import {getProfile, login, register, token, updateProfile} from "../utils/MainApi";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import {UserContext} from "../../context/userContext";

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

    const handleRegister = ({ name, email, password }) => {
        return register(name, email, password)
            .then(() => {
                setInfoToolTip({isOpen: true, status: true, messageText: "Вы успешно зарегистрировались!"})
                console.log('ok')
            })
            .catch(() => {
                setInfoToolTip({isOpen: true, status: false, messageText: "Что-то пошло не так."})
            })
    };

    const handleLogin = ({ email, password }) => {
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

    const handleUpdateProfile = ({ name, email }) => {
        return updateProfile(name, email)
            .then((data) => {
                setUser(data);
            })
            .catch((err) => {
                console.log('Ошибка редактирования профиля', err)
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
                        history.push('/movies')
                    }
                })
                .catch((err) => console.log(`Ошибка токена ${err}`));
        }
    }

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
        history.push('/signin');
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
                  <Header isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen}  loggedIn={loggedIn} gray='header__gray' />
                  <Main />
                  <Footer />
              </Route>
              <Route path='/movies'>
                  <Header isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen} loggedIn={loggedIn} grayish='header__grayish' />
                  <Movies />
                  <Footer />
              </Route>
              <Route path='/signup'>
                  <Register onRegister={handleRegister} onChangeValidation={handleChangeValidation} />
              </Route>
              <Route path='/signin'>
                  <Login onLogin={handleLogin} onChangeValidation={handleChangeValidation} />
              </Route>
              <Route path='/profile'>
                  <Header isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen} loggedIn={loggedIn} white='header__white' />
                  <Profile onUpdateProfile={handleUpdateProfile} onSignOut={signOut} onChangeValidation={handleChangeValidation} />
              </Route>
              <Route path='/saved-movies'>
                  <Header isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen} loggedIn={loggedIn} grayish='header__grayish' />
                  <SavedMovies />
                  <Footer />
              </Route>
              <Route path='*'>
                  <NotFoundPage />
              </Route>
          </Switch>
          <Popup isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen} />
          <InfoToolTip isOpen={infoToolTip.isOpen} config={infoToolTip} onClose={closeInfoPopup} />
      </>
      </UserContext.Provider>
  )
}

export default App;
