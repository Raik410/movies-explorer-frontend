import React from 'react';
import './moviesCardList.css';
const MoviesCardList = ({ children }) => {
    return (
        <section className='movies-card-list'>
            {children}
        </section>
    );
};

export default MoviesCardList;