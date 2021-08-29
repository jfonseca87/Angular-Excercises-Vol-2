import { Component, ViewChild } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  @ViewChild(UserListComponent) listComponent!: UserListComponent;
  user: any;

  constructor(private userService: UserServiceService) { }

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
          alert('User created successfully');
        },
        error => console.log(error)
      );
    }
  }

  updateUserEvent(user: any): void {
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
