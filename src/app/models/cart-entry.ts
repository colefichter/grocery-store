import { Product } from '../models';

export interface CartEntry {
  product: Product;
  quantity: number;
  lineTotal: number;
}
