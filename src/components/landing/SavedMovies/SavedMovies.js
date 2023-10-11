import React, { useEffect } from 'react';
import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import { useMoviesFilterAndLogic } from '../../../utils/hooks/useMoviesFilterAndLogic';
import Preloader from '../Movies/Preloader/Preloader';

function SavedMovies({
  savedMovies,
  handleMovieLike,
  handleMovieDislike,
  isMovieSaved,
  isMobileSavedCard,
}) {
  const {
    currentSearchKeyword,
    errorSearch,
    isNoneResult,
    isShortFilm,
    savedSearchResult,
    setShortFilm,
    handleInputChange,
    filteredShortMovies,
    getMovieName,
    handleSubmit,
    setSavedSearchResult,
    isLoadingSearch,
  } = useMoviesFilterAndLogic(savedMovies, null);

  useEffect(() => {
    if (savedMovies && savedMovies.length > 0) {
      setSavedSearchResult(savedMovies);
    }
  }, [setSavedSearchResult, savedMovies]);

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
      {isLoadingSearch ? (
        <Preloader />
      ) : savedSearchResult.length > 0 ? (
        <MoviesCardList
          isSavedMoviesPage={true}
          isRenderSavedMoviesButton={true}
          movies={savedSearchResult}
          isShortFilm={isShortFilm}
          handleMovieLike={handleMovieLike}
          handleMovieDislike={handleMovieDislike}
          filteredShortMovies={filteredShortMovies}
          getMovieName={getMovieName}
          isMovieSaved={isMovieSaved}
          isMobileSavedCard={isMobileSavedCard}
        />
      ) : (
        isNoneResult && (
          <h2 className="movies__none-result">Ничего не найдено</h2>
        )
      )}
    </main>
  );
}

export default SavedMovies;
