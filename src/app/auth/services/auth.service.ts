import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/users/interfaces/user';
import { ResponseError } from '../interfaces/responses';
import { TokenResponse, EmailResponse } from '../responses/user-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logged: boolean = false;
  logingChange$ = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  register(user: User): Observable<string> {
    return this.http
      .post<EmailResponse>('auth/register', user).pipe(
        map(resp => resp.email),
        catchError((resp: HttpErrorResponse) => throwError(`Error register
        Status: ${resp.status}. Message: ${resp.error.message}`)));

  }

  login(user: User): Observable<void> {
    return this.http
      .post<TokenResponse>('auth/login', user)
      .pipe(map((x) => {
        localStorage.setItem('token', x.accessToken);
        this.logged = true;
        this.logingChange$.next(true);
      }), catchError((resp: HttpErrorResponse) => throwError(`Error login
      Status: ${resp.status}. Message: ${resp.error.error}`)));
  }

  isLooged(): Observable<boolean> {
    if (this.logged) {
      this.logingChange$.next(true);
      return of(true);
    }

    let token: string | null = localStorage.getItem('token');
    if (token) {
      return this.http.get('auth/validate').pipe(
        map((x) => {
          this.logingChange$.next(true);
          this.logged = true;
          return true;
        }),
        catchError((err, caught) => {
          this.logged = false;
          this.logingChange$.next(false);
          localStorage.removeItem('token');
          return of(false);
        }))


    } else {
      this.logingChange$.next(false);
      return of(false);
    }
  }

  loginGoogle(token: string): Observable<void> {
    return this.http
      .post<TokenResponse>('auth/google', { token: token })
      .pipe(map((x) => {
        localStorage.setItem('token', x.accessToken);
        this.logingChange$.next(false);
        this.logged = true;
      }));
  }

  loginFacebook(token: string): Observable<string> {
    console.log(token);
    return this.http
      .post<TokenResponse>('auth/facebook', { token: token })
      .pipe(map((x) => {
        this.logged = true;
        this.logingChange$.next(true);
        localStorage.setItem('token', x.accessToken);
        return x.accessToken;
      }));
  }

  logout(): void {
    this.logingChange$.next(false);
    localStorage.removeItem('token');
    this.logged = false;
  }

}
