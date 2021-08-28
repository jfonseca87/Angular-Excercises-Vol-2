import { TestBed } from '@angular/core/testing';
import { UserServiceService } from './user-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as MockUserData from '../../testing/mock-data-user-service';

describe('UserServiceService', () => {
  let service: UserServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserServiceService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of users', () => {
    service.getUsers().subscribe(
      res => {
        expect(res).toEqual(MockUserData.USERS);
      }
    );

    const req = httpTestingController.expectOne(MockUserData.URL_API);
    expect(req.request.method).toEqual('GET');
    req.flush(MockUserData.USERS);
  });

  it('should get a user', () => {
    service.getUser(1).subscribe(
      res => {
        expect(res).toEqual(MockUserData.USER);
      }
    );

    const req = httpTestingController.expectOne(`${MockUserData.URL_API}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(MockUserData.USER);
  });

  it('should create a user', () => {
    service.createUser(MockUserData.USER).subscribe(
      res => {
        expect(res).toEqual(true);
      }
    );

    const req = httpTestingController.expectOne(`${MockUserData.URL_API}`);
    expect(req.request.method).toEqual('POST');
    req.flush(true);
  });

  it('should update a user', () => {
    service.updateUser(MockUserData.USER).subscribe(
      res => {
        expect(res).toEqual(true);
      }
    );

    const req = httpTestingController.expectOne(`${MockUserData.URL_API}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(true);
  });

  it('should delete a user', () => {
    service.deleteUser(1).subscribe(
      res => {
        expect(res).toEqual(true);
      }
    );

    const req = httpTestingController.expectOne(`${MockUserData.URL_API}/1`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(true);
  });
});
