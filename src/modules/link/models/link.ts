import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
  PaginateModel,
  SchemaTimestampsConfig,
} from 'mongoose';
import * as paginationPlugin from 'mongoose-paginate-v2';

export type LinkDocument = HydratedDocument<LinkEntity> &
  SchemaTimestampsConfig;
export type LinkDocumentPaginated = PaginateModel<LinkDocument>;

@Schema({
  timestamps: true,
  collection: 'links',
})
export class LinkEntity {
  @Prop({ required: true })
  originalURL: string;

  @Prop({ required: true, unique: true })
  shortURL: string;

  @Prop({ required: true })
  expiresAt: Date;

  //virtual properties
  id: string;
}

export const LinkSchema = SchemaFactory.createForClass(LinkEntity);
LinkSchema.plugin(paginationPlugin);
