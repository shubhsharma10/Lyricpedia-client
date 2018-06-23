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
  followers: User[] = [];
  constructor(private userService: UserServiceClient) { }
  loadAllFollowers(listOfUserIds) {
    console.log('will load followers now');
    this.userService
      .findAllUsersByIds(listOfUserIds)
      .then((result) => {
        console.log(result);
        this.followers = result as User[];
      })
      .catch((error) => console.log(error));
  }
  getUsername(userId) {
    const userEntryIndex = this.followers
                            .map(function (x) { return x._id; })
                            .indexOf(userId);
    if (userEntryIndex > -1) {
      return this.followers[userEntryIndex].username;
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
        this.loadAllFollowers(this.currentUser.followers.map( x => x.userId));
      })
      .catch(() => {
        this.userNotLoggedIn = true;
      });
  }

}
