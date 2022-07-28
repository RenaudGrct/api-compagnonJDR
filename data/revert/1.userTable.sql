-- Revert cjdr:1.userTable from pg

BEGIN;

TRUNCATE cjdr.user RESTART IDENTITY;
DROP TABLE cjdr.user;
DROP SCHEMA cjdr;

COMMIT;
