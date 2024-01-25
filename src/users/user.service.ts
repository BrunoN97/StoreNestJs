import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async listUsers() {
    const usersSaved = await this.userRepository.find();
    const usersList = usersSaved.map(
      (user) => new ListUserDTO(user.id, user.name, user.email),
    );
    return usersList;
  }

  async createUsers(userEntity: UserEntity) {
    await this.userRepository.save(userEntity);
  }

  async updateUser(id: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(id, userEntity);
  }

  async deleteUsers(id: string) {
    await this.userRepository.delete(id);
  }
}
