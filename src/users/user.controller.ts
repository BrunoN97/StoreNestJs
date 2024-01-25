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
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Get()
  async listUsers() {
    const usersSaved = await this.userService.listUsers();
    return usersSaved;
  }

  @Post()
  async createUsers(@Body() dataUser: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.id = uuid();
    userEntity.name = dataUser.name;
    userEntity.email = dataUser.email;
    userEntity.password = dataUser.password;

    this.userService.createUsers(userEntity);

    return {
      user: new ListUserDTO(userEntity.id, userEntity.name, userEntity.email),
      message: `Usuário com id: ${userEntity.id} criado com sucesso`,
    };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newDatas: UpdateUserDTO) {
    const userUpdated = await this.userService.updateUser(id, newDatas);
    return { message: `Usuário atualizado com sucesso` };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const userRemoved = await this.userService.deleteUsers(id);
    return { message: 'Usuário deletado com sucesso' };
  }
}
