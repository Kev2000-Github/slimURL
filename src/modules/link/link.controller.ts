import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { getPaginationOptions } from 'src/utils/pagination';
import { CreateLinkDto } from './dto/create-link.dto';
import { FindAllLinksDto } from './dto/find-all-links.dto';
import { LinkService } from './link.service';
import { API_VERSION } from 'src/utils/constants';

@Controller({
  path: 'link',
  version: API_VERSION,
})
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  findAll(@Query() options: FindAllLinksDto) {
    const paginationOptions = getPaginationOptions(options);

    return this.linkService.findAll(paginationOptions);
  }

  @Get(':id')
  findOne(id: string) {
    return this.linkService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateLinkDto) {
    return this.linkService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.linkService.delete(id);
  }
}
