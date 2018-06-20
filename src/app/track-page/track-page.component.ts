import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusixMatchAPIServiceClient} from '../services/musixmatch.service.client';
import {Track} from '../models/track.model.client';
import {UserServiceClient} from '../services/user.service.client';
import {TrackServiceClient} from '../services/track.service.client';
import {User} from '../models/user.model.client';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private trackService: TrackServiceClient,
              private userService: UserServiceClient,
              private musicService: MusixMatchAPIServiceClient) {
    this.route.params.subscribe(params => this.setParams(params));
  }
  trackId: number;
  track: Track = new Track();
  lyrics: string;
  liked = false;
  isUserLoggedIn = false;
  user: User = new User();
  setParams(params) {
    if (params['trackId']) {
      this.trackId = Number(params['trackId']);
      this.loadTrackInfo(this.trackId);
      this.loadLyrics(this.trackId);
    }
  }
  handleRating() {
    this.liked = !this.liked;
    if (this.liked) {
      this.trackService
        .updateSong(this.trackId, 'like')
        .then((updatedSong) => console.log('updatedSong'));
    } else {
      this.trackService
        .updateSong(this.trackId, 'dislike')
        .then((updatedSong) => console.log('updatedSong'));
    }
  }
  loadTrackInfo(trackId) {
    this.musicService
      .getTrack(trackId)
      .then((result) => {
      const message = (result as any).message;
      if (message.header.status_code === 200) {
        this.track = (result as any).message.body.track as Track;
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
  loadRatingForThisSong(trackId) {
    this.trackService.findRatedSongsForUser()
      .then((result) => {
        if (result) {
          const ratingForThisSong = result.filter(x => x.track_id === trackId);
          if (ratingForThisSong.length > 0) {
            this.liked = String(ratingForThisSong[0].rating) === 'like';
          }
        }
      });
  }
  findOrCreateSong(trackId) {
    this.trackService
      .findTrackById(trackId)
      .then((result) => {
        if (result.status !== 200) {
          console.log('did not found song');
          return this.trackService.createTrack(trackId);
        }
      })
      .then((createdSong) => {
        if (createdSong) {
          return this.loadRatingForThisSong(trackId);
        }
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }
  ngOnInit() {
    this.userService
      .isUserLoggedIn()
      .then((result) => {
        if (result.status === 200) {
          this.isUserLoggedIn = true;
          return this.findOrCreateSong(this.trackId);
        } else {
          this.isUserLoggedIn = false;
          throw new Error('No user logged in');
        }
      })
      .then((result) => {
        if (result) {
            console.log(result);
        }
      })
      .catch(() => {
        console.log('No user logged in');
      });
  }

}
