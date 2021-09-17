import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { UserServiceService } from '../../services/user-service.service';
import { UserListComponent } from './user-list.component';
import * as MockUserData from '../../../testing/mock-data-user-service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceSpy: any = {};
  const userServiceMock = {
    getUsers: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserListComponent],
      providers: [
        {
          provide: UserServiceService,
          useValue: userServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    userServiceSpy = TestBed.inject(UserServiceService);
    userServiceSpy.getUsers.mockReturnValue(of(MockUserData.USERS));
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // When you use asychronous operations you should use fakeasync wrapper
  it('should get user from user service', fakeAsync(() => {
    userServiceSpy.getUsers.mockReturnValueOnce(of(MockUserData.USERS));

    component.getUsers();

    // Simulate a asynchronus operation
    tick();
    fixture.detectChanges();

    // Access to html to validate how component draw
    const tbody = fixture.nativeElement.querySelector('tbody');
    expect(tbody.rows.length).toEqual(3);
    expect(component.users).toEqual(MockUserData.USERS);
    expect(userServiceSpy.getUsers).toHaveBeenCalled();
  }));

  it('should emit to update user', () => {
    jest.spyOn(component.updateEmitter, 'emit');
    component.updateUser(MockUserData.USER);
    expect(component.updateEmitter.emit).toHaveBeenCalledWith(MockUserData.USER);
  });

  it('should call confirm and cancel delete user operation', () => {
    jest.spyOn(component.deleteEmitter, 'emit');
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    component.deleteUser(1);
    expect(window.confirm).toHaveBeenCalledWith('Are you sure to delete this record');
    expect(component.deleteEmitter.emit).toHaveBeenCalledTimes(0);
  });

  it('should call confirm and emit userid to will be deleted', () => {
    jest.spyOn(component.deleteEmitter, 'emit');
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    component.deleteUser(1);
    expect(window.confirm).toHaveBeenCalledWith('Are you sure to delete this record');
    expect(component.deleteEmitter.emit).toHaveBeenCalledWith(1);
  });
});
