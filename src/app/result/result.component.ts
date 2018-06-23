import {Component, OnDestroy, OnInit} from '@angular/core';
import {MusixMatchAPIServiceClient} from '../services/musixmatch.service.client';
import {UserInput} from '../models/user.input';
import {DataService} from '../services/data.sevice';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {
  userInput: UserInput = {
    input: ''
  };
  tracks = [];
  pageCount = 1;
  constructor(private musicService: MusixMatchAPIServiceClient,
              private dataService: DataService) {
  }
  searchForTracks(word) {
    this.musicService
      .searchTracks(word, this.pageCount)
      .then((result) => {
        if (this.pageCount === 1) {
          const freshItems = (result as any).message.body.track_list.map(x => x.track);
          this.tracks = freshItems;
        } else {
          const currentItems = this.tracks;
          const newItems = (result as any).message.body.track_list.map(x => x.track);
          for (let i = 0; i < newItems.length ; i++) {
            currentItems.push(newItems[i]);
          }
          this.tracks = currentItems;
        }
        this.pageCount += 1;
    });
  }
  handleEnter() {
    this.pageCount = 1;
    this.searchForTracks(this.userInput.input);
  }
  onScroll() {
    if (this.userInput.input) {
      this.searchForTracks(this.userInput.input);
    }
  }
  ngOnInit() {
    if (this.dataService.userInput) {
      this.userInput = this.dataService.userInput;
      this.handleEnter();
    } else {
      this.userInput = new UserInput();
    }
  }

  ngOnDestroy() {
    this.dataService.userInput = this.userInput;
  }
}
