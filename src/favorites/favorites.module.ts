import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoriteArtists } from './entities/favoriteArtists.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteAlbums } from './entities/favoriteAlbums.entity';
import { FavoriteTracks } from './entities/favoriteTracks.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteArtists]),
    TypeOrmModule.forFeature([FavoriteAlbums]),
    TypeOrmModule.forFeature([FavoriteTracks]),
    TypeOrmModule.forFeature([Artist]),
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Track]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
