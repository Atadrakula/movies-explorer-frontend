import React from 'react';
import './MenuIcon.css';

function MenuIcon({ isOpen }) {
  return (
    <button
      className="menu-icon button-hover cursor-pointer"
      type="button"
      aria-label="Открыть меню"
      onClick={isOpen}
    ></button>
  );
}

export default MenuIcon;
