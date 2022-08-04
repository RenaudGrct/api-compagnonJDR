-- Verify compagnon-jdr:7.character_build_tables on pg

BEGIN;

SELECT * FROM cjdr.character_build;
SELECT * FROM cjdr.skill_chosen;
SELECT * FROM cjdr.feature_choice_chosen;

ROLLBACK;
