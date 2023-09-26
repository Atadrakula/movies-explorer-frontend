import React from 'react';
import ChapterTitle from '../../common/ChapterTitle/ChapterTitle';
import './AboutMe.css';
import avatar from '../../../../images/avatar-student.jpeg';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <ChapterTitle text={'Студент'} />
      <div className="about-me__chapter-description-with-avatar">
        <div className="about-me__chapter-description">
          <h3 className="about-me__name">Антон</h3>
          <h4 className="about-me__activity">Фулстек-разработчик, 32 года</h4>
          <p className="about-me__text">
            Я родился в Твери, но последние 8 лет живу и работаю в
            Санкт-Петербурге. Мое образование - факультет автоматизированных
            систем ТГТУ. У меня есть прекрасная жена и дочь, которые вдохновляют
            меня каждый день. Я всегда стремлюсь к обучению и росту. Недавно
            начал изучать программирование, и мир веб-разработки меня увлек. С
            2015 года работаю в группе компаний "Газпром-Нефть" на различных
            ИТ-позициях, преимущественно в управлении ИТ-портфелем услуг и
            ИТ-проектами. Моя страсть - подводная охота, которая научила меня
            сосредотачиваться и добиваться целей. Сегодня я готов развиваться в
            мире веб-разработки, и я уверен, что моя страсть к изучению и опыт в
            управлении ИТ-проектами сделают меня ценным приобретением для вашей
            команды.
          </p>
          <a
            href="https://github.com/Atadrakula"
            target="_blank"
            className="about-me__github-link link-hover"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={avatar} alt="Аватар студента" className="about-me__avatar" />
      </div>
    </section>
  );
}

export default AboutMe;
