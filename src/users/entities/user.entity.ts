import { Exclude, Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @Column()
  @IsNotEmpty()
  login: string;

  @Column()
  @Exclude()
  @IsNotEmpty()
  password: string;

  @Column()
  @VersionColumn()
  version: number;

  @Column()
  @CreateDateColumn()
  @Type(() => Number)
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  @Type(() => Number)
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
