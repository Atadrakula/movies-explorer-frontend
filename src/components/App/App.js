/* eslint-disable no-unused-vars */
import './App.css';
import AuthHeader from '../landing/Header/AuthHeader/AuthHeader';
import NotAuthHeader from '../landing/Header/NotAuthHeader/NotAuthHeader';
import Main from '../landing/Main/Main.js';
import Movies from '../landing/Movies/Movies';
import Footer from '../landing/Footer/Footer.js';
import React, { useCallback, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NotFound from '../landing/NotFound/NotFound';
import SavedMovies from '../landing/SavedMovies/SavedMovies';
import PopupProfile from '../landing/PopupProfile/PopupProfile';
import Register from '../landing/Register/Register';
import Login from '../landing/Login/Login';
import PopupMenu from '../landing/PopupMenu/PopupMenu';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// import movieApi from '../../utils/MovieApi';
import mainApi from '../../utils/MainApi';
import authApi from '../../utils/AuthApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(null);
  const [visibleMoviesCountToPressButton, setVisibleMoviesCountToPressButton] =
    useState(0);
  const [authError, setAuthError] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorApi, setErrorApi] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await authApi.pullDataAuth();
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      } catch (error) {
        setErrorApi(
          `Ошибка при загрузке данных пользователя: ${error.message}`,
        );
        console.error(
          `Ошибка при загрузке данных пользователя: ${error.message}`,
        );
        setLoggedIn(false);
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`App: fetchData: loggedIn: ${loggedIn} `);
      if (!loggedIn) return;

      try {
        const [dataSavedMovies, dataUser] = await Promise.all([
          mainApi.pullMovieInfo(),
          mainApi.pullProfileInfo(),
        ]);
        setSavedMovies(dataSavedMovies.data);
        setCurrentUser(dataUser.data);
      } catch (error) {
        setErrorApi(`Ошибка при загрузке данных: ${error.message}`);
        console.error(`Ошибка при загрузке данных:${error.message}`);
      }
    };
    fetchData();
  }, [loggedIn]);

  //РАБОЧЕЕ !!!

  function isMovieSaved(movie) {
    return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
  }

  async function handleMovieDislike(dataMovie) {
    // console.log('Сохраненные фильмы:', savedMovies);
    // console.log('Текущий пользователь:', currentUser._id);
    // console.log('Фильм для удаления:', dataMovie);
    const savedMovie = savedMovies.find(
      (savedMovie) =>
        savedMovie.movieId === dataMovie.id &&
        savedMovie.owner === currentUser._id,
    );

    if (!savedMovie) {
      setErrorApi('Фильм для дизлайка/удаления не найден');
      console.error('Фильм для дизлайка/удаления не найден');
      return;
    }

    try {
      await mainApi.deleteMovieCard(savedMovie.movieId);
      setSavedMovies((prevSavedMovies) =>
        prevSavedMovies.filter((movie) => movie.movieId !== savedMovie.movieId),
      );
    } catch (error) {
      setErrorApi(`Ошибка при удалении фильма: ${error.message}`);
      console.error(`Ошибка при удалении фильма: ${error.message}`);
    }
  }

  async function handleMovieLike(dataMovie) {
    try {
      const newSavedMovie = await mainApi.pushNewMovieCard(dataMovie);
      setSavedMovies((prevSavedMovies) => [
        ...prevSavedMovies,
        newSavedMovie.data,
      ]);
    } catch (error) {
      setErrorApi(`Ошибка при сохранении фильма: ${error.message}`);
      console.error(`Ошибка при сохранении фильма: ${error.message}`);
    }
  }

  async function handleSignOut() {
    try {
      await authApi.pushLogout();
      setLoggedIn(false);
    } catch (error) {
      setErrorApi(`Ошибка при выходе из системы: ${error.message}`);
      console.error(`Ошибка при выходе из системы: ${error.message}`);
    }
  }

  async function handleLogin(data) {
    try {
      const response = await authApi.pushLogin(data);
      if (response.token) {
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      }
    } catch (error) {
      setAuthError(
        `Произошла ошибка входа. Пожалуйста, проверьте введенные данные и повторите попытку.`,
      );
      console.error(
        `Ошибка при отправки данных регистрации пользователя: ${error.message}`,
      );
    }
  }

  async function handleRegister(data) {
    try {
      const result = await authApi.pushRegistration(data);
      if (result.data) {
        navigate('/signin', { replace: true });
      }
    } catch (error) {
      setAuthError(
        `Ошибка при отправки данных регистрации пользователя: ${error.message}`,
      );
      console.error(
        'Ошибка при отправки данных регистрации пользователя:',
        error,
      );
    }
  }

  async function handleUpdateUser(dataUser) {
    try {
      const updateData = await mainApi.patchProfileInfo(dataUser);
      setCurrentUser(updateData.data);
    } catch (error) {
      setErrorApi(
        `Ошибка при обновлении данных пользователя: ${error.message}`,
      );
      console.error(
        `Ошибка при обновлении данных пользователя: ${error.message}`,
      );
    }
  }

  function initialCalculateVisibleMovies(screenWidth) {
    if (screenWidth >= 1280) {
      return 12; // 4 ряда по 3 карточки
    } else if (screenWidth >= 768) {
      return 8; // 4 ряда по 2 карточки
    } else {
      return 5; // 5 карточек по 1 в ряд
    }
  }

  function pressButtonCalculateVisibleMovies(screenWidth) {
    if (screenWidth >= 1280) {
      return 3;
    } else {
      return 2;
    }
  }

  useEffect(() => {
    let resizeTimeout; // Переменная для хранения таймера

    function handleResize() {
      clearTimeout(resizeTimeout); // Очищаем предыдущий таймер, если он был установлен
      resizeTimeout = setTimeout(() => {
        const screenWidth = window.innerWidth;
        const newVisibleMoviesCount =
          initialCalculateVisibleMovies(screenWidth);
        const newVisibleMoviesCountToPressButton =
          pressButtonCalculateVisibleMovies(screenWidth);
        setVisibleMoviesCount((prevCount) =>
          Math.max(prevCount, newVisibleMoviesCount),
        );
        setVisibleMoviesCountToPressButton(newVisibleMoviesCountToPressButton);
      }, 1000); // Устанавливаем задержку в 1000 миллисекунд
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setVisibleMoviesCount]);

  function openPopupMenu() {
    setPopupVisible(true);
  }

  const closeAllPopups = useCallback(() => {
    setPopupVisible(false);
  }, []);

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isPopupVisible) {
      document.addEventListener('keydown', handleEscClose);

      return () => {
        document.removeEventListener('keydown', handleEscClose);
      };
    }

    return () => {};
  }, [isPopupVisible, closeAllPopups]);

  useEffect(() => {
    const darkThemeRoutes = ['/movies', '/saved-movies', '/profile'];
    setIsThemeDark(darkThemeRoutes.includes(location.pathname));
  }, [location]);

  const isRouteWithoutHeaderAndFooter = ['/signin', '/signup'].includes(
    location.pathname,
  );

  const isRouteWithoutFooter = ['/profile'].includes(location.pathname);

  const isAuthHeaderVisible = loggedIn && !isRouteWithoutHeaderAndFooter;
  const isNotAuthHeaderVisible = !loggedIn && !isRouteWithoutHeaderAndFooter;
  const isNotFooterUnvisible = loggedIn && isRouteWithoutFooter;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {isAuthHeaderVisible && (
            <AuthHeader isThemeDark={isThemeDark} isOpen={openPopupMenu} />
          )}
          {isNotAuthHeaderVisible && (
            <NotAuthHeader isThemeDark={isThemeDark} />
          )}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <Movies
                  visibleMoviesCount={visibleMoviesCount}
                  setVisibleMoviesCount={setVisibleMoviesCount}
                  visibleMoviesCountToPressButton={
                    visibleMoviesCountToPressButton
                  }
                  handleMovieLike={handleMovieLike}
                  handleMovieDislike={handleMovieDislike}
                  // onToggleMovieLike={handleToggleMovieLike}
                  isMovieSaved={isMovieSaved}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  savedMovies={savedMovies}
                  // onToggleMovieLike={handleToggleMovieLike}
                  isMovieSaved={isMovieSaved}
                  handleMovieLike={handleMovieLike}
                  handleMovieDislike={handleMovieDislike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <PopupProfile
                  onSignOut={handleSignOut}
                  onUpdateProfile={handleUpdateUser}
                />
              }
            />
            <Route
              path="/signin"
              element={<Login onLogin={handleLogin} authError={authError} />}
            />
            <Route
              path="/signup"
              element={
                <Register onRegister={handleRegister} authError={authError} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {!isRouteWithoutHeaderAndFooter && !isNotFooterUnvisible && (
            <Footer />
          )}
          <PopupMenu onClose={closeAllPopups} isOpen={isPopupVisible} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

//РАБОЧЕЕ !!!
// async function handleMovieDislike(dataMovie) {
//   console.log('Сохраненные фильмы:', savedMovies);
//   console.log('Текущий пользователь:', currentUser._id);
//   console.log('Фильм для удаления:', dataMovie);
//   const savedMovie = savedMovies.find(
//     (savedMovie) =>
//     savedMovie.nameEN === dataMovie.nameEN &&
//     savedMovie.owner === currentUser._id,
//     );
//     try {
//       await mainApi.deleteMovieCard(savedMovie._id);
//       setSavedMovies((prevSavedMovies) =>
//       prevSavedMovies.filter((movie) => movie._id !== savedMovie._id),
//       );
//     } catch (error) {
//       console.error(`Ошибка при удалении фильма: ${error.message}`);
//     }
//   }

// function handleToggleMovieLike(movie) {
//   const isSaved = savedMovies.some(c => c.movieId === movie.id);
//   if (!isSaved) {
//     mainApi.pushNewMovieCard(movie)
//       .then((movie) => setSavedMovies([movie, ...savedMovies]))
//       .catch((err) => console.log(err));
//   } else {
//     const id = savedMovies.find(c => c.movieId === movie.id)._id;
//     mainApi.deleteMovieCard(id)
//     .then(() => {
//       setSavedMovies(res => res.filter(c => c.movieId !== movie.id))
//     })
//     .catch((err) => console.log(err));
//   }
// }
// РАБОЧЕЕ
// async function handleToggleMovieLike(dataMovie) {
//   const savedMovie = savedMovies.find(
//     (savedMovie) =>
//       savedMovie.nameEN === dataMovie.nameEN &&
//       savedMovie.owner === currentUser._id,
//   );

//   console.log('Data movie to be toggled:', dataMovie);
//   console.log('Found saved movie:', savedMovie);

//   if (savedMovie) {
//   // Если фильм уже сохранен, удаляем его
//   try {
//       await mainApi.deleteMovieCard(savedMovie._id);
//       setSavedMovies((prevSavedMovies) =>
//         prevSavedMovies.filter((movie) => movie._id !== savedMovie._id),
//       );
//     } catch (error) {
//       console.error(`Ошибка при удалении фильма: ${error.message}`);
//     }
//   } else {
//     // Если фильм не сохранен, сохраняем его и ставим в начало
//     try {
//       const newSavedMovie = await mainApi.pushNewMovieCard(dataMovie);
//       setSavedMovies((prevSavedMovies) => [
//         ...prevSavedMovies,
//         newSavedMovie,
//       ]);
//     } catch (error) {
//       console.error(`Ошибка при сохранении фильма: ${error.message}`);
//     }
//   }
// }

//надо потестить
// useEffect(() => {
//   const fetchData = async () => {
//     if (!loggedIn) return;

//       if (!savedMovies.length) {
//         // Запрашиваем сохраненные фильмы только если их еще нет в состоянии
//         const dataSavedMovies = await mainApi.pullMovieInfo();
//         setSavedMovies(dataSavedMovies.data || []);
//       }

//       if (!currentUser) {
//         // Запрашиваем данные пользователя только если они еще не загружены
//         const dataUser = await mainApi.pullProfileInfo();
//         setCurrentUser(dataUser.data);
//       }
//     } catch (error) {
//       setErrorApi(`Ошибка при загрузке данных: ${error.message}`);
//       console.error(`Ошибка при загрузке данных: ${error.message}`);
//     }
//   };

//   fetchData();
// }, [loggedIn, savedMovies, currentUser]);

// const savedMovie = savedMovies.find(
//   (savedMovie) =>
//   savedMovie.movieId === dataMovie.id &&
//   savedMovie.owner === currentUser._id,
// );

// function isMovieSaved(movie) {
//   return savedMovies.some((savedMovie) => savedMovie.nameEN === movie.nameEN);
// }

// async function handleMovieLike(dataMovie) {
//   try {
//     const newSavedMovie = await mainApi.pushNewMovieCard(dataMovie);
//     setSavedMovies((prevSavedMovies) => [...prevSavedMovies, newSavedMovie]);
//   } catch (error) {
//     console.error(`Ошибка при сохранении фильма: ${error.message}`);
//   }
// }

//   Функция isMovieSaved:
// Эта функция проверяет, сохранён ли фильм в списке сохранённых фильмов.

// Аргумент функции — movie — это фильм, который необходимо проверить.
// Функция возвращает true, если фильм уже сохранён, и false в противном случае.
// Для этой проверки используется метод массива .some(), который возвращает true, если хотя бы один элемент массива удовлетворяет условие.
// Условие проверки — совпадение movieId сохранённого фильма с _id проверяемого фильма.

// function isMovieSaved(movie) {
//   console.log("movie", movie);
//   console.log("savedMovies", savedMovies);
//   debugger

//   return savedMovies.some((savedMovie) => savedMovie._id === movie._id);
// }

//   Функция handleMovieDislike:
// Эта функция обрабатывает действие "дизлайка" или удаления фильма из списка сохранённых.

// Аргумент функции — dataMovie — это фильм, который необходимо удалить.
// В начале функции идёт поиск соответствующего фильма в списке сохранённых фильмов.
// Если соответствующий фильм не найден, выводится сообщение об ошибке и функция завершает выполнение.
// Если фильм найден, то происходит попытка удаления этого фильма с использованием API (mainApi.deleteMovieCard).
// После успешного удаления, фильм также удаляется из локального состояния приложения.

// async function handleMovieDislike(dataMovie) {
//   console.log('Сохраненные фильмы:', savedMovies);
//   console.log('Текущий пользователь:', currentUser._id);
//   console.log('Фильм для удаления:', dataMovie);

//   const savedMovie = savedMovies.find(
//     (savedMovie) => savedMovie._id === dataMovie._id
//   );
//   console.log('savedMovie._id', savedMovie._id);

//   if (!savedMovie) {
//     console.error('Фильм для удаления не найден.');
//     return;
//   }

//   try {
//     await mainApi.deleteMovieCard(savedMovie._id);
//     setSavedMovies((prevSavedMovies) =>
//       prevSavedMovies.filter((movie) => movie._id !== savedMovie._id),
//     );
//   } catch (error) {
//     console.error(`Ошибка при удалении фильма: ${error.message}`);
//   }
// }

// Функция handleMovieLike:
// Эта функция обрабатывает действие "лайка" или добавления фильма в список сохранённых.

// Аргумент функции — dataMovie — это фильм, который необходимо добавить.
// Сначала происходит попытка добавления фильма с использованием API (mainApi.pushNewMovieCard).
// Если фильм успешно добавлен на сервер, он также добавляется в локальное состояние приложения.
// Если произошла ошибка при добавлении, выводится сообщение об ошибке.

// async function handleMovieLike(dataMovie) {
//   try {
//     const newSavedMovie = await mainApi.pushNewMovieCard(dataMovie);
//     setSavedMovies((prevSavedMovies) => [...prevSavedMovies, newSavedMovie]);
//   } catch (error) {
//     console.error(`Ошибка при сохранении фильма: ${error.message}`);
//   }
// }

//     try {
