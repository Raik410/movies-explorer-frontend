import React, { useState } from "react";
import './App.css';
import '../../vendor/Inter Web/inter.css';
import { Switch, Route } from "react-router-dom";
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

function App() {

    const [loggedIn, setLoggedIn] = useState(true);
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

    const handleProfileOpen = () => {
        setIsProfilePopupOpen(!isProfilePopupOpen);
    }

    const handleChangeValidation = (e, setInput, setIsValid, isValid, setError) => {
        const input = e.target;
        setInput(input.value);
        setIsValid(input.validity.valid);
        !isValid ? setError(input.validationMessage) : setError('');
    }

  return (
      <>
          <Switch>
              <Route exact path='/'>
                  <Header isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen}  loggedIn={loggedIn} gray='header__gray' />
                  <Main />
                  <Footer />
              </Route>
              <Route path='/movies'>
                  <Header isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen} loggedIn={loggedIn} grayish='header__grayish' />
                  <SearchForm />
                  <MoviesCardList />
                  <MoviesButton />
                  <Footer />
              </Route>
              <Route path='/signup'>
                  <Register onChangeValidation={handleChangeValidation} />
              </Route>
              <Route path='/signin'>
                  <Login onChangeValidation={handleChangeValidation} />
              </Route>
              <Route path='/profile'>
                  <Header isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen} loggedIn={loggedIn} white='header__white' />
                  <Profile onChangeValidation={handleChangeValidation} />
              </Route>
              <Route path='/saved-movies'>
                  <Header isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen} loggedIn={loggedIn} grayish='header__grayish' />
                  <SearchForm />
                  <MoviesCardList />
                  <Footer />
              </Route>
              <Route path='*'>
                  <NotFoundPage />
              </Route>
          </Switch>
          <Popup isProfilePopupOpen={isProfilePopupOpen} handleProfileOpen={handleProfileOpen} />
      </>
  )
}

export default App;
