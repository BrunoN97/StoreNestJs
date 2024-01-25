import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/createProduct.dto';
import { v4 as uuid } from 'uuid';
import { ProductEntity } from './product.entity';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

@Controller('/product')
export class ProductController {
  constructor(
    private productRepository: ProductRepository,
    private productService: ProductService,
  ) {}

  @Get()
  async listProducts() {
    const listProducts = await this.productService.listProducts();
    return listProducts;
  }

  @Post()
  async createProduct(@Body() dataProduct: CreateProductDTO) {
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

    const productSaved = this.productService.createProduct(productEntity);
    return { productSaved, message: `Produto cadastrado com sucesso` };
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const productdeleted = await this.productRepository.deleteProduct(id);

    return {
      mensage: 'produto deletado com sucesso',
      produto: productdeleted,
    };
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() dataProduct: UpdateProductDTO,
  ) {
    const productUpdated = await this.productRepository.updateProduct(
      id,
      dataProduct,
    );

    return {
      mensage: 'produto atualizado com sucesso',
      produto: productUpdated,
    };
  }
}
