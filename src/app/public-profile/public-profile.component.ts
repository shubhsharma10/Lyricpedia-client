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
  vistingUser: User = new User();
  currentUser: User = new User();
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
          }
      })
      .catch((error) => console.log(error));
  }
  followVisitingUser() {
      this.userService.followUser(this.visitingUserId, this.vistingUser.username)
        .then((result) => {
          if (result.status === 200) {
            this.isFollowing = true;
          }
        })
        .catch((error) => console.log(error));
  }
  unfollowVisitingUser() {
    this.userService.unfollowUser(this.visitingUserId, this.vistingUser.username)
      .then((result) => {
        if (result.status === 200) {
          this.isFollowing = false;
        }
      })
      .catch((error) => console.log(error));
  }
  ngOnInit() {
  }

}
