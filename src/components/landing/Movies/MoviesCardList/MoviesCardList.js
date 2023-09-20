import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import ButtonElse from '../ButtonElse/ButtonElse';

function MoviesCardList({ moviescards }) {
  return (
    <section className="moviesccardlist">
      <ul className="moviesccardlist__moviescards">
        {moviescards.map((moviescard) => (
          <MoviesCard key={moviescard._id} moviescard={moviescard} />
        ))}
      </ul>
      <ButtonElse />
    </section>
  );
}

export default MoviesCardList;
