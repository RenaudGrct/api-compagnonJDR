-- Revert compagnon-jdr:7.character_build_tables from pg

BEGIN;

ALTER TABLE IF EXISTS cjdr.guest
DROP is_guest;




DROP TABLE IF EXISTS
cjdr.skill_chosen,
cjdr.feature_choice_chosen
CASCADE
;

DROP VIEW IF EXISTS cjdr.character_list;

COMMIT;
