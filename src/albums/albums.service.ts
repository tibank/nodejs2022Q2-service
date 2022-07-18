import { Injectable, NotFoundException } from '@nestjs/common';
import { InMemoryDB } from 'src/helper/app.datastore';
import { InMemoryFavDB } from 'src/helper/fav.datastorey';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = new Album(createAlbumDto);
    InMemoryDB.albums.push(newAlbum);

    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    return InMemoryDB.albums;
  }

  async findOne(id: string): Promise<Album> {
    const album = InMemoryDB.albums.find((item: Album) => item.id === id);
    if (album) {
      return album;
    } else {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = InMemoryDB.albums.find((item: Album) => item.id === id);

    if (album) {
      Object.assign(album, updateAlbumDto);
    } else {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }
    return album;
  }

  async remove(id: string): Promise<Album | undefined> {
    const album: Album = InMemoryDB.albums.find(
      (item: Album) => item.id === id,
    );

    if (album) {
      InMemoryDB.albums = InMemoryDB.albums.filter((item) => item.id !== id);
      InMemoryDB.tracks.forEach((item) => {
        if (item.albumId === id) {
          item.albumId = null;
        }
      });
      InMemoryFavDB.albums = InMemoryFavDB.albums.filter(
        (albumId) => albumId !== id,
      );

      return album;
    } else {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }
  }
}
