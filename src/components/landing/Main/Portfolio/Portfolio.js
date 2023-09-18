import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <ul className="portfolio__container">
        <li>
          <h3 className="portfolio__subtitle">Портфолио</h3>
        </li>
        <li className="portfolio__site-container cursor-pointer link-hover">
          <a href="#link" target="_blank" className="portfolio__site">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__site-container cursor-pointer link-hover">
          <a href="#link" target="_blank" className="portfolio__site">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__site-container cursor-pointer link-hover">
          <a href="#link" target="_blank" className="portfolio__site">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
