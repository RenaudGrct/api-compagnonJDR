-- Revert compagnon-jdr:7.character_build_tables from pg

BEGIN;

ALTER TABLE IF EXISTS cjdr.guest
DROP is_guest;

ALTER TABLE cjdr."character"
DROP character_build_id;

ALTER TABLE IF EXISTS cjdr."character"
ADD
"name" TEXT NOT NULL,
race_id INTEGER NOT NULL,
class_id INTEGER NOT NULL,
background_id INTEGER NOT NULL
CONSTRAINT fk_user FOREIGN KEY ("user_id")
    REFERENCES cjdr."user" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE,
CONSTRAINT fk_guest FOREIGN KEY (guest_id)
    REFERENCES cjdr.guest (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE,
CONSTRAINT fk_race FOREIGN KEY (race_id)
    REFERENCES cjdr.race (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE,
CONSTRAINT fk_class FOREIGN KEY (class_id)
    REFERENCES cjdr."class" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE,
CONSTRAINT fk_background FOREIGN KEY (background_id)
    REFERENCES cjdr.background (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
;

DROP TABLE IF EXISTS cjdr.character_build; 

COMMIT;
