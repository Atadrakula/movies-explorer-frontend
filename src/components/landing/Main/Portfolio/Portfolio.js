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
            <p className="portfolio__name">Статичный сайт</p>
            <span className="portfolio__arrow-img" />
          </a>
        </li>
        <li className="portfolio__site-container cursor-pointer link-hover">
          <a
            href="https://atadrakula.github.io/russian-travel/"
            target="_blank"
            className="portfolio__site"
            rel="noreferrer"
          >
            <p className="portfolio__name">Адаптивный сайт</p>
            <span className="portfolio__arrow-img" />
          </a>
        </li>
        <li className="portfolio__site-container cursor-pointer link-hover">
          <a
            href="https://web.portfolio.nomoreparties.co"
            target="_blank"
            className="portfolio__site"
            rel="noreferrer"
          >
            <p className="portfolio__name">Одностраничное приложение</p>
            <span className="portfolio__arrow-img" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
