/*
  Warnings:

  - The `previous_usernames` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "previous_usernames",
ADD COLUMN     "previous_usernames" TEXT[],
ALTER COLUMN "last_action" SET DEFAULT CURRENT_TIMESTAMP;
