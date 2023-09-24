import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ children, moviescards }) {
  return (
    <section className="moviesccardlist">
      <ul className="moviesccardlist__moviescards">
        {moviescards.map((moviescard) => (
          <MoviesCard key={moviescard._id} moviescard={moviescard} />
        ))}
      </ul>
      {children}
    </section>
  );
}

export default MoviesCardList;
