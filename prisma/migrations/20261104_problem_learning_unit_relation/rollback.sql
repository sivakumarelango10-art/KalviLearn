-- KalviLearn Problem LearningUnit Relation Rollback
-- Drops index and learningUnitId column from public."Problem"

DROP INDEX IF EXISTS idx_problem_learningunitid;
ALTER TABLE public."Problem" DROP COLUMN IF EXISTS "learningUnitId";
NOTIFY pgrst, 'reload schema';
