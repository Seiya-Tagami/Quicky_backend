-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Memo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "link" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "isDone" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Memo" ("category", "content", "createdAt", "id", "isDone", "link", "title", "updatedAt") SELECT "category", "content", "createdAt", "id", "isDone", "link", "title", "updatedAt" FROM "Memo";
DROP TABLE "Memo";
ALTER TABLE "new_Memo" RENAME TO "Memo";
CREATE UNIQUE INDEX "Memo_title_key" ON "Memo"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
