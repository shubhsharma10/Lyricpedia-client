import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {User} from '../models/user.model.client';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserServiceClient) { }
  users: User[] = [];
  isCurrentUserAdmin = false;
  currentUser: User = new User();
  loadAllUsers() {
    this.userService
      .findAllUsers()
      .then((users) => {
        if (!this.isCurrentUserAdmin) {
          this.users = (users as User[]).filter(x => (x.userType !== 'Admin' && x._id !== this.currentUser._id));
        } else {
          this.users = (users as User[]).filter(x => x._id !== this.currentUser._id);
        }
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
        if (this.currentUser.userType === 'Admin') {
          this.isCurrentUserAdmin = true;
        }
        this.loadAllUsers();
      })
      .catch(() => {
        this.isCurrentUserAdmin = false;
      });
  }

}
