-- Deploy compagnon-jdr:1.userTable to pg

BEGIN;
CREATE SCHEMA IF NOT EXISTS cjdr;
GRANT USAGE ON SCHEMA cjdr TO iqnjpsmxnndhqm;
-- GRANT USAGE ON SCHEMA cjdr TO cjdr;


CREATE TABLE IF NOT EXISTS cjdr.user (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    avatarURL text,
    isguest BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT null
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cjdr TO iqnjpsmxnndhqm;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cjdr TO cjdr;

-- CREATE TRIGGER change_guest_status
-- AFTER UPDATE ON cjdr.user
-- WHEN (OLD.isguest = TRUE)
-- BEGIN
--   UPDATE cjdr.user
--   SET isguest = FALSE
--   WHERE id IN (SELECT DISTINCT id FROM inserted)
-- END;


COMMIT;
