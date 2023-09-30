/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopupProfile.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../../utils/hooks/UseFormWithValidation';
import { capitalizeFirstLetter } from '../../../utils/utils';

function Profile({ onSignOut, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const [textSubmit, setTextSubmit] = useState('');
  console.log(`Profile: currentUser: ${currentUser}`);
  const navigate = useNavigate();
  const nameInTitle = (str) => `Привет, ${capitalizeFirstLetter(str)}!`;
  const handleButtonClick = () => {
    onSignOut();
    navigate('/signin');
  };
  useEffect(() => {
    // Устанавливаем начальные значения полей при обновлении currentUser
    if (currentUser) {
      resetForm({
        name: currentUser.name || '',
        email: currentUser.email || '',
      });
    }
  }, [currentUser, resetForm]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateProfile({
        name: values.name,
        email: values.email,
      });
      setTextSubmit(`Данные обновлены`);
    }
  }
  const submitClass = `profile__submit ${
    isValid ? 'cursor-pointer button-hover' : 'profile__submit_inactive'
  }`;

  return (
    <main>
      <section className="profile">
        <h1 className="profile__name">
          {currentUser && nameInTitle(currentUser.name)}
        </h1>
        <form action="#" className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__container-input">
            <div className="profile__label-input-wrapper">
              <label htmlFor="profile-name" className="profile__label">
                Имя
              </label>
              <input
                placeholder="Имя"
                name="name"
                id="profile-name"
                type="text"
                className="profile__input input-style"
                value={values.name || ''}
                onChange={handleChange}
              />
            </div>
            <span className="profile__input-text-error">{errors.name}</span>
          </div>
          <div className="profile__container-input">
            <div className="profile__label-input-wrapper">
              <label htmlFor="profile-email" className="profile__label">
                E-mail
              </label>
              <input
                placeholder="example@example.ru"
                name="email"
                id="profile-email"
                type="email"
                className="profile__input input-style"
                value={values.email || ''}
                onChange={handleChange}
              />
            </div>
            <span className="profile__input-text-error">{errors.email}</span>
          </div>
          <span className="profile__submit-text">{textSubmit}</span>
          <button
            className={submitClass}
            aria-label="Редактировать профиль"
            type="submit"
          >
            Редактировать
          </button>
        </form>
        <button
          className="profile__button-exit cursor-pointer button-hover"
          aria-label="Выйти из аккаунта"
          type="button"
          onClick={handleButtonClick}
        >
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
}

export default Profile;
