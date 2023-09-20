import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__subtitle">Страница не найдена</h2>
      <a
        href="#link"
        target="_blank"
        className="not-found__link link-hover cursor-pointer"
      >
        Назад
      </a>
    </div>
  );
}

export default NotFound;
