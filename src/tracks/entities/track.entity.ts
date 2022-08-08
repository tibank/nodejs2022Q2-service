import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ default: null })
  @IsOptional()
  artistId: string | null;

  @Column({ default: null })
  @IsOptional()
  albumId: string | null;

  @Column()
  @IsInt()
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
