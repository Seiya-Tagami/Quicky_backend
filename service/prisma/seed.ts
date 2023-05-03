import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.memo.upsert({
    where: { title: '読書' }, // データベースを設置する場所
    update: {},
    // データの中身を設計する
    create: {
      title: '読書',
      content: '本を読む',
      category: 'study',
      link: 'https://google.com',
    },
  });
  const post2 = await prisma.memo.upsert({
    where: { title: '散歩' }, // データベースを設置する場所prijjjhdg
    update: {},
    // データの中身を設計する
    create: {
      title: '散歩',
      content: '公園を歩く',
      category: 'hobby',
    },
  });
  console.log({ post1, post2 });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
