import React from 'react';
import './NotFoundPage.css';
const NotFoundPage = () => {
    return (
        <section className='not-found'>
            <h1 className='not-found-title'>404</h1>
            <h2 className='not-found-text'>Страница не найдена</h2>
            <p className='not-found-text-link'>Назад</p>
        </section>
    );
};

export default NotFoundPage;