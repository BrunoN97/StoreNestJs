import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from 'src/users/user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  private maskUser(userEntity: UserEntity) {
    const usersList = new ListUserDTO(
      userEntity.id,
      userEntity.name,
      userEntity.email,
    );
    return usersList;
  }

  @Get()
  async listUsers() {
    const usersSaved = await this.userRepository.listUsers();
    const usersList = usersSaved.map(
      (user) => new ListUserDTO(user.id, user.name, user.email),
    );
    return usersList;
  }

  @Post()
  async createUsers(@Body() dataUser: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.id = uuid();
    userEntity.name = dataUser.name;
    userEntity.email = dataUser.email;
    userEntity.password = dataUser.password;

    this.userRepository.save(userEntity);

    return {
      user: new ListUserDTO(userEntity.id, userEntity.name, userEntity.email),
      message: `Usuário com id: ${userEntity.id} criado com sucesso`,
    };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newDatas: UpdateUserDTO) {
    const userUpdated = await this.userRepository.updateUser(id, newDatas);
    const usersList = this.maskUser(userUpdated);

    return {
      user: usersList,
      message: `Usuário atualizado com sucesso`,
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const userRemoved = await this.userRepository.deleteUser(id);
    const usersList = this.maskUser(userRemoved);

    return {
      usuario: usersList,
      message: 'Usuário deletado com sucesso',
    };
  }
}
