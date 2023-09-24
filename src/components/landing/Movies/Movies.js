import React from 'react';
import './Movies.css';
import SearchForm from '../common/SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';

import moviesCardsData from '../../../utils/constants';
import ButtonElse from './ButtonElse/ButtonElse';

function Movies() {
  const showAllMovies = (moviescards) => moviescards;

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        children={<ButtonElse />}
        moviescards={moviesCardsData}
        filterFunction={showAllMovies}
        isSavedMovies={false}
      />
      <Preloader />
    </main>
  );
}

export default Movies;
