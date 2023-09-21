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
// import { Route, Routes } from 'react-router-dom';

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ _id: '12345' });
  const [visibleCards, setVisibleCards] = useState();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <AuthHeader isTheme={true} />
          {/* <NotAuthHeader /> */}
          {/* <Main /> */}
          {/* <Movies /> */}
          {/* <SavedMovies /> */}
          {/* <Footer /> */}
          {/* <NotFound /> */}
          <Profile />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
