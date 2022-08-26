import React, {useEffect, useState} from 'react';
import MoviesCardList from "../moviesCardList/moviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import {getProfile} from "../utils/MainApi";

const SavedMovies = () => {
    const [preloader, setPreloader] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [films, setFilms] = useState([]);

    useEffect(() => {
            // getProfile()
            //     .then((data) => {setFilms(data)});
            // console.log(films)
    }, []);

    return (
        <>
            <SearchForm  />
            {preloader && <Preloader />}
            {!preloader && !errorText
                &&
                <MoviesCardList films={films} filmsRemains={[]}  />
            }
        </>
    );
};

export default SavedMovies;