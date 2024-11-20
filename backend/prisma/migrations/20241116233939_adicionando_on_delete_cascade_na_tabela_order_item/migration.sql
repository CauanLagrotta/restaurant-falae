-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orderitem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderquantity" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "orderitem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orderitem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_orderitem" ("id", "orderId", "orderquantity", "productId") SELECT "id", "orderId", "orderquantity", "productId" FROM "orderitem";
DROP TABLE "orderitem";
ALTER TABLE "new_orderitem" RENAME TO "orderitem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
