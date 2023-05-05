import { Module } from '@nestjs/common';
import { MemosService } from './memos.service';
import { MemosController } from './memos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MemosController],
  providers: [MemosService],
  imports: [PrismaModule],
})
export class MemosModule { }
