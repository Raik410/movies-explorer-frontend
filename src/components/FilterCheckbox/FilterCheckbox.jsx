import React from 'react';
import './FilterCheckbox.css'

const FilterCheckbox = () => {
    return (
        <div className='search-form__container'>
            <input id='happy' className='search-form__container-checkbox' type='checkbox'/>
            <label for='happy' className='search-form__container-label'></label>
            <p className='search-form__container-text'>Короткометражки</p>
        </div>
    );
};

export default FilterCheckbox;