import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {User} from '../models/user.model.client';
import {DataService} from '../services/data.sevice';

@Component({
  selector: 'app-user-searchpage',
  templateUrl: './user-searchpage.component.html',
  styleUrls: ['./user-searchpage.component.css']
})
export class UserSearchpageComponent implements OnInit, OnDestroy {

  constructor(private userService: UserServiceClient,
              private dataService: DataService) { }
  queryString = '';
  users: User[] = [];
  handleEnter() {
    this.searchForUsers();
  }
  searchForUsers() {
      this.userService
        .searchUsersByQuery(this.queryString)
        .then((result) => {
          this.users = result as User[];
        });
  }
  ngOnInit() {
    if (this.dataService.queryString) {
      this.queryString = this.dataService.queryString;
      this.handleEnter();
    } else {
      this.queryString = '';
    }
  }
  ngOnDestroy() {
    this.dataService.queryString = this.queryString;
  }

}
