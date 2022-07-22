-- Verify compagnon-jdr:1.userTable on pg

BEGIN;

SELECT * FROM cjdr.user;

ROLLBACK;
