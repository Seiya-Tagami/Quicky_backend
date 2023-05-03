/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Memo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Memo_title_key" ON "Memo"("title");
