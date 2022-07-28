import { FavoriteAlbums } from './favoriteAlbums.entity';
import { FavoriteArtists } from './favoriteArtists.entity';
import { FavoriteTracks } from './favoriteTracks.entity';

export class Favorite {
  artists: FavoriteArtists[];
  albums: FavoriteAlbums[];
  tracks: FavoriteTracks[];

  constructor(
    artists: FavoriteArtists[],
    albums: FavoriteAlbums[],
    tracks: FavoriteTracks[],
  ) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
