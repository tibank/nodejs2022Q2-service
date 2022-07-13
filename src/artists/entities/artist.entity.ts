import { IsBoolean, IsNotEmpty } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class Artist {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
    this.id = uuidv4();
    this.grammy = false;
  }
}
