import * as constants from '../constants/index';

export class UserServiceClient {

  login(user) {
    return fetch(constants.LOGIN_API_URL, {
      body: JSON.stringify(user),
      credentials: 'include',
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  logout() {
    return fetch(constants.LOGOUT_API_URL, {
      credentials: 'include',
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  findUserById(userId) {
    return fetch(constants.USER_API_URL + userId)
      .then(response => response.json());
  }

  isUserLoggedIn() {
    return fetch(constants.SESSION_API_URL,
      {
        credentials: 'include', // include, same-origin, *omit
        headers: {
          'content-type': 'application/json'
        }
      });
  }

  profile() {
    return fetch(constants.PROFILE_API_URL,
      {
        credentials: 'include', // include, same-origin, *omit
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(response => response.json());
  }

  updateProfile(user) {
    return fetch(constants.PROFILE_API_URL, {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  createUser(username, password, selectedUserType) {
    const user = {
      username: username,
      password: password,
      userType: selectedUserType
    };
    return fetch(constants.USER_API_URL, {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  findAllUsers() {
    return fetch(constants.USER_API_URL)
      .then(response => response.json());
  }
}
