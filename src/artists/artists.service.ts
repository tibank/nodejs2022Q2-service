import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  private readonly artists: Artist[];

  constructor() {
    this.artists = [];
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = new Artist(createArtistDto);
    this.artists.push(newArtist);

    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findOne(id: string): Promise<Artist> {
    const artist = this.artists.find((item: Artist) => item.id === id);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = this.artists.find((item: Artist) => item.id === id);
    if (!artist) {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }
    return artist;
  }

  async remove(id: string): Promise<void> {
    const index = this.artists.findIndex((item: Artist) => item.id === id);

    if (~index) {
      const tempDb: Artist[] = [...this.artists];
      this.artists.length = 0;
      tempDb.forEach((artist: Artist) =>
        artist.id !== id ? this.artists.push(artist) : '',
      );
    } else {
      //throw new NotFoundException(`There is no artist with id: ${id}`);
    }
  }
}
