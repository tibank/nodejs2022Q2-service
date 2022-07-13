import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [];
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User(createUserDto);
    this.users.push(newUser);

    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find((item: User) => item.id === id);
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
    const user = this.users.find((item: User) => item.id === id);
    if (user) {
      if (user.password === updatePasswordDto.oldPassowrd) {
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

  async remove(id: string): Promise<void> {
    const user = this.users.find((item: User) => item.id === id);

    if (user) {
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
