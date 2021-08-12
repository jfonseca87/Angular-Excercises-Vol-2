import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: any;
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm(): void {
    this.userForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: ['']
    });
  }

  saveUser(): void {

  }
}
