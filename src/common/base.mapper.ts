import { Document, SchemaTimestampsConfig } from 'mongoose';

export class BaseMapper {
  protected static getBaseProps<T extends Document & SchemaTimestampsConfig>(
    raw: T,
  ) {
    return {
      id: raw._id.toString(),
      createdAt: `${raw.createdAt}`,
      updatedAt: `${raw.updatedAt}`,
    };
  }
}
