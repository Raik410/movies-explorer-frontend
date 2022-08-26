import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import InfoToolTip from "../InfoToolTip/InfoToolTip";
const Register = ({ onChangeValidation, onRegister }) => {
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const [isValidName, setIsValidName] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleChangeName = (e) => {
        onChangeValidation(e, setInputName, setIsValidName, isValidName, setErrorName)
    }

    const handleChangeEmail = (e) => {
        onChangeValidation(e, setInputEmail, setIsValidEmail, isValidEmail, setErrorEmail)
    }

    const handleChangePassword = (e) => {
        onChangeValidation(e, setInputPassword, setIsValidPassword, isValidPassword, setErrorPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({
            name: inputName,
            email: inputEmail,
            password: inputPassword,
        })
    }

    return (
        <main className='register'>
            <Link className='register__logo' to='/'>
                <svg className='register__logo' width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.3895 1.35421C17.6615 -0.451404 20.3385 -0.451404 21.6105 1.35421C22.4989 2.61546 24.1621 3.0611 25.5622 2.41307C27.5665 1.48534 29.8849 2.82384 30.0836 5.02353C30.2224 6.56004 31.44 7.77756 32.9765 7.91638C35.1762 8.11513 36.5147 10.4335 35.5869 12.4378C34.9389 13.8379 35.3845 15.5011 36.6458 16.3895C38.4514 17.6615 38.4514 20.3385 36.6458 21.6105C35.3845 22.4989 34.9389 24.1621 35.5869 25.5622C36.5147 27.5665 35.1762 29.8849 32.9765 30.0836C31.44 30.2224 30.2224 31.44 30.0836 32.9765C29.8849 35.1762 27.5665 36.5147 25.5622 35.5869C24.1621 34.9389 22.4989 35.3845 21.6105 36.6458C20.3385 38.4514 17.6615 38.4514 16.3895 36.6458C15.5011 35.3845 13.8379 34.9389 12.4378 35.5869C10.4335 36.5147 8.11513 35.1762 7.91638 32.9765C7.77756 31.44 6.56004 30.2224 5.02353 30.0836C2.82384 29.8849 1.48534 27.5665 2.41307 25.5622C3.0611 24.1621 2.61546 22.4989 1.35421 21.6105C-0.451404 20.3385 -0.451404 17.6615 1.35421 16.3895C2.61546 15.5011 3.0611 13.8379 2.41307 12.4378C1.48534 10.4335 2.82384 8.11513 5.02353 7.91638C6.56004 7.77756 7.77756 6.56004 7.91638 5.02353C8.11513 2.82384 10.4335 1.48534 12.4378 2.41307C13.8379 3.0611 15.5011 2.61546 16.3895 1.35421Z" fill="#3456F3"/>
                </svg>
            </Link>
            <h1 className='register__title'>Добро пожаловать!</h1>
            <form onSubmit={handleSubmit} className='register__form' noValidate>
                <label className='register__form-text'>Имя</label>
                    <input minLength='2' required className='register__form-input' maxLength='20' value={inputName} onChange={handleChangeName} name='name' placeholder='Имя' type='text' />
                    <span className='register__form-error'>{errorName}</span>
                <label className='register__form-text'>E-mail</label>
                    <input minLength='2' required className='register__form-input' maxLength='35' value={inputEmail} onChange={handleChangeEmail} name='email' placeholder='E-mail' type='email' />
                    <span className='register__form-error'>{errorEmail}</span>
                <label className='register__form-text'>Пароль</label>
                    <input minLength='2' required className='register__form-input' maxLength='20' value={inputPassword} onChange={handleChangePassword} name='password' placeholder='Пароль' type='password' />
                    <span className='register__form-error'>{errorPassword}</span>
                <button disabled={!(isValidEmail && isValidName && isValidPassword)} className='register__form-button' type='submit'>Зарегистрироваться</button>
                <div className='register__form-container'>
                    <p className='register__form-container-text'>Уже зарегистрированы?</p>
                    <Link className='register__link' to='/signin'>Войти</Link>
                </div>
            </form>
        </main>
    );
};

export default Register;