import React from 'react';
import './NotFoundPage.css';
import {useHistory} from "react-router-dom";
const NotFoundPage = () => {

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <main className='not-found'>
            <h1 className='not-found-title'>404</h1>
            <h2 className='not-found-text'>Страница не найдена</h2>
            <p onClick={goBack} className='not-found-text-link'>Назад</p>
        </main>
    );
};

export default NotFoundPage;