import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user.model.client';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-editable-profile',
  templateUrl: './editable-profile.component.html',
  styleUrls: ['./editable-profile.component.css']
})
export class EditableProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserServiceClient) {
    this.route.params.subscribe(params => this.setParams(params));
  }
  @ViewChild('profileUpdatedAlert') alertDialog;
  userId: number;
  user: User = new User();
  setParams(params) {
    if (params['userId']) {
      this.userId = params['userId'];
      this.loadUser(this.userId);
    }
  }
  loadUser(userId) {
    this.userService.findUserById(userId)
      .then((result) => {
          const user = result as User;
          if (user) {
            this.user = user;
          }
      })
      .catch((error) => console.log(error));
  }
  update() {
    this.userService
      .updateUser(this.userId, this.user)
      .then((updatedUser) => {
          this.user = updatedUser as User;
          document.getElementById('openAlertButton').click();
        })
      .catch((error) => console.log(error));
  }
  ngOnInit() {
  }

}
