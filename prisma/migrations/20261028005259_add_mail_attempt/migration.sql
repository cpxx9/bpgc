-- CreateTable
CREATE TABLE "MailAttempt" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipHash" TEXT NOT NULL,

    CONSTRAINT "MailAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MailAttempt_ipHash_createdAt_idx" ON "MailAttempt"("ipHash", "createdAt");

-- CreateIndex
CREATE INDEX "MailAttempt_createdAt_idx" ON "MailAttempt"("createdAt");
