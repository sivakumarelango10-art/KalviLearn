-- CreateTable teamsync_webhook_deliveries
CREATE TABLE IF NOT EXISTS "teamsync_webhook_deliveries" (
    "id" TEXT NOT NULL,
    "event_id" VARCHAR(100) NOT NULL,
    "event_type" VARCHAR(50) NOT NULL,
    "ticket_id" VARCHAR(100),
    "ticket_number" VARCHAR(50),
    "source_reference_id" VARCHAR(50),
    "destination" VARCHAR(500) NOT NULL,
    "payload" JSONB NOT NULL,
    "status" VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    "attempt_count" INTEGER NOT NULL DEFAULT 0,
    "http_status" INTEGER,
    "last_attempt" TIMESTAMPTZ,
    "next_retry" TIMESTAMPTZ,
    "error" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMPTZ,

    CONSTRAINT "teamsync_webhook_deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "teamsync_webhook_deliveries_event_id_key" ON "teamsync_webhook_deliveries"("event_id");
CREATE INDEX IF NOT EXISTS "teamsync_webhook_deliveries_event_id_idx" ON "teamsync_webhook_deliveries"("event_id");
CREATE INDEX IF NOT EXISTS "teamsync_webhook_deliveries_ticket_id_idx" ON "teamsync_webhook_deliveries"("ticket_id");
CREATE INDEX IF NOT EXISTS "teamsync_webhook_deliveries_status_idx" ON "teamsync_webhook_deliveries"("status");
CREATE INDEX IF NOT EXISTS "teamsync_webhook_deliveries_created_at_idx" ON "teamsync_webhook_deliveries"("created_at");
