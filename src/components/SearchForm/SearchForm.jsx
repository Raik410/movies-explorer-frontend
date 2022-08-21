import React from 'react';
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
    return (
        <section className='search-form'>
            <form className='search-form__form'>
                <div className='search-form__form-container'>
                    <input required name='text' placeholder='Фильм' type='text' className='search-form__input'/>
                    <button className='search-form__button' type='submit'>Найти</button>
                </div>
                <FilterCheckbox />
            </form>
        </section>
    );
};

export default SearchForm;