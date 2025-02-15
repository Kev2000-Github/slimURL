import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, PaginateModel } from 'mongoose';
import * as paginationPlugin from 'mongoose-paginate-v2';

export type LinkDocument = HydratedDocument<Link>;
export type LinkDocumentPaginated = PaginateModel<HydratedDocument<Link>>;

@Schema({
  timestamps: true,
})
export class Link {
  @Prop({ required: true })
  originalURL: string;

  @Prop({ required: true, unique: true })
  shortURL: string;

  //virtual properties
  id: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
LinkSchema.plugin(paginationPlugin);
