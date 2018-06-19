import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserInput} from '../models/user.input';
import {DataService} from '../services/data.sevice';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  userInput: UserInput = {
    input: ''
  };
  constructor(private router: Router,
              public dataService: DataService) { }
  handleKeyUp() {
    this.router.navigate(['result']);
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.dataService.userInput = this.userInput;
  }

}
