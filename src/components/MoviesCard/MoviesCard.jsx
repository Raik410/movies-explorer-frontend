import React, {useEffect, useState} from 'react';
import './MoviesCard.css';
import ButtonSave from "../ButtonSave/ButtonSave";
import DeleteButton from "../DeleteButton/DeleteButton";
import {useLocation} from "react-router-dom";

const MoviesCard = ({film, likeMovies, filmsSaved}) => {
    // Добавленная ли карточка
    const [isLiked, setIsLiked] = useState(false);
    const {pathname} = useLocation();

    // Лайк карточке
    const handleAddLike = () => {
        const savedFilm = filmsSaved.filter((filmSaved) => {
            return filmSaved.movieId == film.id;
        })
        setIsLiked(!isLiked)
        likeMovies({...film, _id: savedFilm.length > 0 ? savedFilm[0]._id : null}, !isLiked);
    }

    const handleDislike = () => {
        likeMovies(film, false);
    }

    useEffect(() => {
        if (pathname !== '/saved-movies') {
            const savedFilm = filmsSaved.filter((obj) => {
                return obj.movieId == film.id;
            });

            if (savedFilm.length > 0) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        }
    }, [pathname, film.id, filmsSaved]);
    return (
        <li className='movies-card'>
            <div className='movies-card__box'>
                <h3 className='movies-card__title'>{film.nameRU}</h3>
                <p className='movies-card__text'>{film.duration} минут</p>
            </div>
            <a href={film.trailerLink}>
                <img className='movies-card__image' alt='film'
                     src={pathname === '/saved-movies' ? `${film.image}` : `https://api.nomoreparties.co${film.image.url}`}/>
            </a>
            {
                pathname !== '/saved-movies' ?
                    <ButtonSave onChangeLike={handleAddLike} isLiked={isLiked}/>
                    : <DeleteButton handleDislike={handleDislike}/>
            }
        </li>
    );
};

export default MoviesCard;
