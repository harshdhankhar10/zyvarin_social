/*
  Warnings:

  - The values [DRAFT] on the enum `PostStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `postedUrl` on the `Post` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PostStatus_new" AS ENUM ('POSTED', 'FAILED', 'SCHEDULED');
ALTER TABLE "public"."Post" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Post" ALTER COLUMN "status" TYPE "public"."PostStatus_new" USING ("status"::text::"public"."PostStatus_new");
ALTER TYPE "public"."PostStatus" RENAME TO "PostStatus_old";
ALTER TYPE "public"."PostStatus_new" RENAME TO "PostStatus";
DROP TYPE "public"."PostStatus_old";
ALTER TABLE "public"."Post" ALTER COLUMN "status" SET DEFAULT 'POSTED';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "postedUrl";

-- CreateTable
CREATE TABLE "public"."Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "featuredImage" TEXT,
    "author" TEXT NOT NULL DEFAULT 'Zyvarin Team',
    "category" TEXT NOT NULL DEFAULT 'General',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "readTime" INTEGER NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlogComment" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlogUpvote" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogUpvote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlogDownvote" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogDownvote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_title_key" ON "public"."Blog"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "public"."Blog"("slug");

-- CreateIndex
CREATE INDEX "Blog_slug_idx" ON "public"."Blog"("slug");

-- CreateIndex
CREATE INDEX "Blog_published_idx" ON "public"."Blog"("published");

-- CreateIndex
CREATE INDEX "Blog_category_idx" ON "public"."Blog"("category");

-- CreateIndex
CREATE INDEX "Blog_createdAt_idx" ON "public"."Blog"("createdAt");

-- CreateIndex
CREATE INDEX "BlogComment_blogId_idx" ON "public"."BlogComment"("blogId");

-- CreateIndex
CREATE INDEX "BlogComment_userId_idx" ON "public"."BlogComment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogComment_blogId_userId_createdAt_key" ON "public"."BlogComment"("blogId", "userId", "createdAt");

-- CreateIndex
CREATE INDEX "BlogUpvote_blogId_idx" ON "public"."BlogUpvote"("blogId");

-- CreateIndex
CREATE INDEX "BlogUpvote_userId_idx" ON "public"."BlogUpvote"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogUpvote_blogId_userId_key" ON "public"."BlogUpvote"("blogId", "userId");

-- CreateIndex
CREATE INDEX "BlogDownvote_blogId_idx" ON "public"."BlogDownvote"("blogId");

-- CreateIndex
CREATE INDEX "BlogDownvote_userId_idx" ON "public"."BlogDownvote"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogDownvote_blogId_userId_key" ON "public"."BlogDownvote"("blogId", "userId");

-- AddForeignKey
ALTER TABLE "public"."BlogComment" ADD CONSTRAINT "BlogComment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogComment" ADD CONSTRAINT "BlogComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogUpvote" ADD CONSTRAINT "BlogUpvote_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogUpvote" ADD CONSTRAINT "BlogUpvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogDownvote" ADD CONSTRAINT "BlogDownvote_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogDownvote" ADD CONSTRAINT "BlogDownvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
