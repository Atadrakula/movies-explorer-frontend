import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '../common/ProfileIcon/ProfileIcon';
import './PopupMenu.css';

function PopupMenu({ onClose, isOpen }) {
  const visiblePopupClass = `popup ${
    isOpen ? 'popup_visible' : 'popup_invisible'
  }`;
  const openPopupMenu = `popup-menu ${isOpen ? 'popup-menu_visible' : ''}`;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={visiblePopupClass}
      onClick={handleBackgroundClick}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {}}
    >
      <nav className={openPopupMenu}>
        <button
          aria-label="Закрыть"
          className="popup-menu__close button-hover cursor-pointer"
          type="button"
          onClick={onClose}
        />
        <ul className="popup-menu__links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'popup-menu__link link-hover popup-menu__link_active'
                  : 'popup-menu__link link-hover'
              }
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive
                  ? 'popup-menu__link link-hover popup-menu__link_active'
                  : 'popup-menu__link link-hover'
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
                  ? 'popup-menu__link link-hover popup-menu__link_active'
                  : 'popup-menu__link link-hover'
              }
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <ProfileIcon />
      </nav>
    </div>
  );
}

export default PopupMenu;
