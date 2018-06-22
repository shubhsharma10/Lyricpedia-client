import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlaylistServiceClient} from '../services/playlist.service.client';
import {Playlist} from '../models/playlist.model.client';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.css']
})
export class UserPlaylistsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private playlistService: PlaylistServiceClient) {
    this.route.params.subscribe(params => this.setParams(params));
  }
  visitingUserId: number;
  playlists: Playlist[] = [];
  selectedPlaylist: Playlist = new Playlist();
  setSelectedPlaylist(playlistName) {
    const index = this.playlists.findIndex(x => x.name === playlistName);
    this.selectedPlaylist = this.playlists[index];
  }
  setParams(params) {
    const userId = params['userId'];
    if (userId) {
      this.visitingUserId = userId;
      this.loadPlaylists(userId);
    }
  }
  loadPlaylists(userId) {
    this.playlistService.findPlaylistsForUserByUserId(userId)
      .then((playlists) => {
        console.log(playlists);
        this.playlists = playlists as Playlist[];
      })
      .catch((error) => {
        console.log(error);
      });
  }
  ngOnInit() {
  }

}
