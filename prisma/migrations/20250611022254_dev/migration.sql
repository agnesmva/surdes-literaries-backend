/*
  Warnings:

  - You are about to drop the column `name` on the `Dictionary` table. All the data in the column will be lost.
  - Added the required column `signal` to the `Dictionary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dictionary" DROP COLUMN "name",
ADD COLUMN     "signal" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "team" TEXT;
