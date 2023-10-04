import { serverDataFilmsConfig } from './constants';

class MovieApi {
  constructor({ url, headers }) {
    this._generalUrl = url;
    this._headers = headers;
  }

  _checkResponse(response) {
    if (!response.ok) {
      console.error(
        `Ошибка при запросе ${response.url}. Код статуса: ${response.status}`,
      );
      return response.json().then((errorData) => {
        throw new Error(errorData.message || `Ошибка: ${response.status}`);
      });
    }
    return response.json();
  }

  _request(endpoint, options) {
    return fetch(`${this._generalUrl}${endpoint}`, {
      ...options,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  pullMovieInfo() {
    return this._request(`/`);
  }
}

const movieApi = new MovieApi(serverDataFilmsConfig);

export default movieApi;
