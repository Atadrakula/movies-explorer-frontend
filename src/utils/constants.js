import notImage from '../images/no_photo.png';

const serverDataFilmsConfig = {
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  // url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  urlForImg: 'https://api.nomoreparties.co/',
};

const serverAuthConfig = {
  // url: 'https://api.web.portfolio.diploma.nomoredomainsicu.ru',
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};

const serverDataLocalConfig = {
  // url: 'https://api.web.portfolio.diploma.nomoredomainsicu.ru',
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};

const initialCalculateVisibleMovies = (screenWidth) => {
  if (screenWidth >= 1280) {
    return 12; // 4 ряда по 3 карточки
  } else if (screenWidth >= 768) {
    return 8; // 4 ряда по 2 карточки
  } else {
    return 5; // 5 карточек по 1 в ряд
  }
};

const pressButtonCalculateVisibleMovies = (screenWidth) => {
  if (screenWidth >= 1280) {
    return 3;
  } else {
    return 2;
  }
};

const getCorrectFormateDuration = (movie) => {
  if (movie && movie.duration) {
    const hours = Math.floor(movie.duration / 60);
    const remainingMinutes = movie.duration % 60;
    const hoursText = hours > 0 ? `${hours}ч` : '';
    const minutesText = remainingMinutes > 0 ? `${remainingMinutes}м` : '';

    if (hoursText && minutesText) {
      return `${hoursText} ${minutesText}`;
    } else {
      return `${hoursText}${minutesText}`;
    }
  }
  return 'неизвестно';
};

//(?.) оператор optional chaining он позволяет читать значение свойств объекта
//внутри цепочки ссылок без необходимости явно проверять каждое из них на null или undefined.

const getAbsoluteImageUrl = (movie, preUrl) => {
  if (movie?.image?.url) {
    return `${preUrl}${movie.image.url}`;
  } else if (movie?.image) {
    return movie.image;
  }
  return notImage;
};

const urlForImgToServerDataFilms = (data) =>
  `${serverDataFilmsConfig.urlForImg}${data.image.url}`;

const urlForThumbnailToServerDataFilms = (data) =>
  `${serverDataFilmsConfig.urlForImg}${data.image.formats.thumbnail.url}`;

const cyrillicRegex = /^[а-яёА-ЯЁ]+$/; //регулярка только кириллицы
const latinRegex = /^[a-zA-Z]+$/; //регулярка только латиницы

const containsCyrillicAndLatinRegex = /^(?=.*[а-яА-ЯёЁ])(?=.*[a-zA-Z])/; //регулярка как минимум 1 символа кириллицы и латиницы
const validNameRegex = /^[A-Za-zА-Яа-яЁё\s-]*$/; //регулярка только латиницы, кириллицы, пробел или дефис

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=])[A-Za-z\d!@#$%^&*()\-_+=]{8,}$/;
// Должен содержать хотя бы одну строчную (a-z) букву.
// Должен содержать хотя бы одну заглавную (A-Z) букву.
// Должен содержать хотя бы одну цифру (0-9).
// Должен содержать хотя бы один специальный символ из набора: !@#$%^&*()-_+=.
// Все символы, включая специальные символы, допустимы в строке. Длина строки должна быть не менее 8 символов

export {
  serverAuthConfig,
  serverDataFilmsConfig,
  serverDataLocalConfig,
  cyrillicRegex,
  latinRegex,
  containsCyrillicAndLatinRegex,
  validNameRegex,
  strongPasswordRegex,
  urlForImgToServerDataFilms,
  urlForThumbnailToServerDataFilms,
  notImage,
  pressButtonCalculateVisibleMovies,
  initialCalculateVisibleMovies,
  getCorrectFormateDuration,
  getAbsoluteImageUrl,
};
