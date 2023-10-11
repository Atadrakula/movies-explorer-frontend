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
};
