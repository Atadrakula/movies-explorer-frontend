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
  // const [movies, setMovies] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState('');

  const location = useLocation();

  async function handleSearchSubmit(keyword) {
    try {
      const dataMovies = await movieApi.pullMovieInfo(keyword);
      const filteredMovies = dataMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()),
      );
      setSearchResult(filteredMovies || []);
    } catch (error) {
      setError(`Произошла ошибка при запросе к API: ${error}`);
    }
  }

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
                  movies={searchResult}
                  onSearchSubmit={handleSearchSubmit}
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
