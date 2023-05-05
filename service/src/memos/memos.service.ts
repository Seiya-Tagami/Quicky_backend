import { Injectable } from '@nestjs/common';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Memo } from '@prisma/client';

@Injectable()
export class MemosService {
  constructor(private prisma: PrismaService) { }
  createMemo(createMemoDto: CreateMemoDto) {
    return this.prisma.memo.create({ data: createMemoDto });
  }

  findAll() {
    return this.prisma.memo.findMany();
  }

  findOne(id: string) {
    return this.prisma.memo.findUnique({ where: { id } });
  }

  async updateMemo(id: string, updateMemoDto: UpdateMemoDto): Promise<Memo> {
    return this.prisma.memo.update({
      where: { id },
      data: {
        updatedAt: new Date().toISOString(),
        ...updateMemoDto,
      },
    });
  }

  async updateIsDone(id: string): Promise<Memo> {
    return this.prisma.memo.update({
      where: { id },
      data: {
        isDone: true,
      },
    });
  }
  async updateIsNotDone(id: string): Promise<Memo> {
    return this.prisma.memo.update({
      where: { id },
      data: {
        isDone: false,
      },
    });
  }
  async removeById(id: string) {
    return this.prisma.memo.delete({ where: { id } });
  }

  async removeMemosByIsDone() {
    return this.prisma.memo.deleteMany({
      where: {
        isDone: true,
      },
    });
  }
}
