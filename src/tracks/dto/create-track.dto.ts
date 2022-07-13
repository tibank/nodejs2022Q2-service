import { Allow, IsInt, IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
    @IsNotEmpty()
    name: string;
    @IsInt()
    duration: number; 
    @Allow()
    artistId: string | null;
    @Allow()
    albumId: string | null;    
}
