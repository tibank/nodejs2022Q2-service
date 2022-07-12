import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const createUserDto: CreateUserDto = {
      login: 'pupsik',
      password: '1234567890',
    };
    const newUser = new User(createUserDto);
    this.users.push(newUser);
    return this.users;
  }

  findOne(id: string) {
    if (id && validate(id)) {
      const user = this.users.find((item: User) => item.id === id);
      if (user) {
        return user;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `There is no user with id: ${id}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `The id: ${id} is invalid`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.users.find((item: User) => item.id === id);
    if (user) {
      user.password = updatePasswordDto.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
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
    }
  }
}
