import {
  UrlForImgToServerDataFilms,
  UrlForThumbnailToServerDataFilms,
  ServerDataLocalConfig,
} from './constants';

class MainApi {
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
        if (response.status === 404) {
          return { data: [] }; // Считаем, что у пользователя нет сохраненных фильмов
        }
        throw new Error(errorData.message || `Ошибка: ${response.status}`);
      });
    }
    return response.json();
  }

  _request(endpoint, options) {
    return fetch(`${this._generalUrl}${endpoint}`, {
      ...options,
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  pullProfileInfo() {
    return this._request(`/users/me`);
  }

  patchProfileInfo(data) {
    return this._request(`/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    });
  }

  _transformMovieData(data) {
    return {
      movieId: data.id,
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: UrlForImgToServerDataFilms(data),
      trailerLink: data.trailerLink,
      thumbnail: UrlForThumbnailToServerDataFilms(data),
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    };
  }

  pushNewMovieCard(data) {
    return this._request(`/movies`, {
      method: 'POST',
      body: JSON.stringify(this._transformMovieData(data)),
    });
  }

  deleteMovieCard(movieId) {
    return this._request(`/movies/${movieId}`, {
      method: 'DELETE',
    });
  }

  pullMovieInfo() {
    return this._request(`/movies`);
  }
}

const mainApi = new MainApi(ServerDataLocalConfig);

export default mainApi;
