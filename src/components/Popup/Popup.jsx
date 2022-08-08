import React from 'react';
import {Link, NavLink} from "react-router-dom";
import ButtonProfile from "../ButtonProfile/ButtonProfile";
import './Popup.css';

const Popup = ({ isProfilePopupOpen, handleProfileOpen }) => {
    return (
        <section className={`popup ${isProfilePopupOpen ? 'popup__open' : ''}`}>
            <div className='popup__container'>
                <button onClick={handleProfileOpen} className='popup__container-close'></button>
                <div className='popup__box'>
                    <NavLink exact activeClassName='popup__nav-link_active' className='popup__nav-link' to='/'>Главная</NavLink>
                    <NavLink activeClassName='popup__nav-link_active' className='popup__nav-link' to='/movies'>Фильмы</NavLink>
                    <NavLink activeClassName='popup__nav-link_active' className='popup__nav-link' to='/saved-movies'>Сохранённые фильмы</NavLink>
                </div>
                <Link className='popup__nav-link' to='/profile'>
                    <ButtonProfile />
                </Link>
            </div>
        </section>
    );
};

export default Popup;