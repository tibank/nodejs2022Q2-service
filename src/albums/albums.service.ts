import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteAlbums } from 'src/favorites/entities/favoriteAlbums.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(FavoriteAlbums)
    private favAlbumRepository: Repository<FavoriteAlbums>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = new Album(createAlbumDto);

    return await this.albumRepository.save(newAlbum);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album: Album | null = await this.albumRepository.findOneBy({ id });

    if (album) {
      return album;
    } else {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album: Album | null = await this.albumRepository.findOneBy({ id });

    if (album) {
      Object.assign(album, updateAlbumDto);

      return this.albumRepository.save(album);
    } else {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }
  }

  async remove(id: string): Promise<Album | undefined> {
    const album: Album | null = await this.albumRepository.findOneBy({ id });

    console.log(album);
    if (album) {
      await this.albumRepository.remove(album);
      const tracks = await this.trackRepository.find({
        where: {
          albumId: id,
        },
      });
      tracks.forEach((item) => (item.albumId = null));
      await this.trackRepository.save(tracks);

      const favAlbums = await this.favAlbumRepository.find({
        where: {
          albumId: id,
        },
      });
      await this.favAlbumRepository.remove(favAlbums);

      return album;
    } else {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }
  }
}
