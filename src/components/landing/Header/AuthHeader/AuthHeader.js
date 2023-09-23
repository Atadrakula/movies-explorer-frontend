import React, { useEffect, useState } from 'react';
import Logo from '../../../common/Logo/Logo';
import MenuIcon from '../../../common/MenuIcon/MenuIcon';
import ProfileIcon from '../../../common/ProfileIcon/ProfileIcon';
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
            <a href="#link" className="auth-header__link link-hover">
              Фильмы
            </a>
          </li>
          <li>
            <a href="#link" className="auth-header__link link-hover">
              Сохранённые фильмы
            </a>
          </li>
        </ul>
      </nav>
      {isMobile ? <MenuIcon isOpen={isOpen} /> : <ProfileIcon />}
    </header>
  );
}

export default AuthHeader;
