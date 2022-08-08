import React from 'react';
import './Techs.css';
const Techs = () => {
    return (
        <section className='techs'>
            <h2 className='techs__chapter'>Технологии</h2>
            <div className='techs__box'>
                <h3 className='techs__title'>7 технологий</h3>
                <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className='techs__container'>
                    <li className='techs__container-items'>HTML</li>
                    <li className='techs__container-items'>CSS</li>
                    <li className='techs__container-items'>JS</li>
                    <li className='techs__container-items'>React</li>
                    <li className='techs__container-items'>Git</li>
                    <li className='techs__container-items'>Express.js</li>
                    <li className='techs__container-items'>mongoDB</li>
                </ul>
            </div>
        </section>
    );
};

export default Techs;