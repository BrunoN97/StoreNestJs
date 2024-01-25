import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductCaracteristicEntity } from './product-caracteristic.entity';
import { ProductImageEntity } from './product-image.entity';

@Entity({ name: 'tb_products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', length: 100, nullable: false })
  userId: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'cost', nullable: false })
  cost: number;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'category', length: 100, nullable: false })
  category: string;

  @OneToMany(
    () => ProductCaracteristicEntity,
    (productCaracteristicEntity) => productCaracteristicEntity.productId,
    { cascade: true, eager: true },
  )
  caracteristics: ProductCaracteristicEntity[];

  @OneToMany(
    () => ProductImageEntity,
    (productImageEntity) => productImageEntity.productId,
    { cascade: true, eager: true },
  )
  images: ProductImageEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
