-- Verify compagnon-jdr:3.refreshToken on pg

BEGIN;

UPDATE cjdr."user"
  SET refresh_token
  VALUES "!1doy/203koi54d@de26!#"
WHERE id = 1;

UPDATE cjdr.guest
  SET refresh_token
  VALUES "!1doy/203koi54d@de26!#"
WHERE id = 1;

ROLLBACK;
