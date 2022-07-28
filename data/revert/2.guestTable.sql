-- Revert compagnon-jdr:2.guestTable from pg

BEGIN;

ALTER TABLE cjdr.user
ADD isguest BOOLEAN NOT NULL DEFAULT FALSE;

TRUNCATE cjdr.guest RESTART IDENTITY;
DROP TABLE cjdr.guest;

COMMIT;
