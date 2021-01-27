import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserResponse } from 'src/app/auth/responses/user-response';
import { PhotoResponse } from '../interfaces/photoresponse';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getProfile(id?: number): Observable<User> {

    return id ? this.http.get<UserResponse>(`users/${id}`).pipe(map(x => {
      return x.user;
    }), catchError((resp: HttpErrorResponse) => throwError(`Error Getting User. Status: ${resp.status}. Message: ${resp.message}`)))
    : this.http.get<UserResponse>('users/me').pipe(map(x => {
      return x.user;
    }), catchError((resp: HttpErrorResponse) => throwError(`Error Gettting User. Status:
    ${resp.status}. Message: ${resp.message}`)));
  }

  updateProfile(name: string, email: string): Observable<void> {
    return this.http.put<void>('users/me', { name, email }).pipe(map(x => {
      return;
    }), catchError((resp: HttpErrorResponse) => throwError(`Error Update profile. Status: ${resp.status}. Message: ${resp.message}`)));
  }

  updateAvatar(avatar: string): Observable<string> {
    return this.http.put<PhotoResponse>('users/me/photo', { photo: avatar })
    .pipe(
      map(x => {
      return x.photo;
    }), catchError((resp: HttpErrorResponse) => throwError(`Error Update photo. Status: ${resp.status}. Message: ${resp.message}`)));
  }

  updatePassword(password: string): Observable<void> {
    return this.http.put('users/me/password', { password }).pipe(map(
      x => {
        return;
      }
    ), catchError((resp: HttpErrorResponse) => throwError(`Error Update password. Status: ${resp.status}. Message: ${resp.message}`))
    )
  }


}
