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
import movieApi from '../../utils/MovieApi';
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
  const [movies, setMovies] = useState([]);
  const [authError, setAuthError] = useState('');
  const [email, setEmail] = useState('');
  const [errorApi, setErrorApi] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userData = await authApi.pullDataAuth();
        // console.log(`App: userData.data.email: ${userData.data.email}`);
        setEmail(userData.data.email);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      } catch (error) {
        setErrorApi(`Ошибка при загрузке данных пользователя: ${error}`);
        console.error(`Ошибка при загрузке данных пользователя: ${error}`);
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
        const dataUser = await mainApi.pullProfileInfo();
        // console.log(`App: dataUser: ${dataUser.data}`);

        // const [dataCards, dataUser] = await Promise.all([
        //   movieApi.pullMovieInfo(),
        // mainApi.pullProfileInfo(),
        // ]);
        // setMovies(dataCards.data || []);
        setCurrentUser(dataUser.data); //null?
        // console.log(`App: currentUser: ${currentUser}`)
      } catch (error) {
        setErrorApi('Ошибка при загрузке данных:', error);
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    fetchData();
  }, [loggedIn]);

  async function handleSignOut() {
    try {
      await authApi.pushLogout();
      setLoggedIn(false);
    } catch (error) {
      setErrorApi(`Ошибка при выходе из системы: ${error}`);
      console.error(`Ошибка при выходе из системы: ${error}`);
    }
  }

  async function handleLogin(data) {
    try {
      const response = await authApi.pushLogin(data);
      if (response.token) {
        setEmail(data.email);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      }
    } catch (error) {
      setAuthError(
        `Произошла ошибка входа. Пожалуйста, проверьте введенные данные и повторите попытку.`,
      );
      console.error(
        `Ошибка при отправки данных регистрации пользователя: ${error}`,
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
        `Ошибка при отправки данных регистрации пользователя: ${error}`,
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
      console.error('Ошибка при обновлении данных пользователя:', error);
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
                />
              }
            />
            <Route path="/saved-movies" element={<SavedMovies />} />
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
