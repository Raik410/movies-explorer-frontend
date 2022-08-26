import React, {useEffect, useState} from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../moviesCardList/moviesCardList";
import MoviesButton from "../MoviesButton/MoviesButton";
import MoviesCard from "../MoviesCard/MoviesCard";
import {getMovies} from "../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";

const Movies = ({ savedMovies }) => {
    const [films, setFilms] = useState([]);
    const [moviesCount, setMoviesCount] = useState([]);
    const [filmsShowed, setFilmsShowed] = useState(null);
    const [filterTumbler, setFilterTumbler] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [preloader, setPreloader] = useState(false);
    const [filmsFilterTumbler, setFilmsFilterTumbler] = useState([]);
    const [filmsShowedFilterTumbler, setFilmsShowedFilterTumbler] = useState([]);

    useEffect(() => {
        setMoviesCount(getMoviesCount());
        const resize = () => setMoviesCount(getMoviesCount());
        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    const getMoviesCount = () => {
        let countMovies;
        const clientWidth = document.documentElement.clientWidth;

        if (clientWidth > 1200 && clientWidth < 900) {
            countMovies = [12, 4]
        } else if (clientWidth < 900 && clientWidth > 768) {
            countMovies = [9, 3]
        } else if (clientWidth < 768 && clientWidth > 400) {
            countMovies = [8, 2]
        } else if (clientWidth < 400) {
            countMovies = [5, 2]
        } else {
            countMovies = [12, 4]
        }

        return countMovies;
    }

    const handleMoreFilms = () => {
        const spliceFilms = films;
        const newFilmsShowed = filmsShowed.concat(spliceFilms.splice(0, moviesCount[1]));
        setFilmsShowed(newFilmsShowed);
        setFilms(spliceFilms);
    }

    async function handleSearchFilms(input) {
        setFilterTumbler(false);
        setPreloader(true);
        localStorage.setItem('filterTumbler', false);
        !input ? setErrorText('Поле пустое.') : setErrorText('');

        try {
            localStorage.setItem('inputFilms', input);
            const data = await getMovies();
            let filterFilms = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(input.toLowerCase()));
            localStorage.setItem('filterFilms', filterFilms);
            const spliceFilms = filterFilms.splice(0, moviesCount[0]);
            setFilms(filterFilms);
            setFilmsShowed(spliceFilms);
        }
        catch (err) {
            setErrorText('Произошла ошибка сервера!');
            setFilms([]);
            localStorage.removeItem('inputFilms');
            localStorage.removeItem('filterFilms');
            localStorage.removeItem('filterTumbler');
        }
        finally {
            setPreloader(false);
        }
    }

    async function handleChangeTumbler(tumbler) {
        let filterDataShowed = [];
        let filterData = [];

        if (!tumbler) {
            setFilmsFilterTumbler(films);
            setFilmsShowedFilterTumbler(filmsShowed);
            filterData = films.filter(({ duration }) => duration <= 40);
            filterDataShowed = filmsShowed.filter(({ duration }) => duration <= 40);
        } else {
            filterData = filmsFilterTumbler;
            filterDataShowed = filmsShowedFilterTumbler;
        }

        setFilmsShowed(filterDataShowed);
        setFilms(filterData);
    }

    return (
        <>
            <SearchForm errorText={errorText} onSearchFirms={handleSearchFilms} handleChangeTumbler={handleChangeTumbler} />
            {preloader && <Preloader />}
            {filmsShowed !== null && !preloader && !errorText
                &&
                <MoviesCardList handleMoreFilms={handleMoreFilms} films={filmsShowed} filmsRemains={films} />
            }
        </>
    );
};

export default Movies;