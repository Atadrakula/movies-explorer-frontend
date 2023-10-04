import React from 'react';
import ChapterTitle from '../../common/ChapterTitle/ChapterTitle';
import './Techs.css';

function Techs({ borderStyle }) {
  return (
    <section className="techs" id="about-techs">
      <ChapterTitle borderStyle={borderStyle} text={'Технологии'} />
      <div className="techs__chapter-description">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <ul className="techs__chapter-technologies">
        <li>
          <p className="techs__specification-name">HTML</p>
        </li>
        <li>
          <p className="techs__specification-name">CSS</p>
        </li>
        <li>
          <p className="techs__specification-name">JS</p>
        </li>
        <li>
          <p className="techs__specification-name">React</p>
        </li>
        <li>
          <p className="techs__specification-name">Git</p>
        </li>
        <li>
          <p className="techs__specification-name">Express.js</p>
        </li>
        <li>
          <p className="techs__specification-name">mongoDB</p>
        </li>
      </ul>
    </section>
  );
}

export default Techs;
