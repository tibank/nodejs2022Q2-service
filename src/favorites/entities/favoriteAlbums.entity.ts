import { IsNotEmpty } from 'class-validator';
import { Album } from 'src/albums/entities/album.entity';
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
export class FavoriteAlbums {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @OneToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn()
  album: Album;

  constructor(album: Album) {
    this.album = album;
  }
}
