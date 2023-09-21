import React from 'react';
// import logoProfile from '../../../../images/profile-logo.svg';
import Logo from '../../../common/Logo/Logo';
import './AuthHeader.css';

function AuthHeader({ isThemeDark }) {
  const backGroundColorClass = `auth-header ${
    isThemeDark ? 'auth-header_theme_dark' : 'auth-header_theme_light'
  }`;

  return (
    <header className={backGroundColorClass}>
      <div className="auth-header__navigation-and-logo-container">
        <Logo />
        <ul className="auth-header__links">
          <li>
            <a
              href="#link"
              target="_blank"
              className="auth-header__link link-hover"
            >
              Фильмы
            </a>
          </li>
          <li>
            <a
              href="#link"
              target="_blank"
              className="auth-header__link link-hover"
            >
              Сохранённые фильмы
            </a>
          </li>
        </ul>
      </div>
      <a href="#profile" target="_blank" className="auth-header__profile">
        <span className="auth-header__profile-name">Аккаунт</span>
        <span className="auth-header__profile-logo-container"></span>
      </a>
    </header>
  );
}

export default AuthHeader;
