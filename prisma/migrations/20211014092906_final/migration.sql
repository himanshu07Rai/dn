/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Todo_user_id_key" ON "Todo"("user_id");
