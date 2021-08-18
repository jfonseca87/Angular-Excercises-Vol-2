import { Component, OnInit, ViewChild } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(UserListComponent) listComponent!: UserListComponent;
  showForm = false;
  user: any;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }

  saveUser(user: any): void {
    user.userId = user.userId === null ? 0 : user.userId;
    if (user.userId && user.userId > 0) {
      this.userService.updateUser(user).subscribe(
        res => {
          this.updateUserList();
          alert('User updated successfully');
        },
        error => console.log(error)
      );
    } else {
      this.userService.createUser(user).subscribe(
        res => {
          this.updateUserList();
          alert('User create successfully');
        },
        error => console.log(error)
      );
    }
  }

  updateUser(user: any): void {
    this.user = [];
    this.user = user;
  }

  deleteUser(userId: any): void {
    this.userService.deleteUser(userId).subscribe(
      res => {
        this.updateUserList();
        alert('User deleted successfully');
      },
      error => console.log(error)
    );
  }

  updateUserList(): void {
    this.listComponent.getUsers();
  }
}
