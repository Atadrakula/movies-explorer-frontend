import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__links">
        <li>
          <h2 className="nav-tab__link cursor-pointer link-hover">О проекте</h2>
        </li>
        <li>
          <h2 className="nav-tab__link cursor-pointer link-hover">
            Технологии
          </h2>
        </li>
        <li>
          <h2 className="nav-tab__link cursor-pointer link-hover">Студент</h2>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
