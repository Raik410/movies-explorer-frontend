import React from 'react';
import './Introduction.css';
import image from '../../images/text__COLOR_landing-logo.png';

const Introduction = () => {
    return (
        <section className='introduction'>
            <h2 className='introduction__title'>Учебный проект студента факультета Веб-разработки.</h2>
            <img className='introduction__image' src={image} alt='Лого'/>
        </section>
    );
};

export default Introduction;