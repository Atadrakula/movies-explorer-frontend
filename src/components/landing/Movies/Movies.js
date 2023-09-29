import React, { useState } from 'react';
import './Movies.css';
import SearchForm from '../common/SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import ButtonElse from './ButtonElse/ButtonElse';
import {
  latinRegex,
  containsCyrillicAndLatinRegex,
} from '../../../utils/constants';
import movieApi from '../../../utils/MovieApi';

function Movies({
  visibleMoviesCount,
  setVisibleMoviesCount,
  visibleMoviesCountToPressButton,
}) {
  const [currentSearchKeyword, setCurrentSearchKeyword] = useState('');
  const [error, setError] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [submitedSearchKeyword, setSubmitedSearchKeyword] = useState('');
  const [isShortFilm, setShortFilm] = useState(false);
  const [isNoneResult, setNoneResult] = useState(false);

  const showAllMovies = (movies) => {
    if (isShortFilm) {
      return movies.filter((movie) => movie.duration <= 40);
    }
    return movies;
  };

  const handleInputChange = (e) => {
    setCurrentSearchKeyword(e.target.value);
  };

  const isLatinQuery = (keyword) => {
    // Проверяем, содержит ли запрос латинские символы с помощью регулярного выражения
    return latinRegex.test(keyword);
  };

  const isContainLatinAndCyrillicQuery = (keyword) => {
    // Проверяем, содержит ли запрос латинские символы с помощью регулярного выражения
    return containsCyrillicAndLatinRegex.test(keyword);
  };

  const getMovieName = (movie) => {
    if (isLatinQuery(submitedSearchKeyword)) {
      return movie.nameEN;
    } else {
      return movie.nameRU;
    }
  };

  async function searchMoviesByKeyword(keyword) {
    try {
      const dataMovies = await movieApi.pullMovieInfo(keyword);
      const filteredMovies = dataMovies.filter((movie) =>
        getMovieName(movie).toLowerCase().includes(keyword.toLowerCase()),
      );

      if (filteredMovies.length === 0) {
        setNoneResult(true);
        setSearchResult([]);
      } else {
        setNoneResult(false);
        setSearchResult(filteredMovies);
      }
    } catch (error) {
      setError(`Произошла ошибка при запросе к API: ${error}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setNoneResult(false);

    if (!currentSearchKeyword) {
      setError('Нужно ввести ключевое слово');
      return;
    } else if (isContainLatinAndCyrillicQuery(currentSearchKeyword)) {
      setError(
        'Пожалуйста, используйте только символы одного алфавита (кириллицы или латиницы).',
      );
      return;
    }

    try {
      setSubmitedSearchKeyword(currentSearchKeyword);
      searchMoviesByKeyword(currentSearchKeyword);
      setError('');
    } catch (error) {
      setError(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
      );
    }
  };

  return (
    <main className="movies">
      <SearchForm
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        currentSearchKeyword={currentSearchKeyword}
        textError={error}
        isShortFilm={isShortFilm}
        onToggleShortFilm={setShortFilm}
      />
      {searchResult.length > 0 ? (
        <MoviesCardList
          children={
            <ButtonElse
              visibleMoviesCount={visibleMoviesCount}
              setVisibleMoviesCount={setVisibleMoviesCount}
              visibleMoviesCountToPressButton={visibleMoviesCountToPressButton}
            />
          }
          filterFunction={showAllMovies}
          isSavedMovies={false}
          movies={searchResult}
          getMovieName={getMovieName}
          visibleMoviesCount={visibleMoviesCount}
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

// const isCyrillicQuery = (keyword) => {
//   return cyrillicRegex.test(keyword);
// };
