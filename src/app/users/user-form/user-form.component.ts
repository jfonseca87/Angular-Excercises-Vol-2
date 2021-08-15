import { EventEmitter, SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() user: any;
  @Output() saveEmitter = new EventEmitter();
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createUserForm();
  }

  ngOnChanges(): void {
    debugger
    if (this.user) {
      this.createUserForm();
    }
  }

  createUserForm(): void {
    this.userForm = this.fb.group({
      userId: [this.user?.userId || null],
      firstName: [this.user?.firstName || ''],
      lastName: [this.user?.lastName || ''],
      email: [this.user?.email || '']
    });
  }

  saveUser(): void {
    debugger
    const user = this.userForm.value;
    this.saveEmitter.emit(user);
    this.userForm.reset();
  }
}
