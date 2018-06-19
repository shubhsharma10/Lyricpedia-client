import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusixMatchAPIServiceClient} from '../services/musixmatch.service.client';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private musicService: MusixMatchAPIServiceClient) {
    this.route.params.subscribe(params => this.setParams(params));
  }
  tracks = [];
  artistId = 0;
  artistName: string;
  albumId = 0;
  albumName: string;
  trackCount = 0;
  trackReleaseYear: string;
  albumCoverArt: any;
  setParams(params) {
    if (params['albumId']) {
      this.albumId = params['albumId'];
      this.loadAlbum(this.albumId);
      this.loadAlbumTracks(this.albumId);
    }
  }
  loadAlbum(albumId) {
    this.musicService
      .getAlbum(albumId)
      .then((result) => {
        const album = result.message.body.album;
          this.artistName = album.artist_name;
          this.artistId = album.artist_id;
          this.albumName = album.album_name;
          this.trackCount = album.album_track_count;
          this.trackReleaseYear = album.album_release_date.split('-')[0];
          this.albumCoverArt = album.album_coverart_100x100;
      });
  }
  loadAlbumTracks(albumId) {
    this.musicService
      .getAlbumTracks(albumId)
      .then((result) => {
        const trackList = (result as any).message.body.track_list;
        this.tracks = trackList.map(x => x.track);
      });
  }
  getTrackLength(trackLength) {
    let trackLen = trackLength;
    trackLen = trackLen / 60;
    return trackLen.toFixed(2);
  }
  ngOnInit() {
  }

}
