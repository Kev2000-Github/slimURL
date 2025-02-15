import {
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Link } from '../models/link';
import { LinkMapper } from '../mappers/link.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PageOptions, paginate } from 'src/utils/pagination';

@Injectable()
export class LinkRepository {
  constructor(@InjectModel(Link.name) private linkModel: PaginateModel<Link>) {}

  async create(data: Omit<Link, 'id'>) {
    try {
      const newEntity = await this.linkModel.create(data);
      return LinkMapper.toDomain(newEntity);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(options: PageOptions) {
    const result = await this.linkModel.paginate({}, options);

    return LinkMapper.toPaginatedDomain(result);
  }

  async findOne(id: string) {
    const result = await this.linkModel.findById(id).exec();

    if (!result) {
      throw new NotFoundException();
    }

    return LinkMapper.toDomain(result);
  }

  async findOneByShortURL(shortURL: string) {
    const result = await this.linkModel.findOne({ shortURL }).exec();

    return result ? LinkMapper.toDomain(result) : null;
  }

  async delete(id: string) {
    const result = await this.linkModel.findByIdAndDelete(id).exec();

    return result ? LinkMapper.toDomain(result) : null;
  }
}
