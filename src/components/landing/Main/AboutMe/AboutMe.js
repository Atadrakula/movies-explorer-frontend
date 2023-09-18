import React from 'react';
import ChapterTitle from '../../../common/ChapterTitle/ChapterTitle';
import './AboutMe.css';
import avatar from '../../../../images/avatar-student.png';

function AboutMe() {
  return (
    <section className="about-me">
      <ChapterTitle text={'Студент'} />
      <div className="about-me__chapter-description-with-avatar">
        <ul className="about-me__chapter-description">
          <li>
            <h3 className="about-me__name">Виталий</h3>
          </li>
          <li>
            <h4 className="about-me__activity">Фронтенд-разработчик, 30 лет</h4>
          </li>
          <li>
            <p className="about-me__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </li>
          <li>
            <a
              href="https://github.com/Atadrakula"
              target="_blank"
              className="about-me__github-link link-hover"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
        <img src={avatar} alt="Аватар студента" className="about-me__avatar" />
      </div>
    </section>
  );
}

export default AboutMe;
