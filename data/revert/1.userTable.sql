-- Revert compagnon-jdr:1.userTable from pg

BEGIN;

TRUNCATE public.user RESTART IDENTITY;
DROP TABLE public.user;

COMMIT;
