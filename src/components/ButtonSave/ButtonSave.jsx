import React from 'react';

const ButtonSave = ({ isLiked, onChangeLike }) => {
    return (
        <>
            {isLiked
                ? <button type='button' onClick={onChangeLike} className='movies-card__button btn-active'>
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 3.75L3.81905 6L9 1.5" stroke="white" strokeWidth="1.5"/>
                    </svg>
                </button>
                : <button type='button' onClick={onChangeLike} className='movies-card__button'>Сохранить</button>
            }
        </>
    );
};

export default ButtonSave;