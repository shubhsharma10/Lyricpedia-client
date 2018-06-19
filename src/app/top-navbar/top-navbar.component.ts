import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';
import {User} from '../models/user.model.client';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private router: Router) { }
  user: User = new User();
  isUserLoggedIn = false;
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
