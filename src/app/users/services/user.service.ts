import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserResponse } from 'src/app/auth/responses/user-response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getProfile(id?: number): Observable<User> {

    return id ? this.http.get<UserResponse>(`users/${id}`).pipe(map(x => {
      return x.user;
    })) : this.http.get<UserResponse>('users/me').pipe(map(x => {
      return x.user;
    }));
  }

}
