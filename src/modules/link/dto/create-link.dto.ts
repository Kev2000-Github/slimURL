import { Type } from 'class-transformer';

import { IsArray, IsNotEmpty, IsString, Validate } from 'class-validator';
import { isValidURL } from 'src/validators/is-valid-url';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsString()
  @Validate(isValidURL)
  originalURL: string;
}
