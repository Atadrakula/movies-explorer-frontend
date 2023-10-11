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
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import authApi from '../../utils/AuthApi';
import movieApi from '../../utils/MovieApi';
import ProtectedRouteElement from '../../utils/ProtectedRoute';
import Preloader from '../landing/Movies/Preloader/Preloader';
import ErrorPopup from '../landing/ErrorPopup/ErrorPopup';
import { useMoviesFilterAndLogic } from '../../utils/hooks/useMoviesFilterAndLogic';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(null);
  const [visibleMoviesCountToPressButton, setVisibleMoviesCountToPressButton] =
    useState(0);
  const [authTextError, setAuthTextError] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorApi, setErrorApi] = useState('');
  const [isMobileSavedCard, setMobileSavedCard] = useState(false);
  const [isMobileAuthHeader, setMobileAuthHeader] = useState(false);
  const [borderStyle, setBorderStyle] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [hasPressedShowMore, setHasPressedShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isRouteWithoutHeaderAndFooter = ['/signin', '/signup'].includes(
    location.pathname,
  );

  const isRouteWithoutFooter = ['/profile'].includes(location.pathname);

  const isAuthHeaderVisible = loggedIn && !isRouteWithoutHeaderAndFooter;
  const isNotAuthHeaderVisible = !loggedIn && !isRouteWithoutHeaderAndFooter;
  const isNotFooterUnvisible = loggedIn && isRouteWithoutFooter;

  const { errorMovieApi } = useMoviesFilterAndLogic;

  const closeAllPopups = useCallback(() => {
    setPopupVisible(false);
  }, []);

  useEffect(() => {
    // сброс authTextError при смене маршрута
    setAuthTextError('');
  }, [location.pathname]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        await authApi.pullDataAuth();
        setLoggedIn(true);
      } catch (error) {
        console.error(
          `Ошибка при загрузке данных пользователя: ${error.message}`,
        );
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!loggedIn) return;

      try {
        const dataMovies = await movieApi.pullMovieInfo();
        const dataSavedMovies = await mainApi.pullMovieInfo();
        const dataUser = await mainApi.pullProfileInfo();
        setAllMovies(dataMovies);
        setSavedMovies(dataSavedMovies.data);
        setCurrentUser(dataUser.data);
      } catch (error) {
        setErrorApi(`Ошибка при загрузке данных: ${error.message}`);
        console.error(`Ошибка при загрузке данных:${error.message}`);
      }
    };
    fetchData();
  }, [loggedIn]);

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

  useEffect(() => {
    let resizeTimeout; // Переменная для хранения таймера

    function updateUIBasedOnWidth() {
      clearTimeout(resizeTimeout); // Очищаем предыдущий таймер, если он был установлен
      resizeTimeout = setTimeout(() => {
        const screenWidth = window.innerWidth;

        if (window.innerWidth <= 800) {
          setMobileAuthHeader(true);
        } else {
          setMobileAuthHeader(false);
        }

        if (window.innerWidth <= 600) {
          setMobileSavedCard(true);
          setBorderStyle({
            borderBottom: `1px solid ${'#000' || '#DADADA'}`,
          });
        } else {
          setBorderStyle({});
          setMobileSavedCard(false);
        }
        // Доп логика - теперь изменение кол-ва отображаемых карточек происходит только при отсутсвии нажатия на Еще

        if (!hasPressedShowMore) {
          const newVisibleMoviesCount =
            initialCalculateVisibleMovies(screenWidth);
          setVisibleMoviesCount(newVisibleMoviesCount);
        }

        const newVisibleMoviesCountToPressButton =
          pressButtonCalculateVisibleMovies(screenWidth);
        setVisibleMoviesCountToPressButton(newVisibleMoviesCountToPressButton);
      }, 1000); // Устанавливаем задержку в 1000 миллисекунд
    }

    window.addEventListener('resize', updateUIBasedOnWidth);

    updateUIBasedOnWidth();

    return () => {
      window.removeEventListener('resize', updateUIBasedOnWidth);
    };
  }, [setVisibleMoviesCount, hasPressedShowMore]);

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

  function openPopupMenu() {
    setPopupVisible(true);
  }

  function isMovieSaved(movie) {
    return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
  }

  async function handleMovieDislike({ id, movieId }) {
    const actualMovieId = id || movieId;
    try {
      await mainApi.deleteMovieCard(actualMovieId);
      setSavedMovies((prevSavedMovies) =>
        prevSavedMovies.filter((movie) => movie.movieId !== actualMovieId),
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
      localStorage.removeItem('searchResults');
      setLoggedIn(false);
      navigate('/', { replace: true });
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
      setAuthTextError(
        `Произошла ошибка входа. Пожалуйста, проверьте введенные данные и повторите попытку.`,
      );
      console.error(
        `Произошла ошибка входа. Пожалуйста, проверьте введенные данные и повторите попытку.`,
      );
    }
  }

  async function handleRegister(data) {
    try {
      const result = await authApi.pushRegistration(data);
      if (result.data) {
        await handleLogin(data);
      }
    } catch (error) {
      setAuthTextError(`Ошибка при регистрации пользователя: ${error.message}`);
      console.error(`Ошибка при регистрации пользователя: ${error.message}`);
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
      throw error; // Выбрасываем исключение, чтобы его можно было перехватить в handleSubmit
    }
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {isAuthHeaderVisible && (
            <AuthHeader
              isMobileAuthHeader={isMobileAuthHeader}
              isThemeDark={isThemeDark}
              isOpen={openPopupMenu}
            />
          )}
          {isNotAuthHeaderVisible && (
            <NotAuthHeader isThemeDark={isThemeDark} />
          )}

          {errorMovieApi && <ErrorPopup message={errorMovieApi} />}
          {errorApi && <ErrorPopup message={errorApi} />}

          <Routes>
            <Route path="/" element={<Main borderStyle={borderStyle} />} />

            <Route
              path="/movies"
              element={
                <ProtectedRouteElement
                  element={Movies}
                  loggedIn={loggedIn}
                  allMovies={allMovies}
                  visibleMoviesCount={visibleMoviesCount}
                  setVisibleMoviesCount={setVisibleMoviesCount}
                  visibleMoviesCountToPressButton={
                    visibleMoviesCountToPressButton
                  }
                  handleMovieLike={handleMovieLike}
                  handleMovieDislike={handleMovieDislike}
                  isMovieSaved={isMovieSaved}
                  setHasPressedShowMore={setHasPressedShowMore}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  isMovieSaved={isMovieSaved}
                  handleMovieLike={handleMovieLike}
                  handleMovieDislike={handleMovieDislike}
                  isMobileSavedCard={isMobileSavedCard}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  element={PopupProfile}
                  loggedIn={loggedIn}
                  onSignOut={handleSignOut}
                  onUpdateProfile={handleUpdateUser}
                />
              }
            />
            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login onLogin={handleLogin} authTextError={authTextError} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register
                    onRegister={handleRegister}
                    authTextError={authTextError}
                  />
                )
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
