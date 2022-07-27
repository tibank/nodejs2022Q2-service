import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Artist]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
