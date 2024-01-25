import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  async listProducts() {
    return this.products;
  }

  async createProduct(product: ProductEntity) {
    this.products.push(product);
    return this.products;
  }
}
