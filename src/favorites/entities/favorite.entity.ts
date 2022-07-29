import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

export class Favorite {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor(artists: Artist[], albums: Album[], tracks: Track[]) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
