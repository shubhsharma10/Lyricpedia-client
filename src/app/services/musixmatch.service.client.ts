import * as constants from '../constants/index';

export class MusixMatchAPIServiceClient {
  getAlbum(albumId) {
    const params = {
      format: 'jsonp',
      callback: 't',
      album_id: albumId,
      apikey: constants.API_KEY
    };

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    const url = 'https://api.musixmatch.com/ws/1.1/album.get?' + query;
    return fetch(url)
      .then( (response) => response.text())
      .then((responseText) => {
        let match = (responseText as String).slice(2);
        match = match.slice(0, -2);
        return JSON.parse(match);
      });
  }

  getAlbumTracks(albumId) {
    const params = {
      format: 'jsonp',
      callback: 't',
      album_id: albumId,
      page: 1,
      page_size: 50,
      apikey: constants.API_KEY
    };

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    const url = 'https://api.musixmatch.com/ws/1.1/album.tracks.get?' + query;
    return fetch(url)
      .then( (response) => response.text())
      .then((responseText) => {
        let match = (responseText as String).slice(2);
        match = match.slice(0, -2);
        return JSON.parse(match);
      });
  }


  getArtist(artistId) {
    const params = {
      format: 'jsonp',
      callback: 't',
      artist_id: artistId,
      apikey: constants.API_KEY
    };

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    const url = 'https://api.musixmatch.com/ws/1.1/artist.get?' + query;
    return fetch(url)
      .then( (response) => response.text())
      .then((responseText) => {
        let match = (responseText as any).slice(2);
        match = match.slice(0,-2);
        return JSON.parse(match);
      });
  }

  searchAlbums(artistId,pageNumber) {
    const params = {
      format: 'jsonp',
      callback: 't',
      artist_id: artistId,
      page_size:6,
      page:pageNumber,
      s_release_date: 'desc',
      g_album_name: 1,
      apikey: constants.API_KEY
    };

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    const url = 'https://api.musixmatch.com/ws/1.1/artist.albums.get?' + query;
    return fetch(url)
      .then( (response) => response.text())
      .then((responseText) => {
        let match = (responseText as any).slice(2);
        match = match.slice(0,-2);
        return JSON.parse(match);
      });
  }

  getTrack(trackId) {
    const params = {
      format: 'jsonp',
      callback: 't',
      track_id: trackId,
      apikey: constants.API_KEY
    };

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    const url = 'https://api.musixmatch.com/ws/1.1/track.get?' + query;
    return fetch(url)
      .then( (response) => response.text())
      .then((responseText) => {
        let match = (responseText as any).slice(2);
        match = match.slice(0, -2);
        return JSON.parse(match);
      });
  }

  getLyrics(trackId) {
    const params = {
      format: 'jsonp',
      callback: 't',
      track_id: trackId,
      apikey: constants.API_KEY
    };

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    const url = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?' + query;
    return fetch(url)
      .then( (response) => response.text())
      .then((responseText) => {
        let match = (responseText as any).slice(2);
        match = match.slice(0, -2);
        return JSON.parse(match);
      });
  }

  searchTracks(word, pageNumber) {
    const params = {
      format: 'jsonp',
      callback: 't',
      q_lyrics: word,
      page_size: 20,
      page: pageNumber,
      apikey: constants.API_KEY
    };

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    const url = 'https://api.musixmatch.com/ws/1.1/track.search?' + query;
    return fetch(url)
      .then( (response) => response.text())
      .then((responseText) => {
        let match = (responseText as String).slice(2);
        match = match.slice(0, -2);
        return JSON.parse(match);
      });
  }
}
