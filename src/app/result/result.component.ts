import {Component, OnInit} from '@angular/core';
import {MusixMatchAPIServiceClient} from '../services/musixmatch.service.client';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  tracks = [];
  constructor(private musicService: MusixMatchAPIServiceClient) {
  }
  searchForTracks(word) {
    this.musicService
      .searchTracks(word, 1)
      .then((result) => {
        const tracks = (result as any).message.body.track_list;
        this.tracks = tracks.map(x => x.track);
      });
  }
  receiveMessage($event) {
    const userInput = $event;
    if (userInput) {
      this.searchForTracks(userInput);
    }
  }
  ngOnInit() {}
}
