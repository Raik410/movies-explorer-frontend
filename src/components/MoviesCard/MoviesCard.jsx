import React, {useState} from 'react';
import './MoviesCard.css';
import imageCard from '../../images/MoviesCard.png';
import Preloader from "../Preloader/Preloader";
const MoviesCard = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            {loading ? <Preloader /> : null}
            <div className='movies-card'>
                <div className='movies-card__box'>
                    <h3 className='movies-card__title'>В погоне за Бенкси</h3>
                    <p className='movies-card__text'>27 минут</p>
                </div>
                <img className='movies-card__image' alt='film' src={imageCard} />
                <button className='movies-card__button'>Сохранить</button>
            </div>
            <div className='movies-card'>
                <div className='movies-card__box'>
                    <h3 className='movies-card__title'>В погоне за Бенкси</h3>
                    <p className='movies-card__text'>27 минут</p>
                </div>
                <img className='movies-card__image' alt='film' src={imageCard} />
                <button className='movies-card__button'>Сохранить</button>
            </div>
            <div className='movies-card'>
                <div className='movies-card__box'>
                    <h3 className='movies-card__title'>В погоне за Бенкси</h3>
                    <p className='movies-card__text'>27 минут</p>
                </div>
                <img className='movies-card__image' alt='film' src={imageCard} />
                <button className='movies-card__button'>Сохранить</button>
            </div>
            <div className='movies-card'>
                <div className='movies-card__box'>
                    <h3 className='movies-card__title'>В погоне за Бенкси</h3>
                    <p className='movies-card__text'>27 минут</p>
                </div>
                <img className='movies-card__image' alt='film' src={imageCard} />
                <button className='movies-card__button'>Сохранить</button>
            </div>
            <div className='movies-card'>
                <div className='movies-card__box'>
                    <h3 className='movies-card__title'>В погоне за Бенкси</h3>
                    <p className='movies-card__text'>27 минут</p>
                </div>
                <img className='movies-card__image' alt='film' src={imageCard} />
                <button className='movies-card__button'>Сохранить</button>
            </div>
            <div className='movies-card'>
                <div className='movies-card__box'>
                    <h3 className='movies-card__title'>В погоне за Бенкси</h3>
                    <p className='movies-card__text'>27 минут</p>
                </div>
                <img className='movies-card__image' alt='film' src={imageCard} />
                <button className='movies-card__button'>Сохранить</button>
            </div>
        </>
    );
};

export default MoviesCard;