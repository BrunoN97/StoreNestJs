import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/createProduct.dto';
import { v4 as uuid } from 'uuid';
import { ProductEntity } from './product.entity';
import { ListProductDTO } from './dto/listProduct.dto';

@Controller('/product')
export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Get()
  async listProducts() {
    const listProducts = await this.productRepository.listProducts();
    return listProducts;
  }

  @Post()
  async createProducts(@Body() dataProduct: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.id = uuid();
    productEntity.name = dataProduct.name;
    productEntity.userId = dataProduct.userId;
    productEntity.cost = dataProduct.cost;
    productEntity.quantity = dataProduct.quantity;
    productEntity.description = dataProduct.description;
    productEntity.category = dataProduct.category;
    productEntity.caracteristics = dataProduct.caracteristics;
    productEntity.images = dataProduct.images;

    const productSaved = this.productRepository.createProduct(productEntity);
    return { productSaved, message: `Produto cadastrado com sucesso` };
  }
}
