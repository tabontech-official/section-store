/*
  Warnings:

  - You are about to drop the column `Price` on the `SectionStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."SectionStatus" DROP COLUMN "Price",
ADD COLUMN     "price" TEXT;
