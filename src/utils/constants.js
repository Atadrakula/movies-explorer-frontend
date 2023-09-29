import notImage from '../images/no_photo.png';

const serverDataConfig = {
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  // url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  urlForImg: 'https://api.nomoreparties.co/',
};

const serverAuthConfig = {
  // url: 'https://api.nomoreparties.co/beatfilm-movies',
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};

const cyrillicRegex = /^[а-яёА-ЯЁ]+$/;
const latinRegex = /^[a-zA-Z]+$/;

const containsCyrillicAndLatinRegex = /^(?=.*[а-яА-ЯёЁ])(?=.*[a-zA-Z])/;

export {
  serverAuthConfig,
  serverDataConfig,
  cyrillicRegex,
  latinRegex,
  containsCyrillicAndLatinRegex,
  notImage,
};
