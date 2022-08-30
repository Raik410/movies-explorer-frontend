import React, {useContext, useState} from "react";
import "./Profile.css";
import {UserContext} from "../../context/userContext";

const Profile = ({onChangeValidation, onSignOut, onUpdateProfile}) => {
    const {email, name} = useContext(UserContext);
    console.log(email, name)
    const [editProfile, setEditProfile] = useState(false);

    const [inputName, setInputName] = useState(!editProfile ? name : "");
    const [inputEmail, setInputEmail] = useState(!editProfile ? email : "");
    const [isValidName, setIsValidName] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const inValidEmail = regex.test(inputEmail);

    const handleChangeName = (e) => {
        onChangeValidation(
            e,
            setInputName,
            setIsValidName,
            isValidName,
            setErrorName
        );
    };

    const handleChangeEmail = (e) => {
        onChangeValidation(
            e,
            setInputEmail,
            setIsValidEmail,
            isValidEmail,
            setErrorEmail
        );
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        onUpdateProfile({
            name: inputName,
            email: inputEmail,
        });
    };

    return (
        <main className="profile">
            <h1 className="profile__title">Привет, {name}!</h1>
            <form onSubmit={handleUpdateProfile} className="profile__form" noValidate>
                <div className="profile__container">
                    <p className="profile__container-key">Имя</p>
                    {editProfile ? (
                        <div className="profile__form-container">
                            <input
                                required
                                minLength="2"
                                maxLength="20"
                                placeholder="Имя"
                                value={inputName}
                                onChange={handleChangeName}
                                type="name"
                                className="profile__input"
                            />
                            <span className="profile__form-error">{errorName}</span>
                        </div>
                    ) : (
                        <p className="profile__container-value">{name}</p>
                    )}
                </div>
                <div className="profile__container margin-top">
                    <p className="profile__container-key">E-mail</p>
                    {editProfile ? (
                        <div className="profile__form-container">
                            <input
                                required
                                minLength="2"
                                placeholder="E-mail"
                                value={inputEmail}
                                onChange={handleChangeEmail}
                                type="email"
                                className="profile__input"
                            />
                            <span className="profile__form-error top">{errorEmail}</span>
                        </div>
                    ) : (
                        <p className="profile__container-value">{email}</p>
                    )}
                </div>
                <div className="profile__box">
                    {editProfile && (
                        <button
                            disabled={!(isValidEmail && isValidName && inValidEmail && (email !== inputEmail || name !== inputName))}
                            type="submit"
                            className="profile__form-button"
                        >
                            Сохранить
                        </button>
                    )}
                    {!editProfile && (
                        <>
                            <button
                                type="button"
                                onClick={() => setEditProfile(!editProfile)}
                                className="profile__button"
                            >
                                Редактировать
                            </button>
                            <p onClick={onSignOut} className="profile__logout">
                                Выйти из аккаунта
                            </p>
                        </>
                    )}
                </div>
            </form>
        </main>
    );
};

export default Profile;