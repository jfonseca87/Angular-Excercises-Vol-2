import { Component } from '@angular/core';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private userStore: UserStoreService) { }

  save() {
    this.userStore.save();
  }
}
