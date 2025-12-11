-- CreateTable
CREATE TABLE "public"."SocialMetric" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "comments" INTEGER NOT NULL DEFAULT 0,
    "shares" INTEGER NOT NULL DEFAULT 0,
    "ctr" DOUBLE PRECISION,
    "videoViews" INTEGER,
    "followsGained" INTEGER,
    "collectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialMetric_postId_key" ON "public"."SocialMetric"("postId");

-- CreateIndex
CREATE INDEX "SocialMetric_platform_collectedAt_idx" ON "public"."SocialMetric"("platform", "collectedAt");

-- AddForeignKey
ALTER TABLE "public"."SocialMetric" ADD CONSTRAINT "SocialMetric_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
