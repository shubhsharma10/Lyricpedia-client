import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {TrackServiceClient} from '../services/track.service.client';
import {User} from '../models/user.model.client';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private userService: UserServiceClient) { }
  users: User[] = [];
  currentUser: User = new User();
  username: string;
  password: string;
  password2: string;
  selectedUserType = 'User';
  isUsernameInUse = false;
  isPasswordNotSame = false;
  isValidUserNamePassword = true;
  resetInputFields() {
    this.username = '';
    this.password2 = '';
    this.password = '';
    this.selectedUserType = 'User';
  }
  register(username, password, password2, selectedUserType) {
    if (!username || !password || !password2) {
      this.isValidUserNamePassword = false;
      return;
    } else {
      this.isValidUserNamePassword = true;
    }
    if (password !== password2) {
      this.isPasswordNotSame = true;
    } else {
      this.isPasswordNotSame = false;
      this.userService
        .addUser(username, password, selectedUserType)
        .then((result) => {
          if (result.status === 422) {
            this.isUsernameInUse = true;
            throw new Error('username already in use');
          } else {
            this.isUsernameInUse = false;
            this.loadAllUsers();
            this.resetInputFields();
          }
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  deleteUser(userId) {
    this.userService
      .deleteUser(userId)
      .then((result) => {
      console.log(result);
      this.loadAllUsers();
      })
      .catch((error) => console.log(error));
  }
  loadAllUsers() {
    this.userService
      .findAllUsers()
      .then((users) => {
          this.users = (users as User[]).filter(x => x._id !== this.currentUser._id);
      })
      .catch((error) => console.log('Error while loading all users'));
  }
  ngOnInit() {
    this.userService
      .isUserLoggedIn()
      .then((result) => {
        if (result.status === 200) {
          return this.userService.profile();
        } else {
          throw new Error('No user logged in');
        }
      })
      .then((result) => {
        this.currentUser = result as User;
        this.loadAllUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
