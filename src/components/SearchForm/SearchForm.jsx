import React, {useEffect, useState} from 'react';
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = ({onSearchFilms, errorText, handleChangeTumbler, toggle, setToggle}) => {
    const [searchInput, setSearchInput] = useState('');

    const searchFilms = (e) => {
        e.preventDefault();
        onSearchFilms(searchInput);
    }

    const onChange = (e) => {
        setSearchInput(e.target.value);
    }

    // useEffect(() => {
    //     onSearchFirms(searchInput)
    // }, [toggle])

    useEffect(() => {
        setSearchInput(localStorage.getItem('input'))
    }, [])

    return (
        <section className='search-form'>
            <form noValidate onSubmit={searchFilms} className='search-form__form'>
                <div className='search-form__form-container'>
                    <input value={searchInput} onChange={onChange} required name='text' placeholder='Фильм' type='text'
                           className='search-form__input'/>
                    <button className='search-form__button' type='submit'>Найти</button>
                </div>
                <FilterCheckbox toggle={toggle} setToggle={setToggle} value={toggle}
                                handleChangeTumbler={handleChangeTumbler}/>
                {errorText && <p className='search-form-error'>{errorText}</p>}
            </form>
        </section>
    );
};

export default SearchForm;
