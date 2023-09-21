import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <section className="profile">
      <h1 className="profile__name">Привет, Виталий!</h1>
      <form action="#" className="profile__form">
        <fieldset className="profile__container-input">
          <div className="profile__label-input-wrapper">
            <label htmlFor="profile-text" className="profile__label">
              Имя
            </label>
            <input
              placeholder="Виталий"
              name="profile-text"
              id="profile-text"
              type="text"
              className="profile__input"
            />
          </div>
          <span className="profile__input-text-error"></span>
        </fieldset>
        <fieldset className="profile__container-input">
          <div className="profile__label-input-wrapper">
            <label htmlFor="profile-email" className="profile__label">
              E-mail
            </label>
            <input
              placeholder="pochta@yandex.ru"
              name="profile-email"
              id="profile-email"
              type="email"
              className="profile__input"
            />
          </div>
          <span className="profile__input-text-error"></span>
        </fieldset>
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
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
