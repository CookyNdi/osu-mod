/*
  Warnings:

  - Made the column `preview_url` on table `Beatmaps` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Beatmaps" ALTER COLUMN "preview_url" SET NOT NULL;
