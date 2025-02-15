import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { LinkService } from '../link/link.service';
import { ConfigService } from '@nestjs/config';

@Controller({
  version: '1',
})
export class RedirectionController {
  constructor(private readonly linkService: LinkService) {}

  @Get('/:shortURL')
  async redirection(@Param('shortURL') shortURL: string, @Res() res: Response) {
    const link = await this.linkService.findOneByShortURL(shortURL);

    if (!link) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Link not found' });
    }

    let url = link.originalURL;

    if (/(?<!^(https|http)?:\/\/)/.test(url)) {
      url = 'http://' + url;
    }

    return res.redirect(301, url);
  }
}
