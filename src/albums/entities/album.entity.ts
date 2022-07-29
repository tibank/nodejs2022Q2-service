import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Artist } from 'src/artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
    eager: true,
  })
  artist: Artist;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
