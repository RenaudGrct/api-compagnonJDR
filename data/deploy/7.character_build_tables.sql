-- Deploy compagnon-jdr:7.character_build_tables to pg

BEGIN;

ALTER TABLE IF EXISTS cjdr.guest
ADD is_guest BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE IF EXISTS cjdr."character"
DROP COLUMN "name",
DROP COLUMN race_id,
DROP COLUMN class_id,
DROP COLUMN background_id
;

CREATE TABLE IF NOT EXISTS cjdr.character_build(
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  race_id INTEGER NOT NULL,
  class_id INTEGER NOT NULL,
  feature_choice_id INTEGER NOT NULL,
  skill_id INTEGER NOT NULL,
  background_id INTEGER NOT NULL,
  CONSTRAINT fk_race FOREIGN KEY (race_id)
        REFERENCES cjdr.race (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
  CONSTRAINT fk_class FOREIGN KEY (class_id)
        REFERENCES cjdr."class" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
  CONSTRAINT fk_feature_choice FOREIGN KEY (feature_choice_id)
        REFERENCES cjdr.feature_choice (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
  CONSTRAINT fk_skill FOREIGN KEY (skill_id)
        REFERENCES cjdr.skill (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
  CONSTRAINT fk_background FOREIGN KEY (background_id)
        REFERENCES cjdr.background (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

ALTER TABLE IF EXISTS cjdr."character"
ADD character_build INTEGER
CONSTRAINT fk_character_build
      REFERENCES cjdr.character_build (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE CASCADE
;
COMMIT;
