import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {TrackServiceClient} from '../services/track.service.client';
import {User} from '../models/user.model.client';
import {Track} from '../models/track.model.client';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private trackService: TrackServiceClient) { }
  users: User[] = [];
  tracks: Track[] = [];
  loadAllTracks() {
    this.trackService.findAllSongs()
      .then((result) =>
        this.tracks = result as Track[])
      .catch((error) =>
        console.log(error)
      );
  }
  loadAllUsers() {
    this.userService.findAllUsers()
      .then((users) =>
        this.users = users as User[]
      )
      .catch((error) =>
      console.log(error)
      );
  }
  ngOnInit() {
    this.loadAllUsers();
    this.loadAllTracks();
  }

}
