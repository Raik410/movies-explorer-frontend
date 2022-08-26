import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { getMovies } from "../utils/MoviesApi";

const SearchForm = ({ onSearchFirms, errorText, handleChangeTumbler }) => {
    const [searchInput, setSearchInput] = useState('');
    const [tumbler, setTumbler] = useState(false);

    const searchFilms = (e) => {
        e.preventDefault();
        onSearchFirms(searchInput);
    }

    const onChange = (e) => {
        setSearchInput(e.target.value);
        console.log(searchInput)
    }

    return (
        <section className='search-form'>
            <form noValidate onSubmit={searchFilms} className='search-form__form'>
                <div className='search-form__form-container'>
                    <input value={searchInput} onChange={onChange} required name='text' placeholder='Фильм' type='text' className='search-form__input'/>
                    <button className='search-form__button' type='submit'>Найти</button>
                </div>
                <FilterCheckbox tumbler={tumbler} setTumbler={setTumbler} value={tumbler} handleChangeTumbler={handleChangeTumbler} />
                {errorText && <p className='search-form-error'>{errorText}</p>}
            </form>
        </section>
    );
};

export default SearchForm;