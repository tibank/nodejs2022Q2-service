import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = new Track(createTrackDto);

    return await this.trackRepository.save(newTrack);
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
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

      return await this.trackRepository.save(track);
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
