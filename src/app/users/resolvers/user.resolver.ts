import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { NEVER, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

  constructor(private userService:UserService, private router:Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<never>{
    return route.params.id ? this.userService.getProfile(route.params.id).pipe(
      catchError(err=>{
        this.router.navigate(['/products']);
        return NEVER;
      })
    ):this.userService.getProfile();
  }
}
