import { Component, OnInit } from '@angular/core';
import {TrackServiceClient} from '../services/track.service.client';
import {Track} from '../models/track.model.client';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css']
})
export class AllSongsComponent implements OnInit {

  constructor(private trackService: TrackServiceClient) { }
  tracks: Track[] = [];
  loadAllTracks() {
    this.trackService.findAllSongs()
      .then((result) =>
        this.tracks = result as Track[])
      .catch((error) =>
        console.log(error)
      );
  }

  ngOnInit() {
    this.loadAllTracks();
  }

}
