import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Output() updateEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();
  users: any = [];

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      res => this.users = res,
      error => console.log(error)
    );
  }

  updateUser(user: any): void {
    debugger
    this.updateEmitter.emit(user);
  }

  deleteUser(userId: number): void {
    debugger
    if (confirm('Are you sure to delete this record')) {
      this.deleteEmitter.emit(userId);
    }
  }
}
