import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/users/interfaces/user';
import { TokenResponse, UserResponse } from '../responses/user-response';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(user:User): Observable<string>{
    return this.http.post<UserResponse>('auth/register',user).pipe(map(resp=>resp.email));
  }

  login(user:User):Observable<string>{
    return this.http.post<TokenResponse>('auth/login',user).pipe(map(x=>x.accessToken));
  }
}
