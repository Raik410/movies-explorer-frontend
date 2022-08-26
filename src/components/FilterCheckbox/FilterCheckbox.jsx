import React from 'react';
import './FilterCheckbox.css'

const FilterCheckbox = ({ handleChangeTumbler, value, setTumbler, tumbler }) => {

    const onChangeTumbler = () => {
        setTumbler(!tumbler);
        handleChangeTumbler(tumbler);
    }

    return (
        <div className='search-form__container'>
            <input value={value} onChange={onChangeTumbler} checked={value} id='happy' className='search-form__container-checkbox' type='checkbox'/>
            <label htmlFor='happy' className='search-form__container-label'></label>
            <p className='search-form__container-text'>Короткометражки</p>
        </div>
    );
};

export default FilterCheckbox;