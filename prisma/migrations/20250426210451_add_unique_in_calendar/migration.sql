/*
  Warnings:

  - A unique constraint covering the columns `[userId,year]` on the table `Calendar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Calendar_userId_year_key" ON "Calendar"("userId", "year");
