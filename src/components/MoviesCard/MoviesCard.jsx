import React, {useState} from 'react';
import './MoviesCard.css';
import imageCard from '../../images/MoviesCard.png';
import Preloader from "../Preloader/Preloader";
const MoviesCard = () => {
    const [loading, setLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(true);

    return (
        <>
            {loading ? <Preloader /> : null}
            <div className='movies-card'>
                <div className='movies-card__box'>
                    <h3 className='movies-card__title'>В погоне за Бенкси</h3>
                    <p className='movies-card__text'>27 минут</p>
                </div>
                <img className='movies-card__image' alt='film' src={imageCard} />
                {isLiked
                    ? <button onClick={() => {setIsLiked(!isLiked)}} className='movies-card__button btn-active'>
                        <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 3.75L3.81905 6L9 1.5" stroke="white" stroke-width="1.5"/>
                        </svg>
                    </button>
                    : <button onClick={() => {setIsLiked(!isLiked)}} className='movies-card__button'>Сохранить</button>
                }
            </div>
        </>
    );
};

export default MoviesCard;