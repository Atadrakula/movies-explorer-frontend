/* eslint-disable no-unused-vars */
import React from 'react';
import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';

import moviesCards from '../../../utils/constants';

function SavedMovies() {
  return (
    <main className="movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList moviescards={moviesCards} />
    </main>
  );
}

export default SavedMovies;

// доделать
