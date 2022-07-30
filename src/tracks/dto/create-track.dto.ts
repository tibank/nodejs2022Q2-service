import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;
  @IsInt()
  @IsNotEmpty()
  duration: number;
  @IsOptional()
  artistId: string | null;
  @IsOptional()
  albumId: string | null;
}
