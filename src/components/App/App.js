/* eslint-disable no-unused-vars */
import './App.css';
import AuthHeader from '../landing/Header/AuthHeader/AuthHeader';
import NotAuthHeader from '../landing/Header/NotAuthHeader/NotAuthHeader';
import Main from '../landing/Main/Main.js';
import Movies from '../landing/Movies/Movies';
import Footer from '../landing/Footer/Footer.js';
import React, { useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NotFound from '../landing/NotFound/NotFound';
import Preloader from '../landing/Movies/Preloader/Preloader';
import SavedMovies from '../landing/SavedMovies/SavedMovies';
import Profile from '../landing/Profile/Profile';
import Register from '../landing/Register/Register';
import Login from '../landing/Login/Login';
import PopupMenu from '../landing/Movies/PopupMenu/PopupMenu';
// import { Route, Routes } from 'react-router-dom';

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ _id: '12345' });
  const [visibleCards, setVisibleCards] = useState();
  const [isPopupVisible, setPopupVisible] = useState(false);

  function openPopupMenu() {
    setPopupVisible(true);
  }

  function closePopupMenu() {
    setPopupVisible(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <AuthHeader isThemeDark={true} isOpen={openPopupMenu} />
          {/* <NotAuthHeader /> */}
          {/* <Main /> */}
          <Movies />
          {/* <SavedMovies /> */}
          <Footer />
          {/* <NotFound /> */}
          {/* <Profile /> */}
          {/* <Register /> */}
          {/* <Login /> */}
          <PopupMenu onClose={closePopupMenu} isOpen={isPopupVisible} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
