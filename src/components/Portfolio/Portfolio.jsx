import React from 'react';

import './Portfolio.css';
const Portfolio = () => {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__container'>
                <li className='portfolio__container-item'>
                    <a className='portfolio__container-item-text' target='_blank' rel="noreferrer" href='https://raik410.github.io/how-to-learn/'>
                        Статичный сайт
                    </a>
                    <svg className='portfolio__svg' width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.60653 16.5241L14.9645 4.14489L14.9432 13.6903H17.2656V0.181818H3.77841L3.7571 2.48295H13.3026L0.944603 14.8622L2.60653 16.5241Z" fill="black"/>
                    </svg>
                </li>
                <li className='portfolio__container-item'>
                    <a className='portfolio__container-item-text' target='_blank' rel="noreferrer" href='https://raik410.github.io/russian-travel/'>
                        Адаптивный сайт
                    </a>
                    <svg className='portfolio__svg' width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.60653 16.5241L14.9645 4.14489L14.9432 13.6903H17.2656V0.181818H3.77841L3.7571 2.48295H13.3026L0.944603 14.8622L2.60653 16.5241Z" fill="black"/>
                    </svg>
                </li>
                <li className='portfolio__container-item'>
                    <a className='portfolio__container-item-text' target='_blank' rel="noreferrer" href='https://mesto.raiki.nomoredomains.xyz'>
                        Одностраничное приложение
                    </a>
                    <svg className='portfolio__svg' width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.60653 16.5241L14.9645 4.14489L14.9432 13.6903H17.2656V0.181818H3.77841L3.7571 2.48295H13.3026L0.944603 14.8622L2.60653 16.5241Z" fill="black"/>
                    </svg>
                </li>
            </ul>
        </section>
    );
};

export default Portfolio;