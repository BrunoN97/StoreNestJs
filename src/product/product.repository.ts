import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  async listProducts() {
    return this.products;
  }

  private findById(id: string) {
    const productFind = this.products.find((product) => product.id === id);

    if (!productFind) {
      throw new Error('Produto não existe');
    }

    return productFind;
  }

  async createProduct(product: ProductEntity) {
    this.products.push(product);
    return this.products;
  }

  async deleteProduct(id: string) {
    const productdeleted = this.findById(id);
    this.products = this.products.filter((produto) => produto.id !== id);
    return productdeleted;
  }

  async updateProduct(id: string, dadaProduct: Partial<ProductEntity>) {
    const dataNotUpdateable = ['id', 'userId'];
    const product = this.findById(id);
    Object.entries(dadaProduct).forEach(([chave, valor]) => {
      if (dataNotUpdateable.includes(chave)) {
        return;
      }
      product[chave] = valor;
    });

    return product;
  }
}
