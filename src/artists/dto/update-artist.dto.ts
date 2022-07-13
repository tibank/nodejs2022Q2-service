import { Allow, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsNotEmpty()
  name: string;
  @Allow()
  grammy: boolean;
}
