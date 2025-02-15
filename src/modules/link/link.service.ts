import { Injectable } from '@nestjs/common';
import { Link } from 'src/modules/link/models/link';
import { CreateLinkDto } from './dto/create-link.dto';
import { LinkRepository } from './repositories/link.repository';
import { nanoid } from 'nanoid';
import { SHORT_URL_LENGTH } from 'src/utils/constants';
import { PageOptions } from 'src/utils/pagination';

@Injectable()
export class LinkService {
  constructor(private readonly linkRepository: LinkRepository) {}

  async findAll(options: PageOptions) {
    return this.linkRepository.findAll(options);
  }

  async findOne(id: string): Promise<Link> {
    return this.linkRepository.findOne(id);
  }

  async findOneByShortURL(shortURL: string): Promise<Link> {
    return this.linkRepository.findOneByShortURL(shortURL);
  }

  async create(link: CreateLinkDto): Promise<Link> {
    return this.linkRepository.create({
      originalURL: link.originalURL,
      shortURL: nanoid(SHORT_URL_LENGTH),
    });
  }

  async delete(id: string) {
    return this.linkRepository.delete(id);
  }
}
