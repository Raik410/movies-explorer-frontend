import React from 'react';
import './ButtonProfile.css'

const ButtonProfile = () => {
    return (
        <button type='button' className='header__nav-items-li-button'>Аккаунт
            <div className='header__nav-items-li-button-container'>
                    <svg className='header__nav-items-li-button-svg' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.42975 7.96781C8.79159 7.40572 9.75 6.06478 9.75 4.5C9.75 2.42893 8.07107 0.75 6 0.75C3.92894 0.75 2.25 2.42893 2.25 4.5C2.25 6.06473 3.20835 7.40563 4.57011 7.96775C3.17545 8.19993 1.89253 8.76594 0.80825 9.58058L2.1898 11.4194C3.25109 10.6221 4.56864 10.15 5.99976 10.15C7.43088 10.15 8.74842 10.6221 9.80971 11.4194L11.1913 9.58058C10.1071 8.76601 8.82428 8.20003 7.42975 7.96781Z" fill="black"/>
                    </svg>
            </div>
        </button>
    );
};

export default ButtonProfile;