import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { NEVER, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../users/interfaces/user';
import { UserService } from '../users/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

  constructor(private userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<never> {
    return route.params.id?this.userService.getProfile(route.params.id).pipe(
      catchError(() => {
        this.router.navigate(['/products']);
        return this.userService.getProfile();
      })
    ):this.userService.getProfile();

  }


}
