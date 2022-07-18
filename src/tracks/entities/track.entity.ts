import { v4 as uuidv4 } from 'uuid';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class Track {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsNotEmpty()
  artistId: string | null;
  @IsOptional()
  @IsNotEmpty()
  albumId: string | null;
  @IsInt()
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
    this.id = uuidv4();
  }
}
