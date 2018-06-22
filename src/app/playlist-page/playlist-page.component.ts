import { Component, OnInit } from '@angular/core';
import {PlaylistServiceClient} from '../services/playlist.service.client';
import {ActivatedRoute} from '@angular/router';
import {Playlist} from '../models/playlist.model.client';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.css']
})
export class PlaylistPageComponent implements OnInit {

  constructor(private playlistService: PlaylistServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setParams(params));
  }
  playlistId: number;
  playlist: Playlist = new Playlist();
  setParams(params) {
    if (params['playlistId']) {
      this.playlistId = params['playlistId'];
      this.loadPlaylist(this.playlistId);
    }
  }
  renamePlaylist() {
      this.playlistService.renamePlaylist(this.playlistId, this.playlist.name)
        .then((result) => this.playlist = result as Playlist)
        .catch((error) => console.log(error));
  }
  removeSongFromPlaylist(playlistId, trackId) {
    this.playlistService.removeSongFromPlaylist(playlistId, trackId)
      .then((updatedPlaylist) => {
      console.log(updatedPlaylist);
      this.playlist = updatedPlaylist as Playlist;
      })
      .catch((error) => console.log(error));
  }
  loadPlaylist(playlistId) {
    this.playlistService
      .findPlaylistById(playlistId)
      .then((playlist) => this.playlist = playlist as Playlist)
      .catch((error) => console.log(error));
  }
  ngOnInit() {
  }

}
