import { Injectable } from '@nestjs/common';
import { Link } from 'src/modules/link/domain/link';
import { CreateLinkDto } from './dto/create-link.dto';
import { LinkRepository } from './repositories/link.repository';
import { nanoid } from 'nanoid';
import { EXPIRY_TIME, SHORT_URL_LENGTH } from 'src/utils/constants';
import { PageOptions } from 'src/utils/pagination';
import { addDays } from 'date-fns';

@Injectable()
export class LinkService {
  constructor(private readonly linkRepository: LinkRepository) {}

  async findAll(options: PageOptions) {
    return this.linkRepository.findAll(options);
  }

  async findOne(id: string): Promise<Link> {
    return this.linkRepository.findOne(id);
  }

  async findOriginalURLByShortURL(shortURL: string): Promise<string> {
    const link = await this.linkRepository.findOneByShortURL(shortURL);
    return link.originalURL;
  }

  async create(link: CreateLinkDto): Promise<Link> {
    const expiryDate = addDays(new Date(), EXPIRY_TIME);

    return this.linkRepository.create({
      originalURL: link.originalURL.trim(),
      shortURL: nanoid(SHORT_URL_LENGTH),
      expiresAt: expiryDate,
    });
  }

  async delete(id: string) {
    return this.linkRepository.delete(id);
  }
}
