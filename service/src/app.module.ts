import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MemosModule } from './memos/memos.module';

@Module({
  imports: [PrismaModule, MemosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
