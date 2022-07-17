import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { ArtistsService } from 'src/artists/artists.service';

@Module({
  imports: [ArtistsModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, ArtistsService],
})
export class FavoritesModule {}
