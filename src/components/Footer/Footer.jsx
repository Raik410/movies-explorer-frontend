import React from 'react';

import './Footer.css';
const Footer = () => {
    return (
        <section className='footer'>
            <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__container'>
            <p className='footer__year'>© 2022</p>
            <nav className='footer__contacts'>
                <ul className='footer__contacts-container'>
                    <li className='footer__contacts-container-item'>
                        <a className='footer__contacts-container-item-text' href='https://practicum.yandex.ru/'>
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className='footer__contacts-container-item'>
                        <a className='footer__contacts-container-item-text' href='https://github.com/Raik410'>
                            Github
                        </a>
                    </li>
                    <li className='footer__contacts-container-item'>
                        <a className='footer__contacts-container-item-text' href='https://t.me/Raiki410'>
                            Telegram
                        </a>
                    </li>
                </ul>
            </nav>
            </div>
        </section>
    );
};

export default Footer;