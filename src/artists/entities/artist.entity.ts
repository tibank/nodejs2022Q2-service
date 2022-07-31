import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ default: false })
  @IsBoolean()
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
