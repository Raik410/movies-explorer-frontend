import React from 'react';

import './Promo.css';

const Promo = () => {
    return (
        <section className='promo'>
            <h3 className='promo__title'>О проекте</h3>
            <ul className='promo__container'>
                <li className='promo__container-li'>
                    <p className='promo__container-text'>Дипломный проект включал 5 этапов</p>
                    <p className='promo__container-text-lower'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className='promo__container-li'>
                    <p className='promo__container-text'>На выполнение диплома ушло 5 недель</p>
                    <p className='promo__container-text-lower'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <ul className='promo__progress'>
                <li className='promo__progress-li blue'>
                    <p className='promo__progress-text'>1 неделя</p>
                </li>
                <li className='promo__progress-li gray'>
                    <p className='promo__progress-text'>4 недели</p>
                </li>
            </ul>
            <ul className='promo__progress padding-reset'>
                <li className='promo__progress-li white-lower'>
                    <p className='promo__progress-text'>Back-end</p>
                </li>
                <li className='promo__progress-li white-high'>
                    <p className='promo__progress-text'>Front-end</p>
                </li>
            </ul>
        </section>
    );
};

export default Promo;