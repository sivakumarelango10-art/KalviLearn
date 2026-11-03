-- Add the theory/concept field consumed by Super Admin curriculum management.
-- Keep it nullable for existing and newly created units that have no concept text.
ALTER TABLE public."LearningUnit"
  ADD COLUMN IF NOT EXISTS "concept" TEXT;

-- Preserve existing lesson content as the initial concept description.
UPDATE public."LearningUnit"
SET "concept" = "content"
WHERE "concept" IS NULL
  AND "content" IS NOT NULL;

-- Refresh PostgREST's schema cache so the new column is immediately discoverable.
NOTIFY pgrst, 'reload schema';
