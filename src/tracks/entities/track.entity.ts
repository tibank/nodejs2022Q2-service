import { v4 as uuidv4 } from 'uuid';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ManyToOne(() => Artist, { onDelete: 'SET NULL', eager: true })
  @JoinColumn()
  artist: Artist;

  @IsOptional()
  @ManyToOne(() => Album, { onDelete: 'SET NULL', eager: true })
  @JoinColumn()
  album: Album;

  @Column()
  @IsInt()
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
