import { Component, OnInit } from '@angular/core';
import {TrackServiceClient} from '../services/track.service.client';
import {Track} from '../models/track.model.client';

@Component({
  selector: 'app-user-translated-songs',
  templateUrl: './user-translated-songs.component.html',
  styleUrls: ['./user-translated-songs.component.css']
})
export class UserTranslatedSongsComponent implements OnInit {

  constructor(private trackService: TrackServiceClient) { }
  tracks: Track[] = [];
  ngOnInit() {
    this.trackService.findTranslatedSongsForUser()
      .then((result) => {
        this.tracks = result as Track[];
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
