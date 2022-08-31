import React, { useEffect, useState } from "react";
import MoviesCardList from "../moviesCardList/moviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { deleteMovies, getMoviesMy } from "../../utils/MainApi";

const SavedMovies = () => {
    const [preloader, setPreloader] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [films, setFilms] = useState([]);
    const [filmsShowed, setFilmsShowed] = useState([]);
    const [allFilms, setAllFilms] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [filmsShort, setFilmsShort] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const getMoviesSave = async () => {
            setPreloader(true);
            try {
                const data = await getMoviesMy();
                setAllFilms(data);
                setFilmsShowed(data);
                setFilmsShort(data.filter(({ duration }) => duration <= 40));
            } catch (err) {
                console.log("Error", err);
            } finally {
                setPreloader(false);
            }
        };
        getMoviesSave();
    }, []);

    const handleSearchFilms = (input) => {
        const filterData = allFilms.filter(({ nameRU }) =>
            nameRU.toLowerCase().includes(input.toLowerCase())
        );
        const shortFilterData = filterData.filter(
            ({ duration }) => duration <= 40
        );
        filterData.length <= 0
            ? setErrorMessage("Ничего не найдено")
            : setErrorMessage("");
        if (!input) {
            setErrorText("Поле пустое");
            setPreloader(false);
        } else {
            setErrorText("");
        }
        setFilmsShowed(filterData);
        setFilmsShort(shortFilterData);
    };

    const handleMore = () => {
        // const filmMore = filmsShowed.concat(films.splice(0, moviesCount[1]));
        // setFilmsShowed(filmMore);
    };

    async function handleAddFilm(film, favorite) {
        if (!favorite) {
            try {
                await deleteMovies(film._id);
                const newFilms = await getMoviesMy();
                setFilmsShowed(newFilms);
                setFilms(newFilms);
            } catch (err) {
                console.log(`Ошибка удаления фильма`, err);
            }
        }
    }

    return (
        <>
            <SearchForm
                onSearchFilms={handleSearchFilms}
                toggle={toggle}
                setToggle={setToggle}
                errorText={errorText}
            />

            {preloader && <Preloader />}
            {errorMessage && (
                <div className="movies__card-text">Ничего не найдено</div>
            )}
            {!preloader && !errorText && (
                <MoviesCardList
                    films={allFilms}
                    filmsShowed={filmsShowed}
                    filmsRemain={films}
                    filmsSaved={allFilms}
                    handleAddFilm={handleAddFilm}
                    onShowMore={handleMore}
                    filmsShort={filmsShort}
                    toggle={toggle}
                />
            )}
        </>
    );
};

export default SavedMovies;
