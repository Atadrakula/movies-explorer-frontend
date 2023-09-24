import React from 'react';
import './PageWithIdentification.css';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo/Logo';

function PageWithIdentification({
  isFormRegistration,
  name,
  textSubmit,
  signatute,
  linkText,
  linkTo,
  onSubmit,
  onChange,
}) {
  const typeFormClassInput = `auth__input-container ${
    isFormRegistration ? '' : 'auth__input-container_invisible'
  }`;

  const typeFormClassInputContainer = `auth__input-container ${
    isFormRegistration
      ? 'auth__input-container-margin-register'
      : 'auth__input-container-margin-login'
  }`;

  return (
    <main className="content-auth">
      <section className="auth">
        <Logo isPageWithAuth={true} />
        <h1 className="auth__name">{name}</h1>
        <form action="#" className="auth__form" onSubmit={onSubmit}>
          <div className={typeFormClassInput}>
            <label htmlFor="auth-name" className="auth__label">
              Имя
            </label>
            <input
              id="auth-name"
              name="auth-name"
              type="text"
              className="auth__input"
              onChange={onChange}
              autoComplete="name"
              required
            />
            <span className="auth__input-text-error" />
          </div>
          <div className="auth__input-container">
            <label htmlFor="auth-email" className="auth__label">
              E-mail
            </label>
            <input
              id="auth-email"
              name="auth-email"
              type="email"
              className="auth__input"
              onChange={onChange}
              autoComplete="email"
              required
            />
            <span className="auth__input-text-error" />
          </div>
          <div className={typeFormClassInputContainer}>
            <label htmlFor="auth-password" className="auth__label">
              Пароль
            </label>
            <input
              id="auth-password"
              name="auth-password"
              type="password"
              className="auth__input"
              minLength="6"
              maxLength="200"
              onChange={onChange}
              autoComplete="current-password"
              required
            />
            <span className="auth__input-text-error" />
          </div>
          <button
            id="button-submit-auth"
            type="submit"
            className="auth__submit cursor-pointer button-hover"
          >
            {textSubmit}
          </button>
        </form>
        <p className="auth__signature">
          {signatute}
          <Link to={linkTo} className="auth__link button-hover">
            {linkText}
          </Link>
        </p>
      </section>
    </main>
  );
}

export default PageWithIdentification;
