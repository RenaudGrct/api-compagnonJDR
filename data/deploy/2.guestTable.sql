-- Deploy compagnon-jdr:2.guestTable to pg

BEGIN;

ALTER TABLE cjdr.user
DROP isguest;

CREATE TABLE IF NOT EXISTS cjdr.guest (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL,
  username text NOT NULL,
  password text NOT NULL,
  avatarURL text,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMPTZ DEFAULT null
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cjdr TO cjdr;


COMMIT;
