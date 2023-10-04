import React, { useEffect } from 'react';
import './Movies.css';
import SearchForm from '../common/SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import ButtonElse from './ButtonElse/ButtonElse';
import { useMoviesFilterAndLogic } from '../../../utils/hooks/useMoviesFilterAndLogic';

function Movies({
  allMovies,
  visibleMoviesCount,
  setVisibleMoviesCount,
  visibleMoviesCountToPressButton,
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
    setCurrentSearchKeyword,
    setSearchResult,
  } = useMoviesFilterAndLogic(null, allMovies);

  useEffect(() => {
    try {
      const data = localStorage.getItem('searchResults');
      if (data) {
        const { keyword, isShortFilm, movies } = JSON.parse(data);
        setCurrentSearchKeyword(keyword);
        setShortFilm(isShortFilm);
        setSearchResult(movies);
      }
    } catch (error) {
      console.error('Ошибка при чтении данных из localStorage:', error);
    }
  }, [setCurrentSearchKeyword, setShortFilm, setSearchResult]);

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
          isRenderSavedMoviesButton={false}
          movies={searchResult}
          visibleMoviesCount={visibleMoviesCount}
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
