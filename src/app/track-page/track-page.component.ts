import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusixMatchAPIServiceClient} from '../services/musixmatch.service.client';
import {Track} from '../models/track.model.client';
import {UserServiceClient} from '../services/user.service.client';
import {TrackServiceClient} from '../services/track.service.client';
import {User} from '../models/user.model.client';
import {PlaylistServiceClient} from '../services/playlist.service.client';
import {Playlist} from '../models/playlist.model.client';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private trackService: TrackServiceClient,
              private userService: UserServiceClient,
              private musicService: MusixMatchAPIServiceClient,
              private playlistService: PlaylistServiceClient) {
    this.route.params.subscribe(params => this.setParams(params));
  }
  trackId: number;
  track: Track = new Track();
  lyrics: string;
  liked = false;
  isUserLoggedIn = false;
  userCode = 0;
  tempTranslation: string;
  tempTranslationArray = [];
  user: User = new User();
  likedUsersId = [];
  dislikedUsersId = [];
  likedUsers: User[] = [];
  dislikedUsers: User[] = [];
  translatorUsers: User[] = [];
  newPlaylist: Playlist = new Playlist();
  playlists: Playlist[] = [];
  setParams(params) {
    if (params['trackId']) {
      this.trackId = Number(params['trackId']);
      this.loadUserProfile();
      this.loadTrackInfo(this.trackId);
      this.loadLyrics(this.trackId);
    }
  }
  handleRating() {
    this.liked = !this.liked;
    let rating = 'like';
    if (this.liked) {
      rating = 'like';
    } else {
      rating = 'dislike';
    }
    this.trackService
      .updateSong(this.trackId, rating)
      .then((updatedSong) => {
        this.track.likes = (updatedSong as Track).likes;
        this.track.dislikes = (updatedSong as Track).dislikes;
        this.track.listOfUsers = (updatedSong as Track).listOfUsers;
        this.likedUsersId = this.track.listOfUsers.filter(x => x.rating === 'like').map(x => x.userId);
        this.dislikedUsersId = this.track.listOfUsers.filter(x => x.rating === 'dislike').map(x => x.userId);
        return this.userService.findAllUsersByIds(this.likedUsersId);
      })
      .then((result) => {
        if (result) {
          this.likedUsers = result as User[];
        }
        return this.userService.findAllUsersByIds(this.dislikedUsersId);
      })
      .then((result) => {
        if (result) {
          this.dislikedUsers = result as User[];
        }
      })
      .catch((error) => console.log(error));

  }
  createAndAddToPlaylist() {
    this.playlistService
      .createAndAddToPlaylist(this.newPlaylist.name, this.trackId, this.track.track_name)
      .then((result) => {
        this.loadPlaylists();
      });
  }
  addToPlaylist(playlistId) {
    this.playlistService
      .addToPlaylist(playlistId, this.trackId, this.track.track_name)
      .then((result) => console.log(result));
  }
  submitTranslation() {
    this.trackService.updateTranslation(this.trackId, this.tempTranslation)
      .then((result) => {
        if (result.status === 200) {
          return result.json();
        } else {
          throw new Error('Translation submission failed');
        }
      })
      .then((updatedSong) => {
          this.track.translation = (updatedSong as Track).translation;
          this.tempTranslation = this.track.translation;
          this.tempTranslationArray = this.tempTranslation.split('\n');
          this.track.lot = (updatedSong as Track).lot;
          return this.userService
                  .findAllUsersByIds(this.track.lot.map(x => x.userId));
      })
      .then((result) => {
        if (result) {
          this.translatorUsers = result as User[];
        }
      })
      .catch((error) => console.log(error));
  }
  loadTrackInfo(trackId) {
    this.musicService
      .getTrack(trackId)
      .then((result) => {
      const message = (result as any).message;
      if (message.header.status_code === 200) {
        this.track = (result as any).message.body.track as Track;
        return this.findOrCreateSong(trackId, this.track.track_name);
      }
      });
  }
  loadLyrics(trackId) {
    this.musicService
      .getLyrics(trackId)
      .then((result) => {
        const lyricsPara = result.message.body.lyrics.lyrics_body;
        this.lyrics = lyricsPara.split('\n');
      });
  }
  loadUserData() {
    this.loadPlaylists();
    this.loadRatingForThisSong();
  }
  loadRatingForThisSong() {
    this.trackService.findRatedSongsForUser()
      .then((result) => {
        if (result) {
          const ratingForThisSong = result.filter(x => x.track_id === this.trackId);
          if (ratingForThisSong.length > 0) {
            this.liked = String(ratingForThisSong[0].rating) === 'like';
          }
        }
      });
  }
  loadPlaylists() {
    this.playlistService.findPlaylistsForUser()
      .then((result) => {
          this.playlists = result as Playlist[];
      });
  }
  findOrCreateSong(trackId, trackName) {
    this.trackService
      .findTrackById(trackId)
      .then((result) => {
        if (result.status !== 200) {
          console.log('did not found song, so creating');
          return this.trackService.createTrack(trackId, trackName);
        } else {
          console.log('came here, i.e. found song ');
          return result.json();
        }
      })
      .then((createdSong) => {
        if (createdSong) {
          const track = createdSong as Track;
          this.track.likes = track.likes || 0;
          this.track.dislikes = track.dislikes || 0;
          this.track.listOfUsers = track.listOfUsers;
          this.track.lot = track.lot;
          if (track.translation) {
            this.track.translation = track.translation;
            this.tempTranslation = this.track.translation;
            this.tempTranslationArray = this.track.translation.split('\n');
          }
          this.likedUsersId = this.track.listOfUsers.filter(x => x.rating === 'like').map(x => x.userId);
          this.dislikedUsersId = this.track.listOfUsers.filter(x => x.rating === 'dislike').map(x => x.userId);
          return this.userService.findAllUsersByIds(this.likedUsersId);
        }
      })
      .then((result) => {
        if (result) {
          this.likedUsers = result as User[];
        }
        return this.userService.findAllUsersByIds(this.dislikedUsersId);
      })
      .then((result) => {
        if (result) {
          this.dislikedUsers = result as User[];
        }
        return this.userService
          .findAllUsersByIds(this.track.lot.map(x => x.userId));
      })
      .then((result) => {
        if (result) {
          console.log('translator users: are');
          console.log(result);
          this.translatorUsers = result as User[];
        }
      })
      .catch((error) => console.log(error));
  }
  loadUserProfile() {
    this.userService
      .isUserLoggedIn()
      .then((result) => {
        if (result.status === 200) {
          this.isUserLoggedIn = true;
          return this.userService.profile();
        } else {
          this.isUserLoggedIn = false;
          this.userCode = 0;
        }
      })
      .then((result) => {
        this.user = result as User;
        if (this.user.userType === 'User') {
          this.userCode = 1;
        } else if (this.user.userType === 'Premium') {
          this.userCode = 2;
        } else if (this.user.userType === 'Admin') {
          this.userCode = 3;
        } else {
          this.userCode = 0;
        }
        return this.loadUserData();
      })
      .catch(() => {
        console.log('No user logged in');
      });
  }
  ngOnInit() {
  }

}
