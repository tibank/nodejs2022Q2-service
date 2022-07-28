import { IsNotEmpty } from 'class-validator';
import { Track } from 'src/tracks/entities/track.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteTracks {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @OneToOne(() => Track, { onDelete: 'SET NULL' })
  @JoinColumn()
  track: Track;

  constructor(track: Track) {
    this.track = track;
  }
}
