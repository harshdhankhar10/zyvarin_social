/*
  Warnings:

  - A unique constraint covering the columns `[socialProviderId,platformPostId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "platformPostId" TEXT;

-- CreateIndex
CREATE INDEX "Post_platformPostId_idx" ON "public"."Post"("platformPostId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_socialProviderId_platformPostId_key" ON "public"."Post"("socialProviderId", "platformPostId");
