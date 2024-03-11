-- Verify compagnon-jdr:5.seedingTables on pg

BEGIN;

SELECT * FROM cjdr."character" WHERE "character"."name" = 'BenOclock';

ROLLBACK;
