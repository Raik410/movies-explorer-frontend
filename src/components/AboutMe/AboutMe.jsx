import React from 'react';
import './AboutMe.css';

import me from '../../images/me3.png';

const AboutMe = () => {
    return (
        <section className='about-me'>
            <h2 className='about-me__chapter'>Студент</h2>
            <img className='about-me__image' src={me} alt='Me' />
            <h3 className='about-me__name'>Никита</h3>
            <p className='about-me__subtitle'>Фронтенд-разработчик, 22 года</p>
            <p className='about-me__about'>Закончил курс Веб-разработчика от Яндекс.Практикума, живу в Сургуте планирую переезжать в другие города. Изучаю TypeScript и SQL БД.</p>
                <nav className='about-me__contact'>
                    <ul className='about-me__contact-container'>
                        <li className='about-me__contact-item'>
                            <a className='about-me__contact-item-text' href='https://t.me/Raiki410'>Telegram</a>
                        </li>
                        <li className='about-me__contact-item'>
                            <a className='about-me__contact-item-text' href='https://github.com/Raik410'>Github</a>
                        </li>
                    </ul>
                </nav>
        </section>
    );
};

export default AboutMe;