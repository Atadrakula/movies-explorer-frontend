/* eslint-disable no-unused-vars */
import './App.css';
import AuthHeader from '../landing/Header/AuthHeader/AuthHeader';
import NotAuthHeader from '../landing/Header/NotAuthHeader/NotAuthHeader';
import Main from '../landing/Main/Main.js';
import Footer from '../landing/Footer/Footer.js';
import React from 'react';
// import { Route, Routes } from 'react-router-dom';

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="body">
      <div className="page">
        <NotAuthHeader />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
