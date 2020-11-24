import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts(): Product[] {
    return [
      {
        id: 1,
        title: 'Rubber chicken',
        description: 'I don\'t know what to do with this...',
        category: 1,
        price: 23.95,
        mainPhoto: 'assets/chicken.jpg'
      },
      {
        id: 1,
        title: 'Handy hand',
        description: 'Are you sick of amputating your own fingers?',
        category: 2,
        price: 90.50,
        mainPhoto: 'assets/hand.jpg'
      },
      {
        id: 1,
        title: 'Jurassic costume',
        description: 'I\'m feeling obsolete.\n I prefer extinction...',
        category: 3,
        price: 150,
        mainPhoto: 'assets/dinosaur.jpg'
      }
    ];
  }
}
