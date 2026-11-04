-- KalviLearn Curriculum Schema Repair Migration
-- Adds missing status, isActive, readingTimeMinutes, and updatedAt columns to Module and LearningUnit tables
-- Completely additive, safe for production, idempotent, preserves all existing curriculum data

-- 1. Add missing columns to public."Module"
ALTER TABLE public."Module" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public."Module" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'PUBLISHED';
ALTER TABLE public."Module" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- 2. Add missing columns to public."LearningUnit"
ALTER TABLE public."LearningUnit" ADD COLUMN IF NOT EXISTS "readingTimeMinutes" INTEGER NOT NULL DEFAULT 2;
ALTER TABLE public."LearningUnit" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public."LearningUnit" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'PUBLISHED';
ALTER TABLE public."LearningUnit" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());

-- 3. Create indices for filtered queries
CREATE INDEX IF NOT EXISTS idx_module_isactive ON public."Module"("isActive");
CREATE INDEX IF NOT EXISTS idx_learningunit_isactive ON public."LearningUnit"("isActive");

-- 4. Reload PostgREST schema cache so Supabase immediately recognizes the new columns
NOTIFY pgrst, 'reload schema';

