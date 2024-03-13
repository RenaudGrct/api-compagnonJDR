-- Deploy compagnon-jdr:3.refreshToken to pg

BEGIN;

ALTER TABLE "user"
ADD refresh_token text;
ALTER TABLE guest
ADD refresh_token TEXT DEFAULT null;

COMMIT;
