-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FRUIT_AND_VEGETABLES', 'MEAT_AND_FISH', 'BEVERAGES');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "category" "Category" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
