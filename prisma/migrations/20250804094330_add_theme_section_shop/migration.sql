/*
  Warnings:

  - Added the required column `shop` to the `ThemeSection` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ThemeSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "sectionTitle" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ThemeSection" ("addedAt", "id", "imageUrl", "sectionTitle") SELECT "addedAt", "id", "imageUrl", "sectionTitle" FROM "ThemeSection";
DROP TABLE "ThemeSection";
ALTER TABLE "new_ThemeSection" RENAME TO "ThemeSection";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
