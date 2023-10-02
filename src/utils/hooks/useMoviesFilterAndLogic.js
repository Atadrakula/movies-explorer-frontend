import { useState } from 'react';
import { latinRegex, containsCyrillicAndLatinRegex } from '../constants';
import movieApi from '../MovieApi';

export function useMoviesFilterAndLogic(savedMovies = null) {
  const [currentSearchKeyword, setCurrentSearchKeyword] = useState('');
  const [errorMovieApi, setErrorMovieApi] = useState('');
  const [errorSearch, setErrorSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [submitedSearchKeyword, setSubmitedSearchKeyword] = useState('');
  const [isShortFilm, setShortFilm] = useState(false);
  const [isNoneResult, setNoneResult] = useState(false);

  const handleInputChange = (e) => {
    setCurrentSearchKeyword(e.target.value);
  };

  const isСharacterQuery = (keyword, regex) => {
    return regex.test(keyword);
  };

  const getMovieName = (movie) => {
    if (isСharacterQuery(submitedSearchKeyword, latinRegex)) {
      return movie.nameEN;
    } else {
      return movie.nameRU;
    }
  };

  const filteredShortMovies = (movies) => {
    if (isShortFilm) {
      return movies.filter((movie) => movie.duration <= 40);
    }
    return movies;
  };

  function searchSavedMoviesByKeyword(keyword, savedMovies) {
    try {
      const filteredSavedMovies = savedMovies.filter((movie) =>
        getMovieName(movie).toLowerCase().includes(keyword.toLowerCase()),
      );
      if (filteredSavedMovies.length === 0) {
        setNoneResult(true);
        setSearchResult([]);
      } else {
        setNoneResult(false);
        setSearchResult(filteredSavedMovies);
      }
    } catch (error) {
      setErrorMovieApi(
        `Произошла ошибка при запросе к API сервера с сохраненными фильмами: ${error.message}`,
      );
    }
  }

  async function searchAllMoviesByKeyword(keyword) {
    try {
      const dataMovies = await movieApi.pullMovieInfo();
      const filteredAllMovies = dataMovies.filter((movie) =>
        getMovieName(movie).toLowerCase().includes(keyword.toLowerCase()),
      );

      if (filteredAllMovies.length === 0) {
        setNoneResult(true);
        setSearchResult([]);
      } else {
        setNoneResult(false);
        setSearchResult(filteredAllMovies);
      }
    } catch (error) {
      setErrorMovieApi(
        `Произошла ошибка при запросе к API со всеми фильмами: ${error.message}`,
      );
    }
  }

  function validateAndSearch() {
    if (!currentSearchKeyword) {
      setErrorSearch('Нужно ввести ключевое слово');
      return;
    } else if (
      isСharacterQuery(currentSearchKeyword, containsCyrillicAndLatinRegex)
    ) {
      setErrorSearch(
        'Пожалуйста, используйте только символы одного алфавита (кириллицы или латиницы).',
      );
      return;
    }

    setSubmitedSearchKeyword(currentSearchKeyword);
    try {
      if (savedMovies) {
        // Если savedMovies предоставлены, выполняем поиск по сохраненным фильмам
        searchSavedMoviesByKeyword(currentSearchKeyword, savedMovies);
      } else {
        // В противном случае выполняем поиск по всем фильмам
        searchAllMoviesByKeyword(currentSearchKeyword);
      }
      setErrorSearch('');
    } catch (error) {
      setErrorSearch(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
      );
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setNoneResult(false);

    validateAndSearch();
  };

  function getCorrectFormateDuration(movie) {
    if (movie && movie.duration) {
      const hours = Math.floor(movie.duration / 60);
      const remainingMinutes = movie.duration % 60;
      const hoursText = hours > 0 ? `${hours}ч` : '';
      const minutesText = remainingMinutes > 0 ? `${remainingMinutes}м` : '';

      if (hoursText && minutesText) {
        return `${hoursText} ${minutesText}`;
      } else {
        return `${hoursText}${minutesText}`;
      }
    }
    return 'неизвестно';
  }

  //(?.) оператор optional chaining он позволяет читать значение свойств объекта внутри цепочки ссылок без необходимости явно проверять каждое из них на null или undefined.

  function getAbsoluteImageUrl(movie, preUrl, notImageUrl) {
    if (movie?.image?.url) {
      return `${preUrl}${movie.image.url}`;
    } else if (movie?.image) {
      return movie.image;
    }
    return notImageUrl;
  }

  return {
    currentSearchKeyword,
    errorMovieApi,
    searchResult,
    isNoneResult,
    isShortFilm,
    setShortFilm,
    handleInputChange,
    getMovieName,
    handleSubmit,
    filteredShortMovies,
    getCorrectFormateDuration,
    getAbsoluteImageUrl,
    errorSearch,
  };
}

// async function validateAndSearch() {
//   if (!currentSearchKeyword) {
//     setErrorSearch('Нужно ввести ключевое слово');
//     return;
//   } else if (isСharacterQuery(currentSearchKeyword, containsCyrillicAndLatinRegex)) {
//     setErrorSearch(
//       'Пожалуйста, используйте только символы одного алфавита (кириллицы или латиницы).',
//     );
//     return;
//   }

//   try {
//     setSubmitedSearchKeyword(currentSearchKeyword);

//     const [allMovies, savedMovies] = await Promise.all([
//       searchMoviesByKeyword(currentSearchKeyword, false),
//       searchMoviesByKeyword(currentSearchKeyword, true),
//     ]);

//     // Обработка результатов запросов
//     if (allMovies.length === 0 && savedMovies.length === 0) {
//       setNoneResult(true);
//       setSearchResult([]);
//     } else {
//       setNoneResult(false);
//       setSearchResult([...allMovies, ...savedMovies]);
//     }

//     setErrorSearch('');
//   } catch (error) {
//     setErrorSearch(
//       'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
//     );
//   }
// }
