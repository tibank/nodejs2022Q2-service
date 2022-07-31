import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from '../users/entities/user.entity';

export class InMemoryDB {
  public static users: User[] = [];
  public static artists: Artist[] = [];
  public static albums: Album[] = [];
  public static tracks: Track[] = [];
}
