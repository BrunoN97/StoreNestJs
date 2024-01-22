import { Module } from '@nestjs/common';
import { UserController } from 'src/users/user.controller';
import { UserRepository } from 'src/users/user.repository';
import { EmailUniqueValidator } from './validators/email-unique.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, EmailUniqueValidator],
})
export class UserModule {}
