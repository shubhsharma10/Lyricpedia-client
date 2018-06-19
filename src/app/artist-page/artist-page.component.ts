import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusixMatchAPIServiceClient} from '../services/musixmatch.service.client';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private musicService: MusixMatchAPIServiceClient) {
    this.route.params.subscribe(params => this.setParams(params));
  }
  artistId: number;
  artistName: string;
  albums = [];
  setParams(params) {
    this.artistId = params['artistId'];
    this.loadArtistInfo(this.artistId);
    this.loadAlbums(this.artistId);
  }
  loadArtistInfo(artistId) {
    this.musicService
      .getArtist(artistId)
      .then((result) => {
        this.artistName = result.message.body.artist.artist_name;
      });
  }
  loadAlbums(artistId) {
    this.musicService
      .searchAlbums(artistId)
      .then((result) => {
        const newItems = result.message.body.album_list;
        this.albums = newItems.map(x => x.album);
      });
  }
  ngOnInit() {
  }

}
