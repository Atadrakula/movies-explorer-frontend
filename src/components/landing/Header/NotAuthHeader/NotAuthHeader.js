import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../common/Logo/Logo';

import './NotAuthHeader.css';

function NotAuthHeader({ isThemeDark }) {
  const backGroundColorClass = `not-auth-header ${
    isThemeDark ? 'not-auth-header_theme_dark' : 'not-auth-header_theme_light'
  }`;
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/signin');
  };

  return (
    <header className={backGroundColorClass}>
      <Logo />
      <ul className="not-auth-header__links">
        <li>
          <Link to="/signup" className="not-auth-header__link link-hover">
            Регистрация
          </Link>
        </li>
        <li>
          <button
            type="button"
            aria-label="Войти"
            className="not-auth-header__button button-hover cursor-pointer"
            onClick={handleButtonClick}
          >
            Войти
          </button>
        </li>
      </ul>
    </header>
  );
}

export default NotAuthHeader;
