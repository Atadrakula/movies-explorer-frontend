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
import { Route, Routes, useLocation } from 'react-router-dom';
import movieApi from '../../utils/MovieApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({ _id: '12345' });
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(0);
  const [visibleMoviesCountToPressButton, setVisibleMoviesCountToPressButton] =
    useState(0);
  const location = useLocation();

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
      return 3; // 4 ряда по 3 карточки
    } else {
      return 2; // 4 ряда по 2 карточки
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
            <Route path="/profile" element={<PopupProfile />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
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

// const [movies, setMovies] = useState([]);
// useEffect(() => {
//   const fetchData = async () => {
//     if (!loggedIn) return;

//     try {
//       const [dataCards, dataUser] = await Promise.all([
//         movieApi.pullMovieInfo(),
//         movieApi.pullProfileInfo(),
//       ]);
//       setMovies(dataCards.data || []);
//       setCurrentUser(dataUser.data || {}); //null?
//     } catch (error) {
//       console.error('Ошибка при загрузке данных:', error);
//     }
//   };

//   fetchData();
// }, [loggedIn]);

// useEffect(() => {
//   // Функция для расчета видимого количества карточек в зависимости от ширины экрана
//   const calculateVisibleMovies = () => {
//     const screenWidth = window.innerWidth;

//     if (screenWidth >= 1280) {
//       setVisibleMoviesCount(12); // 4 ряда по 3 карточки
//     } else if (screenWidth >= 768) {
//       setVisibleMoviesCount(8); // 4 ряда по 2 карточки
//     } else {
//       setVisibleMoviesCount(5); // 5 карточек по 1 в ряд
//     }
//   };

//   calculateVisibleMovies();

//   // Добавляем слушатель события изменения размера окна
//   window.addEventListener('resize', calculateVisibleMovies);

//   // Очистка слушателя при размонтировании компонента
//   return () => {
//     window.removeEventListener('resize', calculateVisibleMovies);
//   };
// }, [setVisibleMoviesCount]);
