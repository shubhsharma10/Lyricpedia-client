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
  user: User = new User();
  newPlaylist: Playlist = new Playlist();
  playlists: Playlist[] = [];
  setParams(params) {
    if (params['trackId']) {
      this.trackId = Number(params['trackId']);
      this.loadTrackInfo(this.trackId);
      this.loadLyrics(this.trackId);
    }
  }
  handleRating() {
    this.liked = !this.liked;
    console.log('going to update');
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
      });
  }
  createAndAddToPlaylist() {
    this.playlistService
      .createAndAddToPlaylist(this.newPlaylist.name, this.trackId, this.track.track_name)
      .then((result) => console.log(result));
  }
  addToPlaylist(playlistName) {
    console.log('asking to add to playlist ' + playlistName);
    this.playlistService
      .addToPlaylist(playlistName, this.trackId, this.track.track_name)
      .then((result) => console.log(result));
  }
  loadTrackInfo(trackId) {
    this.musicService
      .getTrack(trackId)
      .then((result) => {
      const message = (result as any).message;
      if (message.header.status_code === 200) {
        this.track = (result as any).message.body.track as Track;
        this.track.likes = 0;
        this.track.dislikes = 0;
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
    this.loadRatingForThisSong();
    this.loadPlaylists();
  }
  loadRatingForThisSong() {
    this.trackService.findRatedSongsForUser()
      .then((result) => {
        if (result) {
          const ratingForThisSong = result.filter(x => x.track_id === this.trackId);
          if (ratingForThisSong.length > 0) {
            console.log(ratingForThisSong);
            this.liked = String(ratingForThisSong[0].rating) === 'like';
            this.track.likes = ratingForThisSong[0].likes;
            this.track.dislikes = ratingForThisSong[0].dislikes;
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
        }
      })
      .then((createdSong) => {
        if (createdSong) {
          console.log(createdSong);
        }
      })
      .catch((error) => console.log(error));
  }
  ngOnInit() {
    this.userService
      .isUserLoggedIn()
      .then((result) => {
        if (result.status === 200) {
          this.isUserLoggedIn = true;
          return this.userService.profile();
        } else {
          this.isUserLoggedIn = false;
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
        }
        return this.loadUserData();
      })
      .catch(() => {
        console.log('No user logged in');
      });
  }

}
