import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { InMemoryDB } from 'src/helper/app.datastore';
import { InMemoryFavDB } from 'src/helper/fav.datastorey';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = new Track(createTrackDto);
    if (createTrackDto.artistId) {
      const artist: Artist | null = await this.artistRepository.findOneBy({
        id: createTrackDto.artistId,
      });
      if (artist) {
        newTrack.artist = artist;
      }
    }

    return await this.trackRepository.save(newTrack);
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find({
      relations: {
        artist: true,
        album: true,
      },
    });
  }

  async findOne(id: string): Promise<Track> {
    const track: Track | null = await this.trackRepository.findOneBy({ id });

    if (track) {
      return track;
    } else {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track: Track | null = await this.trackRepository.findOneBy({ id });

    if (track) {
      Object.assign(track, updateTrackDto);
      return this.albumRepository.save(track);
    } else {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }
  }

  async remove(id: string): Promise<Track> {
    const track: Track | null = await this.trackRepository.findOneBy({ id });

    if (track) {
      await this.trackRepository.remove(track);
      return track;
    } else {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }
  }
}
