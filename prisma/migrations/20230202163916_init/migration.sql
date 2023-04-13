/*
  Warnings:

  - You are about to drop the column `password` on the `TimesheetInfos` table. All the data in the column will be lost.
  - Added the required column `content` to the `TimesheetInfos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iv` to the `TimesheetInfos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimesheetInfos" DROP COLUMN "password",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "iv" TEXT NOT NULL;
