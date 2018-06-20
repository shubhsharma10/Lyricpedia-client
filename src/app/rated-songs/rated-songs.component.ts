import { Component, OnInit } from '@angular/core';
import {Track} from '../models/track.model.client';
import {TrackServiceClient} from '../services/track.service.client';

@Component({
  selector: 'app-rated-songs',
  templateUrl: './rated-songs.component.html',
  styleUrls: ['./rated-songs.component.css']
})
export class RatedSongsComponent implements OnInit {

  constructor(private trackService: TrackServiceClient) { }
  tracks: Track[] = [];
  ngOnInit() {
    this.trackService.findRatedSongsForUser()
      .then((result) => {
        this.tracks = result as Track[];
      })
      .catch((error) => {
      console.log(error);
      });
  }

}
