import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../moviesCardList/moviesCardList";
import { getMovies } from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import { addMovies, deleteMovies, getMoviesMy } from "../../utils/MainApi";

const Movies = () => {
    // Фильмы
    const [films, setFilms] = useState([]);
    // Кол-во фильмов под экран
    const [moviesCount, setMoviesCount] = useState([]);
    // Фильмы которые показываются
    const [filmsShowed, setFilmsShowed] = useState([]);
    // Текст ошибки
    const [errorText, setErrorText] = useState("");
    // Прелоадер
    const [preloader, setPreloader] = useState(false);
    // Переключатель на short фильмы
    const [toggle, setToggle] = useState(false);
    // Сохраненные фильмы
    const [filmsSave, setFilmsSave] = useState([]);
    // Короткометражные фильмы
    const [filmsShort, setFilmsShort] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");

    const [serverErrorMessage, setServerErrorMessage] = useState('');


    // Рассчитываем кол-во фильмов на страницу
    useEffect(() => {
        setMoviesCount(getMoviesCount());
        const resize = () => setMoviesCount(getMoviesCount());
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    // Рассчитываем кол-во карточек на экран + добавление карточек
    const getMoviesCount = () => {
        let countMovies;
        const clientWidth = document.documentElement.clientWidth;

        if (clientWidth > 1200 && clientWidth < 900) {
            countMovies = [12, 4];
        } else if (clientWidth < 900 && clientWidth > 768) {
            countMovies = [9, 3];
        } else if (clientWidth < 768 && clientWidth > 400) {
            countMovies = [8, 2];
        } else if (clientWidth < 400) {
            countMovies = [5, 2];
        } else {
            countMovies = [12, 4];
        }

        return countMovies;
    };

    // Поиск фильмов
    async function handleSearchFilms(input) {
        setPreloader(true);
        if (!input) {
            setErrorText("Поле пустое");
            setPreloader(false);
        } else {
            setErrorText("");
        }
        try {
            const data = await getMovies();
            const filterData = data.filter(({ nameRU }) =>
                nameRU.toLowerCase().includes(input.toLowerCase())
            );
            filterData.length <= 0
                ? setErrorMessage("Ничего не найдено")
                : setErrorMessage("");
            const shortFilterData = filterData.filter(
                ({ duration }) => duration <= 40
            );
            const shortFilterDataCopy = [...shortFilterData];
            // const filterDataCopy = [...filterData]
            localStorage.setItem("input", input);
            localStorage.setItem("toggle", toggle);
            localStorage.setItem("films", JSON.stringify(filterData));
            setFilms(filterData);
            setFilmsShowed(filterData.splice(0, moviesCount[0]));
            setFilmsShort(shortFilterDataCopy.splice(0, moviesCount[0]));
            setServerErrorMessage('')
        } catch (err) {
            console.log("Ошибка получения выбранных фильмов", err);
            setServerErrorMessage('Ошибка получения выбранных фильмов');
            localStorage.removeItem("films");
        } finally {
            setPreloader(false);
        }
    }

    const onChangeToggle = () => {
        localStorage.setItem("toggle", !toggle);
    };

    // На кнопку ещё показываем больше фильмов
    const handleShowMore = () => {
        const filmsMore = filmsShowed.concat(films.splice(0, moviesCount[1]));
        setFilmsShowed(filmsMore);
    };

    // Функция добавления фильмов
    async function handleAddFilm(film, isLiked) {
        if (isLiked) {
            const infoFilm = {
                country: film.country || "Неизвестно",
                director: film.director,
                duration: film.duration,
                year: film.year,
                description: film.description,
                image: "https://api.nomoreparties.co" + film.image.url,
                trailerLink: film.trailerLink,
                thumbnail: "https://api.nomoreparties.co" + film.image.url,
                movieId: film.id.toString(),
                nameRU: film.nameRU,
                nameEN: film.nameEN || "Неизвестно" || null,
            };
            try {
                await addMovies(infoFilm);
                const newFilmsSaved = await getMoviesMy();
                setFilmsSave(newFilmsSaved);
                setServerErrorMessage('')
            } catch (err) {
                console.log("Ошибка добавления фильма", err);
                setServerErrorMessage("Ошибка добавления выбраного фильма");
            }
        } else {
            try {
                await deleteMovies(film._id);
                const newFilmsSaved = await getMoviesMy();
                setFilmsSave(newFilmsSaved);
                setServerErrorMessage('')
            } catch (err) {
                console.log("Ошибка удаления фильма", err);
                setServerErrorMessage('Ошибка удаления фильма');
            }
        }
    }

    // Достаем сохранненые фильмы + сохраняем фильмы с локальное хранилище
    useEffect(() => {
        getMoviesMy()
            .then((data) => {
                setFilmsSave(data)
                setServerErrorMessage('')
            })
            .catch((err) => {
                console.log("Error", err)
                setServerErrorMessage('Ошибка получения сохранненых фильмов');
            });

        const localStorageFilms = localStorage.getItem("films");

        if (localStorageFilms) {
            const filterData = JSON.parse(localStorageFilms);
            // const filterDataShowed = [...filterData];
            // const filterDataShort = [...filterData];
            setFilms(filterData);
            setFilmsShort(filterData.filter(({ duration }) => duration <= 40));
            setFilmsShowed(filterData.splice(0, getMoviesCount()[0]));
            setPreloader(false);
        }
    }, []);

    return (
        <>
            <SearchForm
                onChangeToggle={onChangeToggle}
                setToggle={setToggle}
                toggle={toggle}
                errorText={errorText}
                onSearchFilms={handleSearchFilms}
            />
            {preloader && <Preloader />}
            {errorMessage && (
                <div className="movies__card-text">Ничего не найдено</div>
            )}
            {serverErrorMessage && (
                <div className="movies__card-text">{serverErrorMessage}</div>
            )}
            {!preloader && !errorText && (
                <MoviesCardList
                    handleAddFilm={handleAddFilm}
                    onShowMore={handleShowMore}
                    films={films}
                    filmsSaved={filmsSave}
                    filmsShowed={filmsShowed}
                    toggle={toggle}
                    filmsShort={filmsShort}
                />
            )}
        </>
    );
};

export default Movies;
