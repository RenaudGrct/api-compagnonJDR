-- Deploy compagnon-jdr:1.userTable to pg

BEGIN;
CREATE SCHEMA IF NOT EXISTS cjdr;

CREATE SCHEMA IF NOT EXISTS cjdr;

CREATE TABLE IF NOT EXISTS cjdr.user (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email text NOT NULL UNIQUE,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    avatarURL text,
    isGuest BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT null
);

INSERT INTO cjdr.user (email, username, password, isGuest)
  VALUES
    ('michel@hotmail.com', 'michoux', 'michouxdu95', FALSE),
    ('Gimli@moria.org', 'nainportant', '123456789', FALSE);

COMMIT;
