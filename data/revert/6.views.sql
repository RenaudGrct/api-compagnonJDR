-- Revert compagnon-jdr:6.views from pg

BEGIN;

DROP VIEW IF EXISTS
background_list,
class_list,
race_list
CASCADE;

COMMIT;
