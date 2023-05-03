import { Injectable } from '@nestjs/common';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemosService {
  constructor(private prisma: PrismaService) { }
  create(createMemoDto: CreateMemoDto) {
    return this.prisma.memo.create({ data: createMemoDto });
  }

  findAll() {
    // return `This action returns all memos`;
    return this.prisma.memo.findMany();
  }

  findOne(id: string) {
    // return `This action returns a #${id} memo`;
    return this.prisma.memo.findUnique({ where: { id } });
  }

  update(id: number, updateMemoDto: UpdateMemoDto) {
    return `This action updates a #${id} memo`;
  }

  removeById(id: string) {
    // return `This action removes a #${id} memo`
    return this.prisma.memo.delete({ where: { id } });
  }
}
