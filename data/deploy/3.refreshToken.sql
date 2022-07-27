-- Deploy compagnon-jdr:3.refreshToken to pg

BEGIN;

ALTER TABLE cjdr.user
ADD refresh_token text;
ALTER TABLE cjdr.guest
ADD refresh_token TEXT DEFAULT null;

COMMIT;
