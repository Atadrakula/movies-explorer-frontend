import React from 'react';
import './Main.css';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

function Main({ borderStyle }) {
  return (
    <main className="main">
      <Promo children={<NavTab />} />
      <AboutProject />
      <Techs borderStyle={borderStyle} />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
