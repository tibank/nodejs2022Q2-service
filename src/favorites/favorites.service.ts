import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { Artist } from 'src/artists/entities/artist.entity';
import { InMemoryDB } from 'src/helper/app.datastore';
import { InMemoryFavDB } from 'src/helper/fav.datastorey';
import { FavoritesRepsonse } from 'src/helper/fav.response';
import { Track } from 'src/tracks/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly artistsService: ArtistsService) {}

  async createArtistFav(id: string): Promise<string> {
    const artist = InMemoryDB.artists.find((item: Artist) => item.id === id);
    if (artist) {
      InMemoryFavDB.artists.push(artist.id);
    } else {
      throw new UnprocessableEntityException(
        `There is no artist with id: ${id} to add to favorites`,
      );
    }
    return id;
  }

  async createTrackFav(id: string): Promise<string> {
    const track = InMemoryDB.tracks.find((item: Track) => item.id === id);
    if (track) {
      InMemoryFavDB.tracks.push(track.id);
    } else {
      throw new UnprocessableEntityException(
        `There is no track with id: ${id} to add to favorites`,
      );
    }
    return id;
  }

  async createAlbumFav(id: string): Promise<string> {
    const album = InMemoryDB.albums.find((item: Album) => item.id === id);
    if (album) {
      InMemoryFavDB.albums.push(album.id);
    } else {
      throw new UnprocessableEntityException(
        `There is no album with id: ${id} to add to favorites`,
      );
    }
    return id;
  }

  async findAll(): Promise<FavoritesRepsonse> {
    const res = new FavoritesRepsonse();

    for (let i = 0; i < InMemoryFavDB.artists.length; i++) {
      const id = InMemoryFavDB.artists[i];
      const artist = InMemoryDB.artists.find((item: Artist) => item.id === id);
      if (artist) {
        res.artists.push(artist);
      }
    }

    for (let i = 0; i < InMemoryFavDB.albums.length; i++) {
      const id = InMemoryFavDB.albums[i];
      const album = InMemoryDB.albums.find((item: Album) => item.id === id);
      if (album) {
        res.albums.push(album);
      }
    }

    for (let i = 0; i < InMemoryFavDB.tracks.length; i++) {
      const id = InMemoryFavDB.tracks[i];
      const track = InMemoryDB.tracks.find((item: Track) => item.id === id);
      if (track) {
        res.tracks.push(track);
      }
    }

    return res;
  }

  async removeArtistFav(id: string): Promise<string> {
    const countFav = InMemoryFavDB.artists.length;
    InMemoryFavDB.artists = InMemoryFavDB.artists.filter(
      (artistId) => artistId !== id,
    );
    if (countFav === InMemoryFavDB.artists.length) {
      throw new NotFoundException(
        `There is no artist with id: ${id} in favorites`,
      );
    }
    return id;
  }

  async removeAlbumFav(id: string): Promise<string> {
    const countFav = InMemoryFavDB.albums.length;
    InMemoryFavDB.albums = InMemoryFavDB.albums.filter(
      (albumId) => albumId !== id,
    );
    if (countFav === InMemoryFavDB.albums.length) {
      throw new NotFoundException(
        `There is no album with id: ${id} in favorites`,
      );
    }
    return id;
  }

  async removeTrackFav(id: string): Promise<string> {
    const countFav = InMemoryFavDB.tracks.length;
    InMemoryFavDB.tracks = InMemoryFavDB.tracks.filter(
      (trackId) => trackId !== id,
    );
    if (countFav === InMemoryFavDB.tracks.length) {
      throw new NotFoundException(
        `There is no track with id: ${id} in favorites`,
      );
    }
    return id;
  }
}
