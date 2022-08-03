-- Revert compagnon-jdr:7.character_build_tables from pg

BEGIN;

ALTER TABLE IF EXISTS cjdr.guest
DROP is_guest;

ALTER TABLE cjdr."character"
DROP character_build;

ALTER TABLE IF EXISTS cjdr."character"
ADD "name" TEXT NOT NULL,
ADD race_id INTEGER NOT NULL
CONSTRAINT fk_race
REFERENCES cjdr.race (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE,
ADD class_id INTEGER NOT NULL
CONSTRAINT fk_class
REFERENCES cjdr."class" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE,
ADD background_id INTEGER NOT NULL
CONSTRAINT fk_background
REFERENCES cjdr.background (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
;

DROP TABLE IF EXISTS cjdr.character_build; 

COMMIT;
