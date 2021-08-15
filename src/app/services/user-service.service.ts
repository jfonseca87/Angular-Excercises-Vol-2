import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private readonly userUrl = 'http://localhost:5000/api/user';


  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
   return this.http.get<any>(this.userUrl);
  }

  getUser(userId: number): Observable<any> {
    return this.http.get<any>(this.userUrl + '/' + userId);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.userUrl, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(this.userUrl, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(this.userUrl + '/' + userId);
  }
}
