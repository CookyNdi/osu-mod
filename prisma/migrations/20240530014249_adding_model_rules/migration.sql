-- CreateEnum
CREATE TYPE "RulesType" AS ENUM ('REQUEST_INFORMATION', 'GENRE', 'MAP', 'MAPPER', 'LANGUAGE', 'SONG_DETAILS');

-- CreateTable
CREATE TABLE "Rules" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "RulesType" NOT NULL,
    "message" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL,

    CONSTRAINT "Rules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rules" ADD CONSTRAINT "Rules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
