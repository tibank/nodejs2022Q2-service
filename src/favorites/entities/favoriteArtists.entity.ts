import { Exclude } from 'class-transformer';
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
  @Exclude()
  id: string;

  @IsNotEmpty()
  @OneToOne(() => Artist, {
    eager: true,
  })
  @JoinColumn()
  artist: Artist;

  constructor(artist: Artist) {
    this.artist = artist;
  }
}
