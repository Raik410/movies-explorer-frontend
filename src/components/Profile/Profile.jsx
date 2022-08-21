import React, {useState} from 'react';
import './Profile.css';

const Profile = ({ onChangeValidation }) => {
    const [editProfile, setEditProfile] = useState(false);

    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [isValidName, setIsValidName] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    const handleChangeName = (e) => {
        onChangeValidation(e, setInputName, setIsValidName, isValidName, setErrorName)
    }

    const handleChangeEmail = (e) => {
        onChangeValidation(e, setInputEmail, setIsValidEmail, isValidEmail, setErrorEmail)
    }

    return (
        <main className='profile'>
            <h1 className='profile__title'>Привет, Виталий!</h1>
            <form onSubmit={event => event.preventDefault()} className='profile__form' noValidate>
                <div className='profile__container'>
                    <p className='profile__container-key'>Имя</p>
                    {editProfile
                        ?
                        <div className='profile__form-container'>
                            <input required minLength='2' maxLength='20' placeholder='Имя' value={inputName} onChange={handleChangeName} type='name' className='profile__input'/>
                            <span className='profile__form-error'>{errorName}</span>
                        </div>
                        :
                        <p className='profile__container-value'>Виталий</p>}
                </div>
                <div className='profile__container margin-top'>
                    <p className='profile__container-key'>E-mail</p>
                    {editProfile
                        ?
                        <div className='profile__form-container'>
                            <input required minLength='2' maxLength='20' placeholder='E-mail' value={inputEmail} onChange={handleChangeEmail} type='email' className='profile__input'/>
                            <span className='profile__form-error top'>{errorEmail}</span>
                        </div>
                        :
                        <p className='profile__container-value'>Nikita@mail.ru</p>}
                </div>
                <div className='profile__box'>
                    {editProfile
                        ? <button type='submit' className='profile__form-button'>Сохранить</button> :
                        <>
                            <button type='button' onClick={() => setEditProfile(!editProfile)}
                                    className='profile__button'>Редактировать
                            </button>
                            <p className='profile__logout'>Выйти из аккаунта</p>
                        </>
                    }
                </div>
            </form>
        </main>
    );
};

export default Profile;