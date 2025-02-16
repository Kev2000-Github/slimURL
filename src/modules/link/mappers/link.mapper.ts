import { PaginateResult } from 'mongoose';
import { BaseMapper } from 'src/common/base.mapper';
import { paginate, PaginationResponseDto } from 'src/utils/pagination';
import { Link } from '../domain/link';
import { LinkDocument } from '../models/link';

export class LinkMapper extends BaseMapper {
  static toDomain(raw: LinkDocument): Link {
    const link: Link = {
      originalURL: raw.originalURL,
      shortURL: raw.shortURL,
      expiresAt: raw.expiresAt,
      ...this.getBaseProps(raw),
    };

    return link;
  }

  static toPaginatedDomain(
    raw: PaginateResult<LinkDocument>,
  ): PaginationResponseDto<Link> {
    const paginatedRaws = paginate(raw);
    return {
      ...paginatedRaws,
      items: paginatedRaws.items.map((item) => this.toDomain(item)),
    };
  }
}
