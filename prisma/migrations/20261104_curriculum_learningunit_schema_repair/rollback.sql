-- Rollback for 20261104_curriculum_learningunit_schema_repair
ALTER TABLE public."LearningUnit" DROP COLUMN IF EXISTS "readingTimeMinutes";
ALTER TABLE public."LearningUnit" DROP COLUMN IF EXISTS "isActive";
ALTER TABLE public."LearningUnit" DROP COLUMN IF EXISTS "status";
ALTER TABLE public."LearningUnit" DROP COLUMN IF EXISTS "updatedAt";

ALTER TABLE public."Module" DROP COLUMN IF EXISTS "isActive";
ALTER TABLE public."Module" DROP COLUMN IF EXISTS "status";
ALTER TABLE public."Module" DROP COLUMN IF EXISTS "updatedAt";

NOTIFY pgrst, 'reload schema';

