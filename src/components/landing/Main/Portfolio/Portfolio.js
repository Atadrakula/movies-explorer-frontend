import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__subtitle">Портфолио</h3>
      <ul className="portfolio__container">
        <li className="portfolio__site-container cursor-pointer link-hover">
          <a
            href="https://atadrakula.github.io/how-to-learn/"
            target="_blank"
            className="portfolio__site"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__site-container cursor-pointer link-hover">
          <a
            href="https://atadrakula.github.io/russian-travel/"
            target="_blank"
            className="portfolio__site"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__site-container cursor-pointer link-hover">
          <a
            href="https://web.portfolio.nomoreparties.co"
            target="_blank"
            className="portfolio__site"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
