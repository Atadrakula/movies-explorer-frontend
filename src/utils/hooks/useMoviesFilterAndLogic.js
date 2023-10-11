import { useEffect, useState } from 'react';
import { latinRegex, containsCyrillicAndLatinRegex } from '../constants';

export function useMoviesFilterAndLogic(savedMovies = null, allMovies = []) {
  const [currentSearchKeyword, setCurrentSearchKeyword] = useState('');
  const [errorMovieApi, setErrorMovieApi] = useState('');
  const [errorSearch, setErrorSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [savedSearchResult, setSavedSearchResult] = useState([]);
  const [submitedSearchKeyword, setSubmitedSearchKeyword] = useState('');
  const [isShortFilm, setShortFilm] = useState(false);
  const [isNoneResult, setNoneResult] = useState(false);
  const [isLoadingSearch, setLoadingSearch] = useState(false);

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

  useEffect(() => {
    if (searchResult.length > 0) {
      saveSearchResultsToLocalStorage(
        currentSearchKeyword,
        isShortFilm,
        searchResult,
      );
    }
  }, [currentSearchKeyword, isShortFilm, searchResult]);

  // Добавлен вызов поиска при изменении положения чекбокса
  useEffect(() => {
    if (currentSearchKeyword) {
      searchMovies();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShortFilm]);

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

  //(?.) оператор optional chaining он позволяет читать значение свойств объекта
  //внутри цепочки ссылок без необходимости явно проверять каждое из них на null или undefined.

  function getAbsoluteImageUrl(movie, preUrl, notImageUrl) {
    if (movie?.image?.url) {
      return `${preUrl}${movie.image.url}`;
    } else if (movie?.image) {
      return movie.image;
    }
    return notImageUrl;
  }

  function searchSavedMoviesByKeyword(keyword, savedMovies) {
    try {
      const filteredSavedMovies = savedMovies.filter((movie) =>
        getMovieName(movie).toLowerCase().includes(keyword.toLowerCase()),
      );
      if (filteredSavedMovies.length === 0) {
        setNoneResult(true);
        setSavedSearchResult([]);
      } else {
        setNoneResult(false);
        setSavedSearchResult(filteredSavedMovies);
      }
    } catch (error) {
      setErrorMovieApi(
        `Произошла ошибка при запросе к API сервера с сохраненными фильмами: ${error.message}`,
      );
    }
  }

  //поиск по всем фильмам:
  function searchAllMoviesByKeyword(keyword) {
    const filteredAllMovies = allMovies.filter((movie) =>
      getMovieName(movie).toLowerCase().includes(keyword.toLowerCase()),
    );
    try {
      if (filteredAllMovies.length === 0) {
        setNoneResult(true);
        setSearchResult([]);
      } else {
        setNoneResult(false);
        setSearchResult(filteredAllMovies); // 2
      }
    } catch (error) {
      setErrorMovieApi(
        `Произошла ошибка при запросе к API со всеми фильмами: ${error.message}`,
      );
    }
  }

  // сохранение фильмов в localStorage
  function saveSearchResultsToLocalStorage(keyword, isShortFilm, movies) {
    const data = {
      keyword,
      isShortFilm,
      movies,
    };
    localStorage.setItem('searchResults', JSON.stringify(data));
  }

  function validateSearcKeyword() {
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
  }

  function validateAndSearch() {
    validateSearcKeyword();
    try {
      if (savedMovies) {
        // Если savedMovies предоставлены, выполняем поиск по сохраненным фильмам
        searchSavedMoviesByKeyword(currentSearchKeyword, savedMovies);
      } else {
        // В противном случае выполняем поиск по всем фильмам
        searchAllMoviesByKeyword(currentSearchKeyword);
      }
      setErrorSearch('');
      setLoadingSearch(false);
    } catch (error) {
      setErrorSearch(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
      );
    }
  }

  // Вынесен поиск в отдельную функцию для возможности применения поиска при переключении чекбокса
  function searchMovies() {
    validateAndSearch();
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNoneResult(false);
    setLoadingSearch(true);

    searchMovies();
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
    setCurrentSearchKeyword,
    setSearchResult,
    setSavedSearchResult,
    savedSearchResult,
    isLoadingSearch,
  };
}
