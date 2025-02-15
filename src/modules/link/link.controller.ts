import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from 'src/modules/link/models/link';
import { CreateLinkDto } from './dto/create-link.dto';
import { getPaginationOptions, PageOptions } from 'src/utils/pagination';
import { FindAllLinksDto } from './dto/find-all-links.dto';

@Controller({
  path: 'link',
  version: '1',
})
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  findAll(@Query() options: FindAllLinksDto) {
    const paginationOptions = getPaginationOptions(options);

    return this.linkService.findAll(options);
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
