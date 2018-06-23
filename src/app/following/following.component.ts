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
  following: User[] = [];
  constructor(private userService: UserServiceClient) { }
  loadAllFollowing(listOfUserIds) {
    console.log('will load following users now');
    this.userService
      .findAllUsersByIds(listOfUserIds)
      .then((result) => {
        console.log(result);
        this.following = result as User[];
      })
      .catch((error) => console.log(error));
  }
  getUsername(userId) {
    const userEntryIndex = this.following
      .map(function (x) { return x._id; })
      .indexOf(userId);
    if (userEntryIndex > -1) {
      return this.following[userEntryIndex].username;
    } else {
      return '';
    }
  }
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
        this.loadAllFollowing(this.currentUser.following.map( x => x.userId));
      })
      .catch(() => {
        this.userNotLoggedIn = true;
      });
  }

}
