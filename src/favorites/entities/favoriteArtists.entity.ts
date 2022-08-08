import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteArtists {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @Column()
  @IsNotEmpty()
  artistId: string;

  constructor(artistId: string) {
    this.artistId = artistId;
  }
}
