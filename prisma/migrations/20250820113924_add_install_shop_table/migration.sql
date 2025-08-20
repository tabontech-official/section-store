-- CreateTable
CREATE TABLE "public"."InstalledShops" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "email" TEXT,
    "domain" TEXT,
    "myshopifyDomain" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstalledShops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InstalledShops_shop_key" ON "public"."InstalledShops"("shop");
