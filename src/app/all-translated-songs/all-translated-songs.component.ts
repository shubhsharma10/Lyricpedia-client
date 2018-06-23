import { Component, OnInit } from '@angular/core';
import {TrackServiceClient} from '../services/track.service.client';
import {Track} from '../models/track.model.client';

@Component({
  selector: 'app-all-translated-songs',
  templateUrl: './all-translated-songs.component.html',
  styleUrls: ['./all-translated-songs.component.css']
})
export class AllTranslatedSongsComponent implements OnInit {

  constructor(private trackService: TrackServiceClient) { }
  tracks: Track[] = [];
  loadAllTranslatedTracks() {
    this.trackService.findAllTranslatedSongs()
      .then((result) =>
        this.tracks = result as Track[])
      .catch((error) =>
        console.log(error)
      );
  }
  ngOnInit() {
    this.loadAllTranslatedTracks();
  }

}
