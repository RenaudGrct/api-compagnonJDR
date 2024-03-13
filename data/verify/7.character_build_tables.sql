-- Verify compagnon-jdr:7.character_build_tables on pg

BEGIN;

SELECT * FROM character_build;
SELECT * FROM skill_chosen;
SELECT * FROM feature_choice_chosen;

ROLLBACK;
