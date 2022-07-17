import { Allow, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrackDto {
    @IsNotEmpty()
    name: string;
    @IsInt()
    duration: number; 
    @IsOptional()
    @IsNotEmpty()
    artistId: string| null;
    @IsOptional()
    @IsNotEmpty()
    albumId: string| null;    
}
