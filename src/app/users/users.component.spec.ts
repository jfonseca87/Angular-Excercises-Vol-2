import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from './users.component';
import * as MockUserData from '../../testing/mock-data-user-service';
import { of, throwError } from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userServiceSPY: jasmine.SpyObj<UserServiceService>;
  const serviceError = new Error('Something happened');

  beforeEach(async () => {
    userServiceSPY = jasmine.createSpyObj('UserServiceService', ['createUser', 'updateUser', 'getUsers', 'deleteUser']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ UsersComponent, UserListComponent, UserFormComponent ],
      providers: [
        {
          provide: UserServiceService,
          useValue: userServiceSPY
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    userServiceSPY.getUsers.and.returnValue(of(MockUserData.USERS));
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save user operation is successfull', fakeAsync(() => {
    userServiceSPY.createUser.and.returnValue(of(true));
    spyOn(window, 'alert');
    const newUser = MockUserData.USER;
    newUser.userId = 0;

    component.saveUser(newUser);

    expect(userServiceSPY.createUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('User created successfully');
  }));

  it('should save user operation fail', fakeAsync(() => {
    userServiceSPY.createUser.and.returnValue(throwError(serviceError));
    spyOn(console, 'log');
    const newUser = MockUserData.USER;
    newUser.userId = 0;

    component.saveUser(newUser);

    expect(userServiceSPY.createUser).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(serviceError);
  }));

  it('should update user operation is succefull', fakeAsync(() => {
    userServiceSPY.updateUser.and.returnValue(of(true));
    spyOn(window, 'alert');
    const existingUser = MockUserData.USER;
    existingUser.userId = 1;

    component.saveUser(existingUser);

    expect(userServiceSPY.updateUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('User updated successfully');
  }));

  it('should update user operation fail', fakeAsync(() => {
    userServiceSPY.updateUser.and.returnValue(throwError(serviceError));
    spyOn(console, 'log');
    const existingUser = MockUserData.USER;
    existingUser.userId = 1;

    component.saveUser(existingUser);

    expect(userServiceSPY.updateUser).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(serviceError);
  }));

  it('should delete user operation is successfull', fakeAsync(() => {
    userServiceSPY.deleteUser.and.returnValue(of(true));
    spyOn(window, 'alert');

    component.deleteUser(1);

    expect(userServiceSPY.deleteUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('User deleted successfully');
  }));

  it('should delete user operation fail', fakeAsync(() => {
    userServiceSPY.deleteUser.and.returnValue(throwError(serviceError));
    spyOn(console, 'log');
    const existingUser = MockUserData.USER;
    existingUser.userId = 1;

    component.deleteUser(existingUser);

    expect(userServiceSPY.deleteUser).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(serviceError);
  }));
});
