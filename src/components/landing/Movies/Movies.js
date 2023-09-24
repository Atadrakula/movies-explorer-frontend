/* eslint-disable no-unused-vars */
import React from 'react';
import './Movies.css';
import SearchForm from '../common/SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';

import moviesCards from '../../../utils/constants';
import PopupMenu from '../PopupMenu/PopupMenu';
import ButtonElse from './ButtonElse/ButtonElse';

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList children={<ButtonElse />} moviescards={moviesCards} />
    </main>
  );
}

export default Movies;
