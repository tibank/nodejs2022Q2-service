import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Album>,
  ) {}
  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = new Artist(createArtistDto);

    return await this.artistRepository.save(newArtist);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const artist: Artist | null = await this.artistRepository.findOneBy({ id });
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist: Artist | null = await this.artistRepository.findOneBy({ id });

    if (artist) {
      Object.assign(artist, updateArtistDto);
      return this.artistRepository.save(artist);
    } else {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }
    return artist;
  }

  async remove(id: string): Promise<Artist | undefined> {
    const artist: Artist | null = await this.artistRepository.findOneBy({ id });

    if (artist) {
      await this.artistRepository.remove(artist);
      const albums = await this.albumRepository.find({
        where: {
          artistId: id,
        },
      });
      albums.forEach((item) => (item.artistId = null));
      await this.albumRepository.save(albums);

      const tracks = await this.trackRepository.find({
        where: {
          artistId: id,
        },
      });
      tracks.forEach((item) => (item.artistId = null));
      await this.trackRepository.save(tracks);

      return artist;
    } else {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }
  }
}
