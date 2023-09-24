import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__links">
        <li>
          <a href="#about-project" className="nav-tab__link link-hover">
            О проекте
          </a>
        </li>
        <li>
          <a href="#about-techs" className="nav-tab__link link-hover">
            Технологии
          </a>
        </li>
        <li>
          <a href="#about-me" className="nav-tab__link link-hover">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
