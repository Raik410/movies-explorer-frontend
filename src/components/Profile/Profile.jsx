import React, {useState} from 'react';
import './Profile.css';

const Profile = () => {
    const [editProfile, setEditProfile] = useState(false);

    return (
        <section className='profile'>
            <h1 className='profile__title'>Привет, Виталий!</h1>
            <form onSubmit={event => event.preventDefault()} className='profile__form'>
                <div className='profile__container'>
                    <p className='profile__container-key'>Имя</p>
                    {editProfile
                        ? <input placeholder='Имя' type='name' className='profile__input'/> :
                        <p className='profile__container-value'>Виталий</p>}
                </div>
                <div className='profile__container margin-top'>
                    <p className='profile__container-key'>E-mail</p>
                    {editProfile
                        ? <input placeholder='E-mail' type='email' className='profile__input'/> :
                        <p className='profile__container-value'>Nikita@mail.ru</p>}
                </div>
                <div className='profile__box'>
                    {editProfile
                        ? <button type='submit' className='profile__form-button'>Сохранить</button> :
                        <>
                            <button onClick={() => setEditProfile(!editProfile)}
                                    className='profile__button'>Редактировать
                            </button>
                            <p className='profile__logout'>Выйти из аккаунта</p>
                        </>
                    }
                </div>
            </form>
        </section>
    );
};

export default Profile;