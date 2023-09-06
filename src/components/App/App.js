import './App.css';
import Header from '../landing/Header/Header.js';
import Main from '../landing/Main/Main.js';
import Footer from '../landing/Footer/Footer.js';
import React from 'react';

function App() {
  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
