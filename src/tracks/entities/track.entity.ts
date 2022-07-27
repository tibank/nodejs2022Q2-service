import { v4 as uuidv4 } from 'uuid';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
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
  @OneToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: Artist;

  @IsOptional()
  @OneToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn()
  album: Album;

  @Column()
  @IsInt()
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
