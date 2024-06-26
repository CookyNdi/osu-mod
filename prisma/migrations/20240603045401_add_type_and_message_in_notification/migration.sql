/*
  Warnings:

  - Added the required column `message` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('NEW_REQUEST', 'CHANGE_STATUS');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "type" "NotificationType" NOT NULL;
