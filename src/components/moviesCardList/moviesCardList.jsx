import React, {useState} from 'react';
import './moviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
const MoviesCardList = ({ films, handleMoreFilms, filmsRemains }) => {

    const [loading, setLoading] = useState(false);
    const { pathname } = useLocation();

    return (
        <main className='movies-cards'>
            {films.length > 0 ? (
                <ul className="movies-card-list">
                    {films.map((film) => (
                        <MoviesCard
                            key={film.id || film.movieId}
                            film={film}
                        />
                    ))}
                </ul>
            ) : (
                <div className="movies__card-text">Ничего не найдено</div>
            )}

            {filmsRemains.length > 0 && pathname !== '/saved-movies' && (
                <div className='movies-button'>
                    <button onClick={handleMoreFilms} type='button' className='movies-button__btn'>Ещё</button>
                </div>
            )}
        </main>
    );
};

export default MoviesCardList;