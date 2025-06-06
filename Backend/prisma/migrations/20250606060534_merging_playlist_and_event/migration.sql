/*
  Warnings:

  - You are about to drop the column `eventID` on the `EventAssignedTo` table. All the data in the column will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventId` to the `EventAssignedTo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_problemsId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "EventAssignedTo" DROP CONSTRAINT "EventAssignedTo_eventID_fkey";

-- AlterTable
ALTER TABLE "EventAssignedTo" DROP COLUMN "eventID",
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "eventDate" TIMESTAMP(3),
ADD COLUMN     "eventTime" TIMESTAMP(3),
ADD COLUMN     "iaActive" BOOLEAN,
ADD COLUMN     "mode" "Mode" DEFAULT 'ONLINE';

-- DropTable
DROP TABLE "Event";

-- AddForeignKey
ALTER TABLE "EventAssignedTo" ADD CONSTRAINT "EventAssignedTo_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
