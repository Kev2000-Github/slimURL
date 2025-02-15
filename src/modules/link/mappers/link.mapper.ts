import { PaginateResult } from 'mongoose';
import { Link, LinkDocument } from '../models/link';
import { paginate, PaginationResponseDto } from 'src/utils/pagination';

export class LinkMapper {
  static toDomain(raw: LinkDocument): Link {
    const link: Link = {
      id: raw._id.toString(),
      originalURL: raw.originalURL,
      shortURL: raw.shortURL,
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
