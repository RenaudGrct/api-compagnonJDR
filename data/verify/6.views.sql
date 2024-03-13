-- Verify compagnon-jdr:6.views on pg

BEGIN;

SELECT * FROM class_list WHERE class_list.name = 'Paladin';
SELECT * FROM race_list WHERE race_list.name = 'Drakéide';
SELECT * FROM background_list WHERE background_list.name = 'Acolyte';

ROLLBACK;
