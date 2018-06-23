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
  pageNumber = 1;
  setParams(params) {
    this.artistId = params['artistId'];
    this.pageNumber = 1;
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
  onScroll() {
    if (this.artistId) {
      this.loadAlbums(this.artistId);
    }
  }
  loadAlbums(artistId) {
    this.musicService
      .searchAlbums(artistId, this.pageNumber)
      .then((result) => {
        if (this.pageNumber === 1) {
          this.albums = result.message.body.album_list.map(x => x.album);
        } else {
          const currentItems = this.albums;
          const newItems = result.message.body.album_list.map(x => x.album);
          for (let i = 0; i < newItems.length ; i++) {
            currentItems.push(newItems[i]);
          }
          this.albums = currentItems;
        }
        this.pageNumber += 1;
      });
  }
  ngOnInit() {
  }

}
