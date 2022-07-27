import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { InMemoryDB } from 'src/helper/app.datastore';
import { InMemoryFavDB } from 'src/helper/fav.datastorey';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = new Album(createAlbumDto);
    if (createAlbumDto.artistId) {
      const artist: Artist | null = await this.artistRepository.findOneBy({
        id: createAlbumDto.artistId,
      });
      if (artist) {
        newAlbum.artist = artist;
      }
    }

    return await this.albumRepository.save(newAlbum);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find({
      relations: {
        artist: true,
      },
    });
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
    return album;
  }

  async remove(id: string): Promise<Album | undefined> {
    const album: Album | null = await this.albumRepository.findOneBy({ id });

    if (album) {
      await this.albumRepository.remove(album);
      return album;
    } else {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }
  }
}
