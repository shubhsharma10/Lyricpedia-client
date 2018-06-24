import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {User} from '../models/user.model.client';
import {Playlist} from '../models/playlist.model.client';
import {PlaylistServiceClient} from '../services/playlist.service.client';
import {Track} from '../models/track.model.client';
import {TrackServiceClient} from '../services/track.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserServiceClient,
              private playlistService: PlaylistServiceClient,
              private trackService: TrackServiceClient) { }
  user: User = new User();
  userNotLoggedIn = false;
  playlists: Playlist[] = [];
  selectedPlaylist: Playlist = new Playlist();
  userCode = 0; // 0 for Anonymous user, 1 for Free user, 2 for Premium user, 3 for Admin
  tracks: Track[] = [];
  trTracks: Track[] = [];
  update(user: User) {
    console.log(user);
    this.userService
      .updateProfile(user)
      .then(function(result) {
        console.log(result);
        document.getElementById('openAlertButton').click();
      });
  }
  logout() {
    this.userService
      .logout()
      .then(() => this.router.navigate(['login']));
  }
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
  loadPlaylists() {
    this.playlistService.findAllPlaylists()
      .then((playlists) => {
        console.log(playlists);
        this.playlists = playlists as Playlist[];
      })
      .catch((error) => {
        console.log(error);
      });
  }
  loadAllTracks() {
    this.trackService.findAllSongs()
      .then((result) => {
        this.tracks = result as Track[];
        this.loadPlaylists();
        this.loadAllTranslatedTracks();
      })
      .catch((error) =>
        console.log(error)
      );
  }
  loadAllTranslatedTracks() {
    this.trackService.findAllTranslatedSongs()
      .then((result) => {
        const newTracks = result as Track[];
        this.trTracks.length = 0;
        for (let i = 0; i < newTracks.length; i++) {
          this.trTracks.push(newTracks[i]);
        }
        console.log(this.trTracks);
      })
      .catch((error) =>
        console.log(error)
      );
  }
  deleteSong(trackId) {
    this.trackService
      .deleteSong(trackId)
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
          return this.loadAllTracks();
        }
      })
      .catch((error) => console.log(error));
  }
  ngOnInit() {
    this.userService
      .isUserLoggedIn()
      .then((result) => {
        if (result.status === 200) {
          this.userNotLoggedIn = false;
          return this.userService.profile();
        } else {
          this.userNotLoggedIn = true;
          throw new Error('No user logged in');
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
        this.loadAllTracks();
        this.loadPlaylists();
        this.loadAllTranslatedTracks();
      })
      .catch(() => {
        this.userNotLoggedIn = true;
      });
  }
}
