-- CreateTable
CREATE TABLE "SectionStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sectionHandle" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionStatus_sectionHandle_key" ON "SectionStatus"("sectionHandle");
