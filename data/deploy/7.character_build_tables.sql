-- Deploy compagnon-jdr:7.character_build_tables to pg

BEGIN;

ALTER TABLE IF EXISTS cjdr.guest
ADD is_guest BOOLEAN NOT NULL DEFAULT true;


CREATE TABLE IF NOT EXISTS cjdr.skill_chosen(
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      character_id INTEGER NOT NULL,
      CONSTRAINT fk_character FOREIGN KEY (character_id)
            REFERENCES cjdr."character" (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
      skill_id INTEGER NOT NULL,
      CONSTRAINT fk_skill FOREIGN KEY (skill_id)
            REFERENCES cjdr.skill (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cjdr.feature_choice_chosen(
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      character_id INTEGER NOT NULL,
      CONSTRAINT fk_character FOREIGN KEY (character_id)
            REFERENCES cjdr."character" (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
      feature_choice_id INTEGER NOT NULL,
      CONSTRAINT fk_feature_choice FOREIGN KEY (feature_choice_id)
            REFERENCES cjdr.feature_choice (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
);

COMMIT;
