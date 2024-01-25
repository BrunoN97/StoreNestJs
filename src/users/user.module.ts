import { Module } from '@nestjs/common';
import { UserController } from 'src/users/user.controller';
import { UserRepository } from 'src/users/user.repository';
import { EmailUniqueValidator } from './validators/email-unique.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository, EmailUniqueValidator],
})
export class UserModule {}
