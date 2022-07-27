import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Artist } from 'src/artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsInt()
  year: number;

  @IsOptional()
  @IsNotEmpty()
  @OneToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: Artist;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
