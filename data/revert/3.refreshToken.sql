-- Revert compagnon-jdr:3.refreshToken from pg

BEGIN;

ALTER TABLE "user"
DROP refresh_token;
ALTER TABLE guest
DROP refresh_token;

COMMIT;
