import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class Album {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsInt()
  year: number;
  @IsNotEmpty()
  artistId: string;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
    this.id = uuidv4();
  }
}
