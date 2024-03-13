-- Verify compagnon-jdr:5.seedingTables on pg

BEGIN;

SELECT * FROM ""character"" WHERE name = 'BenOclock';

ROLLBACK;
