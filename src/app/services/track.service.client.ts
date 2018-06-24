import * as constants from '../constants/index';

export class TrackServiceClient {
  //
  // updateProfile(user) {
  //   return fetch(constants.PROFILE_API_URL, {
  //     body: JSON.stringify(user),
  //     credentials: 'include', // include, same-origin, *omit
  //     method: 'put',
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   });
  // }

  findTrackById(trackId) {
    return fetch(constants.DIRECT_SONG_API_URL.replace('SID', trackId));
  }

  createTrack(trackId, trackName) {
    const song = {
      track_id: trackId,
      track_name: trackName
    };
    console.log('creating song');
    console.log(song);
    return fetch(constants.SONG_API_URL, {
      body: JSON.stringify(song),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  deleteSong(trackId) {
    return fetch(constants.DIRECT_SONG_API_URL.replace('SID', trackId), {
      credentials: 'include', // include, same-origin, *omit
      method: 'delete'
    });
  }

  updateSong(songId, rating) {
    const ratingObj = {
      rating: rating
    };
    return fetch(constants.SONG_API_URL + '/' + songId, {
        body: JSON.stringify(ratingObj),
        credentials: 'include', // include, same-origin, *omit
        method: 'put',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(response => response.json());
  }

  updateTranslation(songId, translation) {
    const translationObj = {
      translation: translation
    };
    return fetch(constants.TRANSLATION_API_URL.replace('SID', songId), {
              body: JSON.stringify(translationObj),
              credentials: 'include',
              method: 'put',
              headers: {
                'content-type': 'application/json'
              }
          });
  }

  findRatedSongsForUser() {
    return fetch(constants.USER_SONG_API_URL, {
      credentials: 'include',
      method: 'get',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  findTranslatedSongsForUser(){
    return fetch(constants.USER_TRANSLATED_SONGS_API_URL, {
      credentials: 'include',
      method: 'get',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  findAllSongs() {
    return fetch(constants.SONG_API_URL)
      .then(response => response.json());
  }

  findAllTranslatedSongs() {
    return fetch(constants.TRANSLATED_SONGS_API_URL)
      .then(response => response.json());
  }
}
