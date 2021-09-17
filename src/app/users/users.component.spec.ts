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
  let userServiceSpy = {} as any;
  const serviceError = new Error('Something happened');
  const userServiceStub = {
    getUsers: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [UsersComponent, UserListComponent, UserFormComponent],
      providers: [
        {
          provide: UserServiceService,
          useValue: userServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    userServiceSpy = TestBed.inject(UserServiceService);
    userServiceSpy.getUsers.mockReturnValue(of(MockUserData.USERS));
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save user operation is successfull', fakeAsync(() => {
    userServiceSpy.createUser.mockReturnValueOnce(of(true));
    window.alert = jest.fn();
    const newUser = MockUserData.USER;
    newUser.userId = 0;

    component.saveUser(newUser);

    expect(userServiceSpy.createUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('User created successfully');
  }));

  it('should save user operation fail', fakeAsync(() => {
    userServiceSpy.createUser.mockReturnValueOnce(throwError(serviceError));
    jest.spyOn(console, 'log');
    const newUser = MockUserData.USER;
    newUser.userId = 0;

    component.saveUser(newUser);

    expect(userServiceSpy.createUser).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(serviceError);
  }));

  it('should update user operation is succefull', fakeAsync(() => {
    userServiceSpy.updateUser.mockReturnValueOnce(of(true));
    window.alert = jest.fn();
    const existingUser = MockUserData.USER;
    existingUser.userId = 1;

    component.saveUser(existingUser);

    expect(userServiceSpy.updateUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('User updated successfully');
  }));

  it('should update user operation fail', fakeAsync(() => {
    userServiceSpy.updateUser.mockReturnValueOnce(throwError(serviceError));
    jest.spyOn(console, 'log');
    const existingUser = MockUserData.USER;
    existingUser.userId = 1;

    component.saveUser(existingUser);

    expect(userServiceSpy.updateUser).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(serviceError);
  }));

  it('should delete user operation is successfull', fakeAsync(() => {
    userServiceSpy.deleteUser.mockReturnValueOnce(of(true));
    window.alert = jest.fn();

    component.deleteUser(1);

    expect(userServiceSpy.deleteUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('User deleted successfully');
  }));

  it('should delete user operation fail', fakeAsync(() => {
    userServiceSpy.deleteUser.mockReturnValueOnce(throwError(serviceError));
    jest.spyOn(console, 'log');
    const existingUser = MockUserData.USER;
    existingUser.userId = 1;

    component.deleteUser(existingUser);

    expect(userServiceSpy.deleteUser).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(serviceError);
  }));
});
