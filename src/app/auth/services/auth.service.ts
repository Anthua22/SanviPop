import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/users/interfaces/user';
import { TokenResponse, EmailResponse } from '../responses/user-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logged: boolean = false;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<string> {
    return this.http
      .post<EmailResponse>('auth/register', user)
      .pipe(map((resp) => resp.email));
  }

  login(user: User): Observable<void> {
    return this.http
      .post<TokenResponse>('auth/login', user)
      .pipe(map((x) => {
        localStorage.setItem('token', x.accessToken);
        this.logged = true;
      }));
  }

  isLooged(): Observable<boolean> {
    let token: string | null = localStorage.getItem('token');
    if (token) {
      return this.http.get('auth/validate').pipe(
        map((x) => {
          this.logged = true;
          return true;
        }),

        catchError((err, caught) => {
          this.logged = false;
          return of(false);
        }))


    } else {
      return of(false);
    }
  }

  loginGoogle(token: string) {
    return this.http
      .post<TokenResponse>('auth/google', { token: token })
      .pipe(map((x) => {
        localStorage.setItem('token', x.accessToken);
        this.logged = true;
      }));
  }


  loginFacebook(token: string): Observable<string> {
    console.log(token);
    return this.http
      .post<TokenResponse>('auth/facebook', { token: token })
      .pipe(map((x) => {
        this.logged = true;
        localStorage.setItem('token', x.accessToken);
        return x.accessToken;
      }));
  }

}
