-- CreateTable
CREATE TABLE "ThemeSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sectionTitle" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
