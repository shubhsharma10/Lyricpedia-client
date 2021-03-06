import * as constants from '../constants/index';
import {User} from '../models/user.model.client';

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
    return fetch(constants.DIRECT_USER_API_URL.replace('UID', userId))
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

  addUser(username, password, selectedUserType) {
    const user = {
      username: username,
      password: password,
      userType: selectedUserType
    };
    return fetch(constants.ADD_USER_API_URL, {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
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

  updateUser(userId, user) {
    return fetch(constants.DIRECT_USER_API_URL.replace('UID', userId), {
        body: JSON.stringify(user),
        credentials: 'include', // include, same-origin, *omit
        method: 'put',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(response => response.json());
  }

  deleteUser(userId) {
    return fetch(constants.DIRECT_USER_API_URL.replace('UID', userId), {
      credentials: 'include', // include, same-origin, *omit
      method: 'delete'
    });
  }

  findAllUsers() {
    return fetch(constants.USER_API_URL)
      .then(response => response.json());
  }

  findAllUsersByIds(listOfUserIds) {
    const listOfUserIdsObj = {
      listOfUserIds: listOfUserIds
    };
    return fetch(constants.ALL_USER_BY_IDS_API_URL, {
            body: JSON.stringify(listOfUserIdsObj),
            credentials: 'include', // include, same-origin, *omit
            method: 'put',
            headers: {
            'content-type': 'application/json'
          }
        })
      .then(response => response.json())
      .then((result) => {
        return (result as User[]).filter(x => x);
      });
  }

  followUser(fuserId) {
    const targetUser = {
      fuserId: fuserId
    };
    return fetch(constants.FOLLOW_USER_API_URL,
      {
        body: JSON.stringify(targetUser),
        method: 'post',
        credentials: 'include', // include, same-origin, *omit
        headers: {
          'content-type': 'application/json'
        }
      });
  }

  unfollowUser(fuserId) {
    const targetUser = {
      fuserId: fuserId
    };
    return fetch(constants.UNFOLLOW_USER_API_URL,
      {
        body: JSON.stringify(targetUser),
        method: 'post',
        credentials: 'include', // include, same-origin, *omit
        headers: {
          'content-type': 'application/json'
        }
      });
  }

  searchUsersByQuery(queryString) {
    return fetch(constants.USER_API_URL + '?queryString=' + queryString)
      .then(response => response.json());
  }
}
