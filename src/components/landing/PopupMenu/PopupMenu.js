import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../common/ProfileIcon/ProfileIcon';
import './PopupMenu.css';

function PopupMenu({ onClose, isOpen }) {
  const visiblePopupClass = `popup ${
    isOpen ? 'popup_visible' : 'popup_invisible'
  }`;
  const openPopupMenu = `popup-menu ${isOpen ? 'popup-menu_visible' : ''}`;

  return (
    <div className={visiblePopupClass}>
      <nav className={openPopupMenu}>
        <button
          aria-label="Закрыть"
          className="popup-menu__close button-hover cursor-pointer"
          type="button"
          onClick={onClose}
        />
        <ul className="popup-menu__links">
          <li>
            <Link to="/" className="popup-menu__link link-hover">
              Главная
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className="popup-menu__link link-hover popup-menu__link_active"
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link to="/saved-movies" className="popup-menu__link link-hover">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <ProfileIcon />
      </nav>
    </div>
  );
}

export default PopupMenu;
