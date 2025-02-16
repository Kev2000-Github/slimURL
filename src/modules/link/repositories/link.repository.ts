import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PageOptions } from 'src/utils/pagination';
import { Link } from '../domain/link';
import { LinkMapper } from '../mappers/link.mapper';
import { LinkEntity } from '../models/link';
import { OmitBaseProps } from 'src/utils/types';

@Injectable()
export class LinkRepository {
  constructor(
    @InjectModel(LinkEntity.name) private linkModel: PaginateModel<LinkEntity>,
  ) {}

  async create(data: OmitBaseProps<Link>) {
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

  async deleteExpiredLinks() {
    const result = await this.linkModel.deleteMany({
      expiresAt: { $lt: new Date() },
    });

    return result.deletedCount;
  }
}
