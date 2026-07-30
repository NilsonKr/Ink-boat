-- CreateEnum
CREATE TYPE "AIProvider" AS ENUM ('GEMINI', 'ANTHROPIC');

-- CreateTable
CREATE TABLE "provider_keys" (
    "id" BIGSERIAL NOT NULL,
    "public_id" VARCHAR(12) NOT NULL,
    "provider" "AIProvider" NOT NULL,
    "label" TEXT NOT NULL,
    "ciphertext" BYTEA NOT NULL,
    "key_version" INTEGER NOT NULL DEFAULT 1,
    "last_4" VARCHAR(4) NOT NULL,
    "last_used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "provider_keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "provider_keys_public_id_key" ON "provider_keys"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "provider_keys_user_id_provider_key" ON "provider_keys"("user_id", "provider");

-- AddForeignKey
ALTER TABLE "provider_keys" ADD CONSTRAINT "provider_keys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
