import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model.client';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  currentUser: User = new User();
  userNotLoggedIn = true;
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
