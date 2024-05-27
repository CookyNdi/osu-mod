-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "previous_usernames" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ranked_beatmapset_count" INTEGER NOT NULL DEFAULT 0,
    "guest_beatmapset_count" INTEGER NOT NULL DEFAULT 0,
    "loved_beatmapset_count" INTEGER NOT NULL DEFAULT 0,
    "last_action" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT false,
    "queue_limit" INTEGER NOT NULL DEFAULT 10,
    "request_cooldown" INTEGER NOT NULL DEFAULT 1,
    "modes" TEXT[],
    "modder_type" TEXT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "beatmapId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "mapper_message" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "feedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beatmaps" (
    "id" INTEGER NOT NULL,
    "artist" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bpm" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "cover_url" TEXT NOT NULL,
    "creator" TEXT NOT NULL,

    CONSTRAINT "Beatmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeatmapSetDiff" (
    "id" TEXT NOT NULL,
    "beatmapId" INTEGER NOT NULL,
    "difficulty_rating" INTEGER NOT NULL,
    "mode" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "BeatmapSetDiff_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_beatmapId_fkey" FOREIGN KEY ("beatmapId") REFERENCES "Beatmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeatmapSetDiff" ADD CONSTRAINT "BeatmapSetDiff_beatmapId_fkey" FOREIGN KEY ("beatmapId") REFERENCES "Beatmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
