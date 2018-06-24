import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {User} from '../models/user.model.client';
import {errorObject} from 'rxjs/internal/util/errorObject';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userService: UserServiceClient) {
    this.route.params.subscribe(params => this.setParams(params));
  }
  userNotLoggedIn = false;
  visitingUserId: number;
  isFollowing = false;
  isCurrentUserTarget = false;
  vistingUser: User = new User();
  currentUser: User = new User();
  followers: User[] = [];
  following: User[] = [];
  setParams(params) {
    this.visitingUserId = params['userId'];
    this.loadCurrentUser();
    this.loadVistingUser();
  }
  loadCurrentUser() {
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
        console.log(this.currentUser);
        if (this.currentUser) {
          const currFollowingUser = this.currentUser.following;
          if (this.visitingUserId.toString() === this.currentUser._id) {
            this.isCurrentUserTarget = true;
          } else {
            this.isCurrentUserTarget = false;
          }
          for (let i = 0; i < currFollowingUser.length; i++) {
            if (currFollowingUser[i].userId === this.visitingUserId) {
              this.isFollowing = true;
            }
          }
        } else {
          throw new Error('User profile access failed');
        }

      })
      .catch(() => {
        this.userNotLoggedIn = true;
      });
  }
  loadVistingUser() {
    this.userService.findUserById(this.visitingUserId)
      .then((user) => {
          if (user) {
            console.log(user);
            this.vistingUser = user as User;
            this.loadAllFollowers(this.vistingUser.followers.map( x => x.userId));
            this.loadAllFollowing(this.vistingUser.following.map( x => x.userId));
          }
      })
      .catch((error) => console.log(error));
  }
  followVisitingUser() {
      this.userService.followUser(this.visitingUserId)
        .then((result) => {
          if (result.status === 200) {
            this.isFollowing = true;
            this.loadVistingUser();
          }
        })
        .catch((error) => console.log(error));
  }
  unfollowVisitingUser() {
    this.userService.unfollowUser(this.visitingUserId)
      .then((result) => {
        if (result.status === 200) {
          this.isFollowing = false;
          this.loadVistingUser();
        }
      })
      .catch((error) => console.log(error));
  }
  loadAllFollowers(listOfUserIds) {
    console.log('will load followers now');
    this.userService
      .findAllUsersByIds(listOfUserIds)
      .then((result) => {
        this.followers = result as User[];
      })
      .catch((error) => console.log(error));
  }
  getFollowerUsername(userId) {
    const userEntryIndex = this.followers
      .map(function (x) { return x._id; })
      .indexOf(userId);
    if (userEntryIndex > -1) {
      return this.followers[userEntryIndex].username;
    } else {
      return '';
    }
  }
  loadAllFollowing(listOfUserIds) {
    console.log('will load following users now');
    this.userService
      .findAllUsersByIds(listOfUserIds)
      .then((result) => {
        this.following = result as User[];
      })
      .catch((error) => console.log(error));
  }
  getFollowingUsername(userId) {
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
  }

}
