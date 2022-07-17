import { IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class Album {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsInt()
  year: number;
  @IsOptional()
  @IsNotEmpty()
  artistId: string|null;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
    this.id = uuidv4();
  }
}
