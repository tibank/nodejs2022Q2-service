import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoritesRepsonse } from 'src/helper/fav.response';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('artist/:id')
  async createArtistFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.favoritesService.createArtistFav(id);
  }

  @Post('album/:id')
  async createAlbumFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.favoritesService.createAlbumFav(id);
  }

  @Post('track/:id')
  async createTrackFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.favoritesService.createTrackFav(id);
  }

  @Get()
  async findAll(): Promise<FavoritesRepsonse> {
    return this.favoritesService.findAll();
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtistFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.favoritesService.removeArtistFav(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbumFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.favoritesService.removeAlbumFav(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrackFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.favoritesService.removeTrackFav(id);
  }
}
