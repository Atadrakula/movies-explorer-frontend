import React, { useEffect } from 'react';
import './PageWithIdentification.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function PageWithIdentification({
  isFormRegistration,
  title,
  textSubmit,
  signatute,
  linkText,
  linkTo,
  onSubmit,
  onChange,
  textError,
  isValid,
  authTextError,
  resetForm,
}) {
  useEffect(() => {
    // cброс состояния формы при размонтировании компонента
    return () => resetForm();
  }, [resetForm]);

  const typeFormClassInput = `auth__input-container ${
    isFormRegistration ? '' : 'auth__input-container_invisible'
  }`;

  const typeFormClassInputContainer = `auth__input-container ${
    isFormRegistration
      ? 'auth__input-container-margin-register'
      : 'auth__input-container-margin-login'
  }`;

  const submitClass = `auth__submit ${
    isValid ? 'cursor-pointer button-hover' : 'auth__submit_inactive'
  }`;

  return (
    <main className="content-auth">
      <section className="auth">
        <Logo isPageWithAuth={true} />
        <h1 className="auth__name">{title}</h1>
        <form action="#" className="auth__form" onSubmit={onSubmit}>
          <div className={typeFormClassInput}>
            <label htmlFor="name" className="auth__label">
              Имя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              minLength="2"
              placeholder="Имя"
              className="auth__input input-style"
              onChange={onChange}
              autoComplete="name"
              required={isFormRegistration}
            />
            <span className="auth__input-text-error">{textError.name}</span>
          </div>
          <div className="auth__input-container">
            <label htmlFor="email" className="auth__label">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@example.ru"
              className="auth__input input-style"
              onChange={onChange}
              autoComplete="email"
              required
            />
            <span className="auth__input-text-error">{textError.email}</span>
          </div>
          <div className={typeFormClassInputContainer}>
            <label htmlFor="password" className="auth__label">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="auth__input input-style"
              placeholder="Надёжный пароль"
              minLength="8"
              onChange={onChange}
              autoComplete="current-password"
              required
            />
            <span className="auth__input-text-error">{textError.password}</span>
          </div>
          <span className="auth__text-error">{authTextError}</span>
          <button
            id="button-submit-auth"
            type="submit"
            className={submitClass}
            disabled={!isValid}
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
