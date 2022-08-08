import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from './entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Artist]),
  ],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
