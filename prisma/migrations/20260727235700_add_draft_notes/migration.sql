-- CreateTable
CREATE TABLE "notes" (
    "id" BIGSERIAL NOT NULL,
    "public_id" VARCHAR(12) NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "draft_id" BIGINT NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notes_public_id_key" ON "notes"("public_id");

-- CreateIndex
CREATE INDEX "notes_draft_id_created_at_idx" ON "notes"("draft_id", "created_at");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_draft_id_fkey" FOREIGN KEY ("draft_id") REFERENCES "drafts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
