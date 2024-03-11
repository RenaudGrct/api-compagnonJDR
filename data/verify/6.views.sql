-- Verify compagnon-jdr:6.views on pg

BEGIN;

SELECT * FROM cjdr.class_list WHERE class_list.name = 'Paladin';
SELECT * FROM cjdr.race_list WHERE race_list.name = 'Drakéide';
SELECT * FROM cjdr.background_list WHERE background_list.name = 'Acolyte';

ROLLBACK;
