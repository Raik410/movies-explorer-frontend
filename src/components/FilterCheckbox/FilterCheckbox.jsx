import React, {useEffect} from 'react';
import './FilterCheckbox.css'

const FilterCheckbox = ({setToggle, toggle}) => {

    const onChangeTumbler = () => {
        setToggle(!toggle)
    }

    const localStorageToggle = localStorage.getItem('toggle')

    useEffect(() => {
        setToggle(localStorageToggle === 'true')
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
