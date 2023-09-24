import React from 'react';
import MoviesCardList from '../../common/MoviesCardList/MoviesCardList';

function MainMoviesCardList({ moviescards, children }) {
  const showAllMovies = (moviescards) => moviescards;

  return (
    <MoviesCardList
      moviescards={moviescards}
      filterFunction={showAllMovies}
      children={children}
    />
  );
}

export default MainMoviesCardList;
