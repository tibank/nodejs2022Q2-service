import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InMemoryDB } from '../helper/app.datastore';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
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
    const user: User = await this.usersRepository.findOneBy({ id });
    if (user) {
      console.log(updatePasswordDto);
      console.log(user);
      console.log(user.password);
      if (user.password === updatePasswordDto.oldPassword) {
        user.password = updatePasswordDto.newPassword;
        return this.usersRepository.save(user);
      } else {
        throw new ForbiddenException(`Old password is incorrect`);
      }
    } else {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }
  }

  async remove(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (user) {
      await this.usersRepository.remove(user);
      return user;
    } else {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }
  }
}
