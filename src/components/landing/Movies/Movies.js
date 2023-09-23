/* eslint-disable no-unused-vars */
import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';

import moviesCards from '../../../utils/constants';
import PopupMenu from './PopupMenu/PopupMenu';

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList moviescards={moviesCards} />
    </main>
  );
}

export default Movies;
