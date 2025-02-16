import { BaseClass } from 'src/common/base.class';

export class Link extends BaseClass {
  id: string;
  originalURL: string;
  shortURL: string;
  expiresAt: Date;
}
