-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productname" TEXT NOT NULL,
    "productprice" INTEGER NOT NULL,
    "productcategory" TEXT NOT NULL,
    "productdescription" TEXT NOT NULL,
    "productImageUrl" TEXT NOT NULL
);
