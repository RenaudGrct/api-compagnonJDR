-- Verify compagnon-jdr:2.guestTable on pg

BEGIN;

SELECT * FROM cjdr.guest;

ROLLBACK;
