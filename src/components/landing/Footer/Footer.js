import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__subtitle">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__links-with-year">
        <p className="footer__year">&copy; 2023</p>
        <ul className="footer__links">
          <li>
            <a
              href="https://practicum.yandex.ru"
              target="_blank"
              className="footer__link link-hover"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Atadrakula"
              target="_blank"
              className="footer__link link-hover"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
