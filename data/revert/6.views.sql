-- Revert compagnon-jdr:6.views from pg

BEGIN;

DROP VIEW IF EXISTS
cjdr.background_list,
cjdr.class_list,
cjdr.race_list
CASCADE;

COMMIT;
