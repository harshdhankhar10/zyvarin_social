-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "next_billing_date" TIMESTAMP(3),
ADD COLUMN     "subscription_status" "public"."SubscriptionStatus" NOT NULL DEFAULT 'INACTIVE';
