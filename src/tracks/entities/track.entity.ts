import { v4 as uuidv4 } from 'uuid';
import { Allow, IsInt, IsNotEmpty } from 'class-validator';

export class Track {
    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    name: string;
    @Allow()
    artistId: string | null;
    @Allow()
    albumId: string | null;
    @IsInt()
    duration: number; 

    constructor() {
        
    }
}
