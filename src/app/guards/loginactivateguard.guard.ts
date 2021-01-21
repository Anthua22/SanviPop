import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginactivateguardGuard implements CanActivate {

  constructor(private router: Router, private authService:AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean | UrlTree>  {
      return this.authService.isLooged().pipe(map(x=>{
        return x ? x:this.router.createUrlTree(['/auth/login']);
      }));
  }


}
