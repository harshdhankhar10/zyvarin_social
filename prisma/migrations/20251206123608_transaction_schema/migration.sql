-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('SUBSCRIPTION_PAYMENT', 'REFUND', 'ADDON_PURCHASE');

-- CreateEnum
CREATE TYPE "public"."TransactionStatus" AS ENUM ('SUCCESS', 'FAILED', 'PENDING');

-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "currency" SET DEFAULT 'INR';

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "transactionType" "public"."TransactionType" NOT NULL DEFAULT 'SUBSCRIPTION_PAYMENT',
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "public"."TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "additionalInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "public"."Transaction"("userId");

-- CreateIndex
CREATE INDEX "Invoice_invoiceNumber_idx" ON "public"."Invoice"("invoiceNumber");

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
