-- Verify compagnon-jdr:1.userTables on pg

BEGIN;

INSERT INTO cjdr."user" (
  email,
  username,
  password)
VALUES (
  "vecna1@donjonsql.com",
  "vecna1",
  "archiliche"
);

ROLLBACK;
