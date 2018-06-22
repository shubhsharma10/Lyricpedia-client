import { Component, OnInit } from '@angular/core';
import {PlaylistServiceClient} from '../services/playlist.service.client';
import {Playlist} from '../models/playlist.model.client';

@Component({
  selector: 'app-all-playlists',
  templateUrl: './all-playlists.component.html',
  styleUrls: ['./all-playlists.component.css']
})
export class AllPlaylistsComponent implements OnInit {

  constructor(private playlistService: PlaylistServiceClient) { }
  playlists: Playlist[] = [];
  selectedPlaylist: Playlist = new Playlist();
  setSelectedPlaylist(playlistName) {
    const index = this.playlists.findIndex(x => x.name === playlistName);
    this.selectedPlaylist = this.playlists[index];
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
  loadPlaylists()
  {
    this.playlistService.findAllPlaylists()
      .then((playlists) => {
        console.log(playlists);
        this.playlists = playlists as Playlist[];
      })
      .catch((error) => {
        console.log(error);
      });
  }
  ngOnInit() {
    this.loadPlaylists();
  }

}
