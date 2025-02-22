import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkEntity, LinkSchema } from 'src/modules/link/models/link';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { LinkRepository } from './repositories/link.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LinkEntity.name, schema: LinkSchema }]),
  ],
  controllers: [LinkController],
  providers: [LinkService, LinkRepository],
  exports: [LinkService, LinkRepository],
})
export class LinkModule {}
