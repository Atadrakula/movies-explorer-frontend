/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';
import './MoviesCard.css';

function MoviesCard({ moviescard }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = moviescard.owner === currentUser._id;
  const isLiked =
    moviescard.like && moviescard.like.some((i) => i === currentUser._id);
  const cardLikedClassName = `moviescard__heart cursor-pointer ${
    isLiked && 'moviescard__heart-active'
  }`;

  return (
    <li className="moviescard">
      <img
        src={moviescard.src}
        alt={moviescard.alt}
        className="moviescard__img"
      />
      <div className="moviescard__name-form">
        <h2 className="moviescard__name">{moviescard.name}</h2>
        <button className={cardLikedClassName} aria-label="Лайкнуть"></button>
      </div>
      <p className="moviescard__time">{moviescard.time}</p>
    </li>
  );
}

export default MoviesCard;
