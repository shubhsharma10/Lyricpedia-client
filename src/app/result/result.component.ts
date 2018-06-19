import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../services/data.sevice';
import {UserInput} from '../models/user.input';
import {MusixMatchAPIServiceClient} from '../services/musixmatch.service.client';
import {TrackModel} from '../models/track.model.client';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {
  userInput: UserInput = {
    input: 'badshah'
  };
  tracks = [];
  cols = [];
  constructor(public dataService: DataService,
              private musicService: MusixMatchAPIServiceClient) {
  }
  searchForTracks(word) {
    console.log('will search');
    this.musicService
      .searchTracks(word, 1)
      .then((result) => {
        const tracks = (result as any).message.body.track_list;
        const resultTracks = tracks.map(x => x.track);
        this.tracks = resultTracks;
        this.cols = [
          {prop: 'track_name', name: 'Title'},
          {prop: 'artist_name', name: 'Artist'},
          {prop: 'album_name', name: 'Album'}];
        console.log(this.tracks);
      });
  }
  handleKeyUp() {
    this.searchForTracks(this.userInput.input);
  }
  ngOnInit() {
    if (this.dataService.userInput) {
      this.userInput = this.dataService.userInput;
      console.log(this.userInput.input);
      this.searchForTracks(this.userInput.input);
    }
    else {
      this.userInput = new UserInput();
    }
    this.searchForTracks('badshah');
  }
  ngOnDestroy() {}

}