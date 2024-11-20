/*
  Warnings:

  - A unique constraint covering the columns `[orderId,productId]` on the table `orderitem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orderitem_orderId_productId_key" ON "orderitem"("orderId", "productId");
