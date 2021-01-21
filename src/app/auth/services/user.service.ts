import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/users/interfaces/user';
import { UserResponse } from '../responses/user-response';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getProfile(id?:number):Observable<User>{
    return this.http.get<UserResponse>(`users/${id}`).pipe(map(x=>{
      return x.user;
    }))
  }

}
