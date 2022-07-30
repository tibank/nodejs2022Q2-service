import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;
  @IsInt()
  year: number;
  @IsOptional()
  artistId: string | null;
}
