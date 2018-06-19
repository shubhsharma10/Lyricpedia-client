import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusixMatchAPIServiceClient} from '../services/musixmatch.service.client';
import {Track} from '../models/track.model.client';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userService: UserServiceClient,
              private musicService: MusixMatchAPIServiceClient) {
    this.route.params.subscribe(params => this.setParams(params));
  }
  trackId: number;
  track: Track = new Track();
  lyrics: string;
  liked = false;
  isUserLoggedIn = false;
  setParams(params) {
    if (params['trackId']) {
      this.trackId = params['trackId'];
      this.loadTrackInfo(this.trackId);
      this.loadLyrics(this.trackId);
    }
  }
  handleRating() {
    this.liked = !this.liked;
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
  ngOnInit() {
    this.userService
      .isUserLoggedIn()
      .then((result) => {
        if (result.status === 200) {
          this.isUserLoggedIn = true;
          return true;
        } else {
          this.isUserLoggedIn = false;
          throw new Error('No user logged in');
        }
      })
      .then(() => {
      })
      .catch(() => {
        console.log('No user logged in');
      });
  }

}
