import { Component } from '@angular/core';
import { User, UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-user-form-tab',
  templateUrl: './user-form-tab.component.html',
  styleUrls: ['./user-form-tab.component.css'],
})
export class UserFormTabComponent {
  users$ = this.userStore.users$;

  constructor(private userStore: UserStoreService) {}

  userLabel(user: User) {
    return `${user.form.controls?.firstName.value} ${
      user.form.controls?.lastName.value
    }`;
  }

  remove(user: User): void {
    this.userStore.remove(user);
  }

  select(user: User): void {
    this.userStore.select(user);
  }
}
