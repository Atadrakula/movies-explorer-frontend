import React from 'react';
import './Movies.css';
import SearchForm from '../common/SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';

// import { moviesCardsData } from '../../../utils/constants';
import ButtonElse from './ButtonElse/ButtonElse';

function Movies({ movies, onSearchSubmit }) {
  const showAllMovies = (movies) => movies;

  return (
    <main className="movies">
      <SearchForm onSearchSubmit={onSearchSubmit} />
      {movies.length > 0 ? (
        <MoviesCardList
          children={<ButtonElse />}
          filterFunction={showAllMovies}
          isSavedMovies={false}
          movies={movies}
        />
      ) : (
        <Preloader />
      )}
    </main>
  );
}

export default Movies;
