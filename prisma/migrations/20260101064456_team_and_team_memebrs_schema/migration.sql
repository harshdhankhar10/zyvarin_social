-- CreateTable
CREATE TABLE "public"."TeamInvite" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."TeamMemberRole" NOT NULL DEFAULT 'VIEWER',
    "token" TEXT NOT NULL,
    "status" "public"."TeamInvitationStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "invitedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamInvite_token_key" ON "public"."TeamInvite"("token");

-- CreateIndex
CREATE INDEX "TeamInvite_token_idx" ON "public"."TeamInvite"("token");

-- CreateIndex
CREATE INDEX "TeamInvite_email_idx" ON "public"."TeamInvite"("email");

-- CreateIndex
CREATE INDEX "TeamInvite_teamId_idx" ON "public"."TeamInvite"("teamId");

-- AddForeignKey
ALTER TABLE "public"."TeamInvite" ADD CONSTRAINT "TeamInvite_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamInvite" ADD CONSTRAINT "TeamInvite_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
