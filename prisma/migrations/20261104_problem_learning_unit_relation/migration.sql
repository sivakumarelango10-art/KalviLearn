-- KalviLearn Problem LearningUnit Relation Migration
-- Adds learningUnitId to Problem, makes beltId optional, and creates index
-- Fully backwards-compatible, safe for production, idempotent, preserves all existing problems and test cases

-- 1. Add learningUnitId column to public."Problem" referencing public."LearningUnit"("id")
ALTER TABLE public."Problem" ADD COLUMN IF NOT EXISTS "learningUnitId" TEXT REFERENCES public."LearningUnit"("id") ON DELETE CASCADE;

-- 2. Allow beltId to be nullable for curriculum-bound questions (Practice coding problems keep their beltId)
ALTER TABLE public."Problem" ALTER COLUMN "beltId" DROP NOT NULL;

-- 3. Create index on learningUnitId for high-performance scoped question lookup
CREATE INDEX IF NOT EXISTS idx_problem_learningunitid ON public."Problem"("learningUnitId");

-- 4. Reload PostgREST schema cache so Supabase immediately recognizes the new column
NOTIFY pgrst, 'reload schema';
