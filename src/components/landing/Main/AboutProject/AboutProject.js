import React from 'react';
import ChapterTitle from '../../common/ChapterTitle/ChapterTitle';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <ChapterTitle text={'О проекте'} />
      <ul className="about-project__chapter-description">
        <li className="about-project__block-subtitle">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__block-subtitle">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__chapter-period">
        <li className="about-project__period-1">
          <h4 className="about-project__period-1-title">1 неделя</h4>
          <p className="about-project__period-1-text">Back-end</p>
        </li>
        <li className="about-project__period-2">
          <h4 className="about-project__period-2-title">4 недели</h4>
          <p className="about-project__period-2-text">Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;
