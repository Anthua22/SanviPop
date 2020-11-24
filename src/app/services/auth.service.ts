import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TokenResponse } from '../interfaces/responses/token-response';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged = false;
  loginChange$ = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  private setLogged(logged: boolean): void {
    this.logged = logged;
    this.loginChange$.emit(logged);
  }

  login(email: string, password: string): Observable<void> {
    return this.http.post<TokenResponse>('auth/login', {email, password}).pipe(
      map(resp => {
        localStorage.setItem('token', resp.accessToken)
        this.setLogged(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.setLogged(false);
  }

  isLogged(): Observable<boolean> {
    if (this.logged) { return of(true); }
    if (!this.logged && !localStorage.getItem('token')) { return of(false); }
    return this.http.get('auth/validate').pipe(
      map(resp => {
        this.setLogged(true);
        return true;
      }),
      catchError(error => {
        localStorage.removeItem('token');
        return of(false);
      })
    );
  }
}
