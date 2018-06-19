import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserServiceClient) { }
  username: string;
  password: string;
  password2: string;
  selectedUserType = 'User';
  isUsernameInUse = false;
  isPasswordNotSame = false;
  isValidUserNamePassword = true;
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
        .createUser(username, password, selectedUserType)
        .then((result) => {
          if (result.status === 422) {
            this.isUsernameInUse = true;
            throw new Error('username already in use');
          } else {
            this.isUsernameInUse = false;
            return this.router.navigate(['profile']);
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

  ngOnInit() {
  }

}
