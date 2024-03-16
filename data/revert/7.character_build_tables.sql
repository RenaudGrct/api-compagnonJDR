-- Revert compagnon-jdr:7.character_build_tables from pg

BEGIN;

ALTER TABLE IF EXISTS guest
DROP is_guest;




DROP TABLE IF EXISTS
skill_chosen,
feature_choice_chosen
CASCADE
;

DROP VIEW IF EXISTS character_list;

COMMIT;
