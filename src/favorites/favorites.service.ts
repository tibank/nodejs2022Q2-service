import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
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
    const artistsFav: FavoriteArtists[] = await this.artistFavRepository.find();
    console.log(artistsFav);
    const artists: Artist[] = artistsFav.map((item) => item.artist);

    const albumsFav: FavoriteAlbums[] = await this.albumFavRepository.find();
    const albums: Album[] = albumsFav.map((item) => item.album);

    const tracksFav: FavoriteTracks[] = await this.trackFavRepository.find();
    const tracks: Track[] = tracksFav.map((item) => item.track);

    const favorite: Favorite = new Favorite(artists, albums, tracks);

    return favorite;
  }

  async removeArtistFav(id: string): Promise<string> {
    const artists: FavoriteArtists[] = await this.artistFavRepository.find({
      where: {
        artist: {
          id,
        },
      },
    });
    console.log(artists);
    await this.artistFavRepository.remove(artists);

    return '';
  }

  async removeAlbumFav(id: string): Promise<string> {
    const albums: FavoriteAlbums[] = await this.albumFavRepository.find({
      where: {
        album: {
          id,
        },
      },
    });
    await this.albumFavRepository.remove(albums);

    return '';
  }

  async removeTrackFav(id: string): Promise<string> {
    const tracks: FavoriteTracks[] = await this.trackFavRepository.find({
      where: {
        track: {
          id,
        },
      },
    });
    await this.trackFavRepository.remove(tracks);

    return '';
  }
}
