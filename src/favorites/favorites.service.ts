import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { Artist } from 'src/artists/entities/artist.entity';
import { InMemoryDB } from 'src/helper/app.datastore';
import { InMemoryFavDB } from 'src/helper/fav.datastorey';
import { FavoritesRepsonse } from 'src/helper/fav.response';
import { Track } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { FavoriteAlbums } from './entities/favoriteAlbums.entity';
import { FavoriteArtists } from './entities/favoriteArtists.entity';
import { FavoriteTracks } from './entities/favoriteTracks.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(FavoriteTracks)
    private trackFavRepository: Repository<FavoriteTracks>,
    @InjectRepository(FavoriteAlbums)
    private albumFavRepository: Repository<FavoriteAlbums>,
    @InjectRepository(FavoriteArtists)
    private artistFavRepository: Repository<FavoriteArtists>,
  ) {}

  async createArtistFav(id: string): Promise<string> {
    console.log(id);
    const artist: Artist | null = await this.artistRepository.findOneBy({ id });
    console.log(artist);
    if (artist) {
      const newFav = new FavoriteArtists(artist);
      await this.artistFavRepository.save(newFav);
    } else {
      throw new UnprocessableEntityException(
        `There is no artist with id: ${id}`,
      );
    }

    return `Artist ${artist.name} is added into favourites`;
  }

  async createTrackFav(id: string): Promise<string> {
    const track: Track | null = await this.trackRepository.findOneBy({ id });
    if (track) {
      const newFav = new FavoriteTracks(track);
      await this.trackFavRepository.save(newFav);
    } else {
      throw new UnprocessableEntityException(
        `There is no track with id: ${id}`,
      );
    }

    return `Track ${track.name} is added into favourites`;
  }

  async createAlbumFav(id: string): Promise<string> {
    const album: Album | null = await this.albumRepository.findOneBy({ id });
    if (album) {
      const newFav = new FavoriteAlbums(album);
      await this.albumFavRepository.save(newFav);
    } else {
      throw new UnprocessableEntityException(
        `There is no album with id: ${id}`,
      );
    }

    return `Album ${album.name} is added into favourites`;
  }

  async findAll(): Promise<Favorite> {
    const artists: FavoriteArtists[] = await this.artistFavRepository.find();
    const albums: FavoriteAlbums[] = await this.albumFavRepository.find();
    const tracks: FavoriteTracks[] = await this.trackFavRepository.find();

    const favorite: Favorite = new Favorite(artists, albums, tracks);

    return favorite;
  }

  async removeArtistFav(id: string): Promise<string> {
    const str: string = '';

    return str;
  }

  async removeAlbumFav(id: string): Promise<string> {
    const str: string = '';

    return str;
  }

  async removeTrackFav(id: string): Promise<string> {
    const str: string = '';

    return str;
  }
}
