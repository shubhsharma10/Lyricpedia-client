import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {User} from '../models/user.model.client';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  userNotLoggedIn = true;
  currentUser: User = new User();
  constructor(private userService: UserServiceClient) { }
  ngOnInit() {
    this.userService
      .isUserLoggedIn()
      .then((result) => {
        if (result.status === 200) {
          this.userNotLoggedIn = false;
          return this.userService.profile();
        } else {
          this.userNotLoggedIn = true;
          throw new Error('No user logged in');
        }
      })
      .then((result) => {
        this.currentUser = result as User;
      })
      .catch(() => {
        this.userNotLoggedIn = true;
      });
  }

}
