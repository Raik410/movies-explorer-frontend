import React, {useState} from 'react';
import './MoviesCard.css';
import imageCard from '../../images/MoviesCard.png';
import Preloader from "../Preloader/Preloader";
import ButtonSave from "../ButtonSave/ButtonSave";
import DeleteButton from "../DeleteButton/DeleteButton";
const MoviesCard = ({ savedMovie }) => {
    const [isLiked, setIsLiked] = useState(true);

    return (
        <>
            <div className='movies-card'>
                <div className='movies-card__box'>
                    <h3 className='movies-card__title'>В погоне за Бенкси</h3>
                    <p className='movies-card__text'>27 минут</p>
                </div>
                <img className='movies-card__image' alt='film' src={imageCard} />
                {
                    savedMovie ? <ButtonSave isLiked={isLiked} onChangeLike={() => {setIsLiked(!isLiked)}}/> : <DeleteButton />
                }
            </div>
        </>
    );
};

export default MoviesCard;