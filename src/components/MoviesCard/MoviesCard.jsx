import React, {useState} from 'react';
import './MoviesCard.css';
import imageCard from '../../images/MoviesCard.png';
import Preloader from "../Preloader/Preloader";
import ButtonSave from "../ButtonSave/ButtonSave";
import DeleteButton from "../DeleteButton/DeleteButton";
import { useLocation } from "react-router-dom";
const MoviesCard = ({ film }) => {
    const [isLiked, setIsLiked] = useState(false);
    const { pathname } = useLocation();

    return (
            <li className='movies-card'>
                <div className='movies-card__box'>
                    <h3 className='movies-card__title'>{film.nameRU}</h3>
                    <p className='movies-card__text'>{film.duration} минут</p>
                </div>
                <img className='movies-card__image' alt='film' src={`https://api.nomoreparties.co${film.image.url}`} />
                {
                    pathname !== '/saved-movies' ?
                        <ButtonSave isLiked={isLiked} onChangeLike={() => {setIsLiked(!isLiked)}}/>
                        : <DeleteButton />
                }
            </li>
    );
};

export default MoviesCard;