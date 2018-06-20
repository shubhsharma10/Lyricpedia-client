import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {User} from '../models/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserServiceClient) { }
  user: User = new User();
  userNotLoggedIn = false;
  userCode = 0; // 0 for Anonymous user, 1 for Free user, 2 for Premium user, 3 for Admin
  update(user: User) {
    console.log(user);
    this.userService
      .updateProfile(user)
      .then(function(result) {
        console.log(result);
      });
  }
  logout() {
    this.userService
      .logout()
      .then(() => this.router.navigate(['login']));
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
        this.user = result as User;
        if (this.user.userType === 'User') {
          this.userCode = 1;
        } else if (this.user.userType === 'Premium') {
          this.userCode = 2;
        } else if (this.user.userType === 'Admin') {
          this.userCode = 3;
        }

      })
      .catch(() => {
        this.userNotLoggedIn = true;
      });
  }
}
