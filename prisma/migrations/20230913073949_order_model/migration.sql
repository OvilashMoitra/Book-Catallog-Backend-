/*
  Warnings:

  - You are about to drop the column `orderedBooks` on the `Order` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_id_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderedBooks",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending',
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "OrderedBook" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderedBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ordered_books_order_id_index" ON "OrderedBook"("orderId");

-- AddForeignKey
ALTER TABLE "OrderedBook" ADD CONSTRAINT "OrderedBook_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
