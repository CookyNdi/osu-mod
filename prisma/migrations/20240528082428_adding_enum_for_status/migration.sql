/*
  Warnings:

  - The `status` column on the `Request` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'MODDED', 'NOMINATED', 'RANKED');

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "status",
ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'PENDING';
