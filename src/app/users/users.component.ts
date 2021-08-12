import { Component, OnInit, ViewChild } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(UserListComponent) listComponent!: UserListComponent;
  showForm = false;

  constructor() { }

  ngOnInit(): void {
  }

}
