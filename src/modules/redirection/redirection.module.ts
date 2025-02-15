import { Module } from '@nestjs/common';
import { LinkModule } from '../link/link.module';
import { LinkService } from '../link/link.service';
import { RedirectionController } from './redirection.controller';

@Module({
  imports: [LinkModule],
  controllers: [RedirectionController],
  providers: [LinkService],
})
export class RedirectionModule {}
