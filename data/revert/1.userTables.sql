-- Revert compagnon-jdr:1.userTables from pg

BEGIN;

TRUNCATE user RESTART IDENTITY;
DROP TABLE IF EXISTS user;

COMMIT;
