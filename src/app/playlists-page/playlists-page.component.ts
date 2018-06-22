import { Component, OnInit } from '@angular/core';
import {PlaylistServiceClient} from '../services/playlist.service.client';
import {Playlist} from '../models/playlist.model.client';

@Component({
  selector: 'app-playlists-page',
  templateUrl: './playlists-page.component.html',
  styleUrls: ['./playlists-page.component.css']
})
export class PlaylistsPageComponent implements OnInit {

  constructor(private playlistService: PlaylistServiceClient) { }
  playlists: Playlist[] = [];
  selectedPlaylist: Playlist = new Playlist();
  setSelectedPlaylist(playlistName) {
    const index = this.playlists.findIndex(x => x.name === playlistName);
    this.selectedPlaylist = this.playlists[index];
  }
  loadPlaylists() {
    this.playlistService.findPlaylistsForUser()
      .then((playlists) => {
        console.log(playlists);
        this.playlists = playlists as Playlist[];
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deletePlaylist(playlistId) {
    this.playlistService
      .deletePlaylist(playlistId)
      .then((result) => {
        console.log(result);
        return this.loadPlaylists();
      })
      .catch((error) => console.log(error));
  }
  ngOnInit() {
    this.loadPlaylists();
  }

}
