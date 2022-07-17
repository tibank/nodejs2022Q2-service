import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;
  @IsInt()
  year: number;
  @IsNotEmpty()
  artistId: string;  
}
