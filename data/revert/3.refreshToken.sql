-- Revert cjdr:3.refreshToken from pg

BEGIN;

ALTER TABLE cjdr.user
DROP refresh_token;
ALTER TABLE cjdr.guest
DROP refresh_token;

COMMIT;
