import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../common/Logo/Logo';
import MenuIcon from '../../common/MenuIcon/MenuIcon';
import ProfileIcon from '../../common/ProfileIcon/ProfileIcon';
import './AuthHeader.css';

function AuthHeader({ isThemeDark, isOpen }) {
  const [isMobile, setIsMobile] = useState(false);
  const backGroundColorClass = `auth-header ${
    isThemeDark ? 'auth-header_theme_dark' : 'auth-header_theme_light'
  }`;

  useEffect(() => {
    const handleResizeWindow = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResizeWindow();

    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <header className={backGroundColorClass}>
      <nav className="auth-header__navigation-and-logo-container">
        <Logo />
        <ul className="auth-header__links">
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive
                  ? 'auth-header__link link-hover auth-header__link_active'
                  : 'auth-header__link link-hover'
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                isActive
                  ? 'auth-header__link link-hover auth-header__link_active'
                  : 'auth-header__link link-hover'
              }
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
      </nav>
      {isMobile ? <MenuIcon isOpen={isOpen} /> : <ProfileIcon />}
    </header>
  );
}

export default AuthHeader;
