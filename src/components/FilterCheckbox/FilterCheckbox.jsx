import React, {useEffect} from 'react';
import './FilterCheckbox.css'
import {useLocation} from "react-router-dom";

const   FilterCheckbox = ({setToggle, toggle, onChangeToggle}) => {

    const { pathname } = useLocation();

    const onChangeTumbler = () => {
        setToggle(!toggle)
        pathname !== '/saved-movies' && onChangeToggle();
    }

    const localStorageToggle = localStorage.getItem('toggle')

    useEffect(() => {
        pathname !== '/saved-movies' && setToggle(localStorageToggle === 'true')
    }, [])

    return (
        <div className='search-form__container'>
            <input value={toggle} onChange={onChangeTumbler} checked={toggle} id='happy'
                   className='search-form__container-checkbox' type='checkbox'/>
            <label htmlFor='happy' className='search-form__container-label'></label>
            <p className='search-form__container-text'>Короткометражки</p>
        </div>
    );
};

export default FilterCheckbox;
