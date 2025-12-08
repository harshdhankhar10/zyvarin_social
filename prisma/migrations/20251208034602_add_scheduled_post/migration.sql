/*
  Warnings:

  - The `status` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."PostStatus" AS ENUM ('POSTED', 'FAILED', 'SCHEDULED');

-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "scheduledFor" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "public"."PostStatus" NOT NULL DEFAULT 'POSTED';

-- CreateIndex
CREATE INDEX "Post_scheduledFor_idx" ON "public"."Post"("scheduledFor");

-- CreateIndex
CREATE INDEX "Post_status_idx" ON "public"."Post"("status");
