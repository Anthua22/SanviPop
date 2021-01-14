import { Category } from './category';



interface ProductBase {
    id?: number;
    title: string;
    description: string;
    price: number;
    mainPhoto: string;
}

export interface Product extends ProductBase {
  category: Category;
}

export interface ProductAdd extends ProductBase {
  category: number;
}
