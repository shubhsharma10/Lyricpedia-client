import * as constants from '../constants/index';

export class PlaylistServiceClient {

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

  addToPlaylist(playlistName, trackId, trackName) {
    const playlistData = {
      playlistName: playlistName,
      trackId: trackId,
      trackName: trackName };
    return fetch(constants.ADD_TO_PLAYLIST_API_URL, {
      body: JSON.stringify(playlistData),
      credentials: 'include', // include, same-origin, *omit
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());

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
