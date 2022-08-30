import React from 'react';
import './moviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {useLocation} from "react-router-dom";

const MoviesCardList = ({
                            films,
                            filmsShowed,
                            onShowMore,
                            handleAddFilm,
                            filmsSaved,
                            toggle,
                            filmsShort
                        }) => {
    const {pathname} = useLocation();

    return (
        <main className='movies-cards'>
            <ul className="movies-card-list">
                {toggle
                    ? filmsShort.map((film) => (
                        <MoviesCard
                            key={film.id || film.movieId}
                            film={film}
                            likeMovies={handleAddFilm}
                            filmsSaved={filmsSaved}
                            toggle={toggle}
                        />
                    )) : filmsShowed.map((film) => (
                        <MoviesCard
                            key={film.id || film.movieId}
                            film={film}
                            likeMovies={handleAddFilm}
                            filmsSaved={filmsSaved}
                            toggle={toggle}
                        />
                    ))
                }
            </ul>
            {films.length > 0 && !toggle && pathname !== '/saved-movies' && (
                <div className='movies-button'>
                    <button onClick={onShowMore} type='button' className='movies-button__btn'>Ещё</button>
                </div>)
            }
            {filmsShowed.length <= 0 && filmsShort.length <= 0 &&
                <div className="movies__card-text">Ничего не найдено</div>}
        </main>
    );
};

export default MoviesCardList;
