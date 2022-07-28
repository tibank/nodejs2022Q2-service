import { IsNotEmpty } from 'class-validator';
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
export class FavoriteArtists {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @OneToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: Artist;

  constructor(artist: Artist) {
    this.artist = artist;
  }
}
