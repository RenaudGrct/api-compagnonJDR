-- Revert compagnon-jdr:1.userTable from pg

BEGIN;

TRUNCATE cjdr.user RESTART IDENTITY;
DROP TABLE cjdr.user;
<<<<<<< HEAD
DROP SCHEMA cjdr;
=======

DROP SCHEMA cjdr;

>>>>>>> dev
COMMIT;
