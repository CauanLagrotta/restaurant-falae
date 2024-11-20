-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orderitem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderquantity" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "orderitem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "orderitem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_orderitem" ("id", "orderId", "orderquantity", "productId") SELECT "id", "orderId", "orderquantity", "productId" FROM "orderitem";
DROP TABLE "orderitem";
ALTER TABLE "new_orderitem" RENAME TO "orderitem";
CREATE UNIQUE INDEX "orderitem_orderId_productId_key" ON "orderitem"("orderId", "productId");
CREATE TABLE "new_orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "totalPrice" REAL NOT NULL DEFAULT 0,
    "orderstatus" TEXT NOT NULL DEFAULT 'Carrinho',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_orders" ("createdAt", "id", "orderstatus", "totalPrice", "userId") SELECT "createdAt", "id", "orderstatus", "totalPrice", "userId" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
