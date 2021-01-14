import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../interfaces/category';
import { CategoriesResponse } from '../interfaces/responses/categories-response';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<CategoriesResponse>('categories').pipe(
      map(resp => resp.categories)
    );
  }
}
