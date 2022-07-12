import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { validate } from 'uuid';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [];
  }

  create(createUserDto: CreateUserDto): User {
    const newUser = new User(createUserDto);
    this.users.push(newUser);

    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((item: User) => item.id === id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.users.find((item: User) => item.id === id);
    if (user) {
      if (user.password === updatePasswordDto.oldPassowrd) {
        user.password = updatePasswordDto.newPassword;
        user.version += 1;
        user.updatedAt = Date.now();
      } else {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: `Old password is incorrect`,
          },
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }
    return user;
  }

  remove(id: string) {
    const index = this.users.findIndex((item: User) => item.id === id);

    if (~index) {
      const tempDb: User[] = [...this.users];
      this.users.length = 0;
      tempDb.forEach((user: User) =>
        user.id !== id ? this.users.push(user) : '',
      );
    } else {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }
  }
}
