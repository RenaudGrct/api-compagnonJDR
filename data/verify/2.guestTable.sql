-- Verify compagnon-jdr:2.guestTable on pg

BEGIN;

INSERT INTO cjdr.guest (
  email,
  username,
  password)
VALUES (
  "vecna1@donjonsql.com",
  "vecna1",
  "archiliche"
);

ROLLBACK;
