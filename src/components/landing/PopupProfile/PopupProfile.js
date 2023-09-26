import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PopupProfile.css';

function Profile() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/signin');
  };

  return (
    <main>
      <section className="profile">
        <h1 className="profile__name">Привет, Виталий!</h1>
        <form action="#" className="profile__form">
          <div className="profile__container-input">
            <div className="profile__label-input-wrapper">
              <label htmlFor="profile-text" className="profile__label">
                Имя
              </label>
              <input
                placeholder="Имя"
                name="profile-text"
                id="profile-text"
                type="text"
                value="Виталий"
                className="profile__input input-style"
                readOnly
              />
            </div>
            <span className="profile__input-text-error"></span>
          </div>
          <div className="profile__container-input">
            <div className="profile__label-input-wrapper">
              <label htmlFor="profile-email" className="profile__label">
                E-mail
              </label>
              <input
                placeholder="example@example.ru"
                name="profile-email"
                id="profile-email"
                type="email"
                value="pochta@yandex.ru"
                className="profile__input input-style"
                readOnly
              />
            </div>
            <span className="profile__input-text-error"></span>
          </div>
        </form>
        <button
          className="profile__button-edit cursor-pointer"
          aria-label="Редактировать профиль"
          type="submit"
        >
          Редактировать
        </button>
        <button
          className="profile__button-exit cursor-pointer"
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
