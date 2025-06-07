/*
  Warnings:

  - You are about to drop the column `iaActive` on the `Playlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "iaActive",
ADD COLUMN     "isActive" BOOLEAN DEFAULT true;
