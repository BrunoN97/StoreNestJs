import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  private findById(id: string) {
    const userUpdated = this.users.find((userSaved) => userSaved.id === id);
    if (!userUpdated) throw new Error('Usuário não existe');
    return userUpdated;
  }

  async listUsers() {
    return this.users;
  }

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async existEmail(email: string) {
    const existUser = this.users.find((user) => user.email === email);
    return existUser !== undefined;
    return existUser;
  }

  async updateUser(id: string, updateData: Partial<UserEntity>) {
    const userUpdated = this.findById(id);

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') return;

      userUpdated[key] = value;
    });

    return userUpdated;
  }

  async deleteUser(id: string) {
    const findUser = this.findById(id);
    this.users = this.users.filter((user) => user.id !== id);
    return findUser;
  }
}
