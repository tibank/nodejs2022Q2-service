import { Injectable, NotFoundException } from '@nestjs/common';
import { InMemoryDB } from 'src/helper/app.datastore';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  async create(createTrackDto: CreateTrackDto):Promise<Track> {
    const newTrack = new Track(createTrackDto);
    InMemoryDB.tracks.push(newTrack);

    return newTrack;
  }

  async findAll():Promise<Track[]>  {
    return InMemoryDB.tracks;
  }

  async findOne(id: string):Promise<Track>  {
    const track = InMemoryDB.tracks.find((item: Track) => item.id === id);
    if (track) {
      return track;
    } else {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto):Promise<Track>  {
    const track = InMemoryDB.tracks.find((item: Track) => item.id === id);

    if (track) {
      Object.assign(track, updateTrackDto);
    } else {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }
    return track;
  }

  async remove(id: string):Promise<Track>  {
    const track: Track = InMemoryDB.tracks.find(
      (item: Track) => item.id === id,
    );

    if (track) {
      InMemoryDB.tracks = InMemoryDB.tracks.filter((item) => item.id !== id);
      return track;
    } else {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }
  }
}
