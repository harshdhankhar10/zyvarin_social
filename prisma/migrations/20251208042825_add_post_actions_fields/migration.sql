-- AlterEnum
ALTER TYPE "public"."PostStatus" ADD VALUE 'DRAFT';

-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "postedUrl" TEXT;
