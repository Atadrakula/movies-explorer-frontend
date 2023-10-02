import React from 'react';
import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import { useMoviesFilterAndLogic } from '../../../utils/hooks/useMoviesFilterAndLogic';
import Preloader from '../Movies/Preloader/Preloader';

function SavedMovies({
  savedMovies,
  handleMovieLike,
  handleMovieDislike,
  onToggleMovieLike,
  isMovieSaved,
}) {
  const {
    currentSearchKeyword,
    errorSearch,
    isNoneResult,
    isShortFilm,
    setShortFilm,
    handleInputChange,
    filteredShortMovies,
    getMovieName,
    getCorrectFormateDuration,
    getAbsoluteImageUrl,
    handleSubmit,
  } = useMoviesFilterAndLogic(savedMovies);

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
      {savedMovies.length > 0 ? (
        <MoviesCardList
          isSavedMovies={true}
          movies={savedMovies}
          isShortFilm={isShortFilm}
          onToggleMovieLike={onToggleMovieLike}
          handleMovieLike={handleMovieLike}
          handleMovieDislike={handleMovieDislike}
          filteredShortMovies={filteredShortMovies}
          getCorrectFormateDuration={getCorrectFormateDuration}
          getAbsoluteImageUrl={getAbsoluteImageUrl}
          getMovieName={getMovieName}
          isMovieSaved={isMovieSaved}
        />
      ) : !isNoneResult ? (
        <Preloader />
      ) : (
        <h2 className="movies__none-result">Ничего не найдено</h2>
      )}
    </main>
  );
}

export default SavedMovies;
