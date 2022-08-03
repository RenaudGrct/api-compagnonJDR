-- Deploy compagnon-jdr:1.userTables to pg

BEGIN;

CREATE SCHEMA IF NOT EXISTS cjdr;



CREATE TABLE IF NOT EXISTS cjdr."user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    avatarURL text,
    isguest BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT null
);

INSERT INTO cjdr."user" (email, username, password)
VALUES ('vecna@donjonsql.com', 'vecna', '$2b$10$hJIF5HQSe6aa19oHhKQbXuiTBgnXhw3gm2yT4tpQLmaIHZCO3qOEa');

COMMIT;
