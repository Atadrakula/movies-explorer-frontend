/* eslint-disable no-unused-vars */
import React from 'react';
import './SavedMovies.css';
import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';

import moviesCards from '../../../utils/constants';

function SavedMovies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList moviescards={moviesCards} />
    </main>
  );
}

export default SavedMovies;

// доделать
