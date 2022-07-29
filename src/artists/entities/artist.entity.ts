import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Album } from 'src/albums/entities/album.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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

  @OneToMany(() => Album, (albun) => albun.artist)
  albums: Album[];

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
