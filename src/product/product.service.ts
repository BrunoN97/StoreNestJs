import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDTO } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async listProducts() {
    const productSaved = await this.productRepository.find();
    return productSaved;
  }

  async createProduct(productEntity: ProductEntity) {
    await this.productRepository.save(productEntity);
  }

  async updateProduct(id: string, productEntity: UpdateProductDTO) {
    await this.productRepository.update(id, productEntity);
  }

  async deleteProduct(id: string) {
    await this.productRepository.delete(id);
  }
}
