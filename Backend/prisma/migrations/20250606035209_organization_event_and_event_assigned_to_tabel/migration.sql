-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('ONLINE', 'OFLINE');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'ORGANIZATION';

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3),
    "eventTime" TIMESTAMP(3),
    "iaActive" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "problemsId" TEXT NOT NULL,
    "mode" "Mode" NOT NULL DEFAULT 'ONLINE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAssignedTo" (
    "id" TEXT NOT NULL,
    "OrganizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventAssignedTo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_problemsId_fkey" FOREIGN KEY ("problemsId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAssignedTo" ADD CONSTRAINT "EventAssignedTo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAssignedTo" ADD CONSTRAINT "EventAssignedTo_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
