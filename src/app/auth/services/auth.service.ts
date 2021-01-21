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

  constructor(private http: HttpClient) {}

  register(user: User): Observable<string> {
    return this.http
      .post<EmailResponse>('auth/register', user)
      .pipe(map((resp) => resp.email));
  }

  login(user: User): Observable<string> {
    return this.http
      .post<TokenResponse>('auth/login', user)
      .pipe(map((x) => x.accessToken));
  }

  isLooged(): Observable<boolean> {
    let token: string | null = localStorage.getItem('token');
    if (token) {
      this.http.get('auth/register').pipe(
        map((x) => {
          this.logged = true;
          return false;
        })
      ),
        catchError((err, caught) => {
          this.logged = false;
          return of(false);
        });

      return of(true);
    } else {
      return of(false);
    }
  }
}
