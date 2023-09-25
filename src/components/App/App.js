/* eslint-disable no-unused-vars */
import './App.css';
import AuthHeader from '../landing/Header/AuthHeader/AuthHeader';
import NotAuthHeader from '../landing/Header/NotAuthHeader/NotAuthHeader';
import Main from '../landing/Main/Main.js';
import Movies from '../landing/Movies/Movies';
import Footer from '../landing/Footer/Footer.js';
import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NotFound from '../landing/NotFound/NotFound';
import SavedMovies from '../landing/SavedMovies/SavedMovies';
import PopupProfile from '../landing/PopupProfile/PopupProfile';
import Register from '../landing/Register/Register';
import Login from '../landing/Login/Login';
import PopupMenu from '../landing/PopupMenu/PopupMenu';
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({ _id: '12345' });
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(false);

  const location = useLocation();

  function openPopupMenu() {
    setPopupVisible(true);
  }

  function closePopupMenu() {
    setPopupVisible(false);
  }

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
            <Route path="/movies" element={<Movies />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="/profile" element={<PopupProfile />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {!isRouteWithoutHeaderAndFooter && !isNotFooterUnvisible && (
            <Footer />
          )}
          <PopupMenu onClose={closePopupMenu} isOpen={isPopupVisible} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
