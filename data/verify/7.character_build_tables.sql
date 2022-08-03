-- Verify compagnon-jdr:7.character_build_tables on pg

BEGIN;

SELECT * FROM cjdr.character_build;

ROLLBACK;
