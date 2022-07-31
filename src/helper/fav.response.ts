import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

export class FavoritesRepsonse {
  public artists: Artist[];
  public albums: Album[];
  public tracks: Track[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
