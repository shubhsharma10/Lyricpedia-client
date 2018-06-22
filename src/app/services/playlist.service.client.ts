import * as constants from '../constants/index';

export class PlaylistServiceClient {

  findPlaylistById(playlistId) {
    return fetch(constants.DIRECT_PLAYLIST_API_URL.replace('PID', playlistId))
      .then(response => response.json());
  }

  createAndAddToPlaylist(playlistName, trackId, trackName) {
    const playlist = {
      name: playlistName,
      tracks: []
    };
    playlist.tracks.push({track_id: trackId, track_name: trackName});
    console.log('creating playlist');
    console.log(playlist);
    return fetch(constants.PLAYLIST_API_URL, {
        body: JSON.stringify(playlist),
        credentials: 'include', // include, same-origin, *omit
        method: 'post',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(response => response.json());
  }

  addToPlaylist(playlistId, trackId, trackName) {
    const playlistData = {
      trackId: trackId,
      trackName: trackName };
    return fetch(constants.DIRECT_PLAYLIST_API_URL.replace('PID', playlistId) + '/add', {
      body: JSON.stringify(playlistData),
      credentials: 'include', // include, same-origin, *omit
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());

  }

  removeSongFromPlaylist(playlistId, trackId) {
      const playlistData = {
        trackId: trackId
      };
      return fetch(constants.DIRECT_PLAYLIST_API_URL.replace('PID', playlistId) + '/remove', {
        body: JSON.stringify(playlistData),
        credentials: 'include', // include, same-origin, *omit
        method: 'put',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => response.json());
  }

  renamePlaylist(playlistId, newName) {
    const playlistData = {
      newName: newName
    };
    return fetch(constants.DIRECT_PLAYLIST_API_URL.replace('PID', playlistId), {
      body: JSON.stringify(playlistData),
      credentials: 'include', // include, same-origin, *omit
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  deletePlaylist(playlistId) {
    return fetch(constants.DIRECT_PLAYLIST_API_URL.replace('PID', playlistId), {
      credentials: 'include', // include, same-origin, *omit
      method: 'delete'
    });
  }

  findPlaylistsForUser() {
    return fetch(constants.USER_PLAYLIST_API_URL, {
      credentials: 'include',
      method: 'get',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  findAllPlaylists() {
    return fetch(constants.PLAYLIST_API_URL)
      .then(response => response.json());
  }
}
