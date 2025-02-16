import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LinkService } from '../link/link.service';
import { API_VERSION } from 'src/utils/constants';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller({
  version: API_VERSION,
})
export class RedirectionController {
  constructor(
    private readonly linkService: LinkService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/s/:shortURL')
  async redirection(@Param('shortURL') shortURL: string, @Res() res: Response) {
    let url: string = await this.cacheManager.get(shortURL);

    if (!url) {
      url = await this.linkService.findOriginalURLByShortURL(shortURL);
      await this.cacheManager.set(shortURL, url);
    }

    if (!url) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Link not found' });
    }

    if (/(?<!^(https|http)?:\/\/)/.test(url)) {
      url = 'http://' + url;
    }

    return res.redirect(301, url);
  }
}
