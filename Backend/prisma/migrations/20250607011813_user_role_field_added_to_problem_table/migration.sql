-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "iaActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "userRole" "UserRole" NOT NULL DEFAULT 'ADMIN';
