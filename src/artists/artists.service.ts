import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InMemoryDB } from 'src/helper/app.datastore';
import { InMemoryFavDB } from 'src/helper/fav.datastorey';

@Injectable()
export class ArtistsService {
  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = new Artist(createArtistDto);
    InMemoryDB.artists.push(newArtist);

    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    return InMemoryDB.artists;
  }

  async findOne(id: string): Promise<Artist> {
    const artist = InMemoryDB.artists.find((item: Artist) => item.id === id);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = InMemoryDB.artists.find((item: Artist) => item.id === id);

    if (artist) {
      Object.assign(artist, updateArtistDto);
    } else {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }
    return artist;
  }

  async remove(id: string): Promise<Artist | undefined> {
    const artist: Artist = InMemoryDB.artists.find(
      (item: Artist) => item.id === id,
    );

    if (artist) {
      InMemoryDB.artists = InMemoryDB.artists.filter((item) => item.id !== id);
      InMemoryDB.albums.forEach((item) => {
        if (item.artistId === id) {
          item.artistId = null;
        }
      });
      InMemoryDB.tracks.forEach((item) => {
        if (item.artistId === id) {
          item.artistId = null;
        }
      });
      InMemoryFavDB.artists = InMemoryFavDB.artists.filter(
        (artistId) => artistId !== id,
      );
      return artist;
    } else {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }
  }
}
