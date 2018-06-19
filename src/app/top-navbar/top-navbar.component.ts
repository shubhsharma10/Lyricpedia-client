import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';
import {User} from '../models/user.model.client';
import {DataService} from '../services/data.sevice';
import {UserInput} from '../models/user.input';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private dataService: DataService,
              private router: Router) {
    if (this.router.url.includes('result')) {
      this.isResultPage = true;
    }
  }
  userInput: UserInput = {
    input: ''
  };
  user: User = new User();
  isUserLoggedIn = false;
  isResultPage = false;
  @Output() messageEvent = new EventEmitter<string>();
  handleEnter() {
    this.messageEvent.emit(this.userInput.input);
  }
  pollServer() {
    setTimeout(() => {
      this.userService
        .isUserLoggedIn()
        .then((result) => {
          if (result.status !== 200) {
            this.router.navigate(['home']);
            return;
          } else {
            this.pollServer();
          }
        });
    }, 1805000);
  }
  ngOnInit() {
    if (this.dataService.userInput) {
      this.userInput = this.dataService.userInput;
      this.handleEnter();
    } else {
      this.userInput = new UserInput();
    }
    this.userService
      .isUserLoggedIn()
      .then((result) => {
        if (result.status === 200) {
          this.isUserLoggedIn = true;
          return this.userService.profile();
        } else {
          this.isUserLoggedIn = false;
          throw new Error('No user logged in');
        }
      })
      .then((result) => {
        //this.pollServer();
        this.user = result as User;
      })
      .catch(() => {
        console.log('No user logged in');
      });
  }
}
