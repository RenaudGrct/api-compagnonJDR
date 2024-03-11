-- Revert compagnon-jdr:2.guestTable from pg

BEGIN;

ALTER TABLE user
ADD isguest BOOLEAN NOT NULL DEFAULT FALSE;

TRUNCATE guest RESTART IDENTITY;
DROP TABLE IF EXISTS guest;

COMMIT;
