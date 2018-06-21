import {Component, OnInit} from '@angular/core';
import {MusixMatchAPIServiceClient} from '../services/musixmatch.service.client';
import {UserInput} from '../models/user.input';
import {DataService} from '../services/data.sevice';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  userInput: UserInput = {
    input: ''
  };
  tracks = [];
  constructor(private musicService: MusixMatchAPIServiceClient,
              private dataService: DataService) {
  }
  searchForTracks(word) {
    this.musicService
      .searchTracks(word, 1)
      .then((result) => {
        const tracks = (result as any).message.body.track_list;
        this.tracks = tracks.map(x => x.track);
      });
  }
  handleEnter() {
    this.searchForTracks(this.userInput.input);
  }
  ngOnInit() {
    if (this.dataService.userInput) {
      this.userInput = this.dataService.userInput;
      this.handleEnter();
    } else {
      this.userInput = new UserInput();
    }
  }
}
