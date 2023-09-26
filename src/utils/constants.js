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

export { serverAuthConfig, serverDataConfig, notImage };
