import {Pipe, PipeTransform} from '@angular/core';
import {Product} from "../models/product";

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: Product[], searchTerm: string): Product[] {
    if (!products || !searchTerm) {
      return products;
    }
    // is comparing each product with the variable searchTerm
    // to check if it match with searchTerm content
    return products.filter(product =>
      product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      || product.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
