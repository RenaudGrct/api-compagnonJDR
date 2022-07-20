-- Verify compagnon-jdr:1.userTable on pg

BEGIN;

SELECT * FROM public.user;

ROLLBACK;
