import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDB } from '../helper/app.datastore';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor() {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User(createUserDto);
    InMemoryDB.users.push(newUser);

    return newUser;
  }

  async findAll(): Promise<User[]> {
    return InMemoryDB.users;
  }

  async findOne(id: string): Promise<User> {
    const user = InMemoryDB.users.find((item: User) => item.id === id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = InMemoryDB.users.find((item: User) => item.id === id);
    if (user) {
      if (user.password === updatePasswordDto.oldPassword) {
        user.password = updatePasswordDto.newPassword;
        user.version += 1;
        user.updatedAt = Date.now();
        return user;
      } else {
        throw new ForbiddenException(`Old password is incorrect`);
      }
    } else {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }
  }

  async remove(id: string): Promise<User> {
    const user = InMemoryDB.users.find((item: User) => item.id === id);

    if (user) {
      InMemoryDB.users = InMemoryDB.users.filter((item) => item.id !== id);
      return user;
    } else {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }
  }
}
