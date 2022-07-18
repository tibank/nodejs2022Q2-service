import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { IsInt, IsNotEmpty } from 'class-validator';

export class User {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  login: string;
  @Exclude()
  @IsNotEmpty()
  password: string;

  @IsInt()
  version: number;
  @IsInt()
  createdAt: number;
  @IsInt()
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    this.id = uuidv4();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
