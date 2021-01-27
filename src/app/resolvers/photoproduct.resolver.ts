import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { NEVER, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../products/interfaces/product';
import { ProductsService } from '../products/services/products.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoproductResolver implements Resolve<Product> {
  constructor(private productsService: ProductsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Observable<never> {

    return this.productsService.getProduct(route.params.id).pipe(map(x => {
      if (!x.mine) {
        this.router.navigate(['/products']);
      }
      return x;
    }), catchError(err => {
      this.router.navigate(['products']);
      return NEVER;
    }));
  }



}
