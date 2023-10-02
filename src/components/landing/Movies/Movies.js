import React from 'react';
import './Movies.css';
import SearchForm from '../common/SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import ButtonElse from './ButtonElse/ButtonElse';
import { useMoviesFilterAndLogic } from '../../../utils/hooks/useMoviesFilterAndLogic';

function Movies({
  visibleMoviesCount,
  setVisibleMoviesCount,
  visibleMoviesCountToPressButton,
  onToggleMovieLike,
  handleMovieLike,
  handleMovieDislike,
  isMovieSaved,
}) {
  const {
    currentSearchKeyword,
    errorSearch,
    searchResult,
    isNoneResult,
    isShortFilm,
    setShortFilm,
    handleInputChange,
    handleSubmit,
    filteredShortMovies,
    getCorrectFormateDuration,
    getAbsoluteImageUrl,
    getMovieName,
  } = useMoviesFilterAndLogic();

  return (
    <main className="movies">
      <SearchForm
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        currentSearchKeyword={currentSearchKeyword}
        textError={errorSearch}
        isShortFilm={isShortFilm}
        onToggleShortFilm={setShortFilm}
      />
      {searchResult.length > 0 ? (
        <MoviesCardList
          isSavedMovies={false}
          movies={searchResult}
          visibleMoviesCount={visibleMoviesCount}
          onToggleMovieLike={onToggleMovieLike}
          handleMovieLike={handleMovieLike}
          handleMovieDislike={handleMovieDislike}
          isMovieSaved={isMovieSaved}
          filteredShortMovies={filteredShortMovies}
          getCorrectFormateDuration={getCorrectFormateDuration}
          getAbsoluteImageUrl={getAbsoluteImageUrl}
          getMovieName={getMovieName}
          children={
            <ButtonElse
              visibleMoviesCount={visibleMoviesCount}
              setVisibleMoviesCount={setVisibleMoviesCount}
              visibleMoviesCountToPressButton={visibleMoviesCountToPressButton}
            />
          }
        />
      ) : !isNoneResult ? (
        <Preloader />
      ) : (
        <h2 className="movies__none-result">Ничего не найдено</h2>
      )}
    </main>
  );
}

export default Movies;
