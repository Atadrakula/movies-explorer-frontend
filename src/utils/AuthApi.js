import { ServerAuthConfig } from './constants';

class AuthApi {
  constructor({ url, headers }) {
    this._generalUrl = url;
    this._headers = headers;
    this._token = null;
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

  _request(endpoint, headers, options) {
    return fetch(`${this._generalUrl}${endpoint}`, {
      ...options,
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((error) => {
        throw new Error(
          `Не удалось получить данные с сервера: ${error.message}`,
        );
      });
  }

  pushRegistration(data) {
    return this._request('/signup', this._headers, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
        name: data.name,
      }),
    });
  }

  pushLogin(data) {
    return this._request('/signin', this._headers, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then((res) => {
      return res;
    });
  }

  pullDataAuth() {
    return this._request('/users/me', this._headers, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  pushLogout() {
    return this._request('/signout', this._headers, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    });
  }
}

const authApi = new AuthApi(ServerAuthConfig);

export default authApi;
