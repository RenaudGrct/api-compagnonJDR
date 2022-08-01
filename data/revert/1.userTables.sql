-- Revert compagnon-jdr:1.userTables from pg

BEGIN;

TRUNCATE cjdr.user RESTART IDENTITY;
DROP TABLE IF EXISTS cjdr.user;
DROP SCHEMA IF EXISTS cjdr CASCADE;

COMMIT;
