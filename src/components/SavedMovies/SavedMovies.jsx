import React from 'react';
import Header from "../Header/Header";
import MoviesCardList from "../moviesCardList/moviesCardList";
import Footer from "../Footer/Footer";

const SavedMovies = () => {
    return (
        <section className='saved-movies'>
            <Header grayish='header__grayish' />
            <MoviesCardList />
            <Footer />
        </section>
    );
};

export default SavedMovies;