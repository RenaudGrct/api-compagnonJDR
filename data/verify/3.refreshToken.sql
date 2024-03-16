-- Verify compagnon-jdr:3.refreshToken on pg

BEGIN;

UPDATE "user"
  SET refresh_token
  VALUES "!1doy/203koi54d@de26!#"
WHERE id = 1;

UPDATE guest
  SET refresh_token
  VALUES "!1doy/203koi54d@de26!#"
WHERE id = 1;

ROLLBACK;
