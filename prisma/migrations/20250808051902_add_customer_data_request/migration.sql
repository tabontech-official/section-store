-- CreateTable
CREATE TABLE "CustomerDataRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop_id" TEXT NOT NULL,
    "shop_domain" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "orders_requested" BOOLEAN NOT NULL,
    "customerId" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT,
    "dataRequestId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
