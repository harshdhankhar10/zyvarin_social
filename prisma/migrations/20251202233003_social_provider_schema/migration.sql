-- CreateTable
CREATE TABLE "public"."SocialProvider" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "providerUserId" TEXT,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "profileData" JSONB,
    "credentials" JSONB,
    "isConnected" BOOLEAN NOT NULL DEFAULT false,
    "connectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3),
    "disconnectedAt" TIMESTAMP(3),
    "connectionCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Post" (
    "id" TEXT NOT NULL,
    "socialProviderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'POSTED',
    "errorMessage" TEXT,
    "mediaUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SocialProvider_userId_idx" ON "public"."SocialProvider"("userId");

-- CreateIndex
CREATE INDEX "SocialProvider_provider_idx" ON "public"."SocialProvider"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "SocialProvider_provider_providerAccountId_key" ON "public"."SocialProvider"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialProvider_provider_userId_key" ON "public"."SocialProvider"("provider", "userId");

-- AddForeignKey
ALTER TABLE "public"."SocialProvider" ADD CONSTRAINT "SocialProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_socialProviderId_fkey" FOREIGN KEY ("socialProviderId") REFERENCES "public"."SocialProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
