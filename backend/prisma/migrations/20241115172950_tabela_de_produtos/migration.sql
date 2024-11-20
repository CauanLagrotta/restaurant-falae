-- SQLBook: Code
/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Product";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productname" TEXT NOT NULL,
    "productprice" INTEGER NOT NULL,
    "productcategory" TEXT NOT NULL,
    "productdescription" TEXT NOT NULL,
    "productImageUrl" TEXT NOT NULL
);
