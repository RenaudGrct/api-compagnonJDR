-- Deploy compagnon-jdr:4.characterTables to pg

BEGIN;

CREATE TABLE IF NOT EXISTS cjdr.ability_score (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    strength INTEGER NOT NULL,
    dexterity INTEGER NOT NULL,
    constitution INTEGER NOT NULL,
    wisdom INTEGER NOT NULL,
    charisma INTEGER NOT NULL,
    intelligence INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.background (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    additional_language TEXT NOT NULL,
    ability TEXT NOT NULL,
    ability_description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.skill (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL  
);

CREATE TABLE IF NOT EXISTS cjdr.race (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    speed TEXT NOT NULL,
    extra_language INTEGER NOT NULL,
    night_vision boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.score_modifier (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.has_score_modifier (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    race_id INTEGER NOT NULL,
    CONSTRAINT fk_race FOREIGN KEY (race_id)
        REFERENCES cjdr.race (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    score_modifier_id INT NOT NULL,
    CONSTRAINT fk_score_modifier FOREIGN KEY (score_modifier_id)
        REFERENCES cjdr.score_modifier (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    UNIQUE (race_id, score_modifier_id)
);

CREATE TABLE IF NOT EXISTS cjdr.world_language (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.has_world_language (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    race_id INTEGER NOT NULL,
    CONSTRAINT fk_race FOREIGN KEY (race_id)
        REFERENCES cjdr.race (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    world_language_id INTEGER NOT NULL,
    CONSTRAINT fk_world_language FOREIGN KEY (world_language_id)
        REFERENCES cjdr.world_language (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    UNIQUE (race_id, world_language_id)
);

CREATE TABLE IF NOT EXISTS cjdr.racial_ability (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.has_racial_ability (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    race_id INTEGER NOT NULL,
    CONSTRAINT fk_race FOREIGN KEY (race_id)
        REFERENCES cjdr.race (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    racial_ability_id INT NOT NULL,
    CONSTRAINT fk_racial_ability FOREIGN KEY (racial_ability_id)
        REFERENCES cjdr.racial_ability (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    UNIQUE (race_id, racial_ability_id)
);

CREATE TABLE IF NOT EXISTS cjdr."class" (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    hit_points INTEGER NOT NULL
);


CREATE TABLE IF NOT EXISTS cjdr.saving_throw (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    score TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.proficiencies (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    class_id INTEGER NOT NULL,
    CONSTRAINT fk_class FOREIGN KEY (class_id)
        REFERENCES cjdr.class (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cjdr.has_saving_throw (
    saving_throw_id INTEGER NOT NULL,
    CONSTRAINT fk_saving_throw FOREIGN KEY (saving_throw_id)
        REFERENCES cjdr.saving_throw (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    proficiencies_id INTEGER NOT NULL,
    CONSTRAINT fk_proficiencies FOREIGN KEY (proficiencies_id)
        REFERENCES cjdr.proficiencies (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    PRIMARY KEY (saving_throw_id, proficiencies_id)
);

CREATE TABLE IF NOT EXISTS cjdr.feature (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    number_of_use TEXT,
    use_reset TEXT,
    class_id INTEGER NOT NULL,
    CONSTRAINT fk_class FOREIGN KEY (class_id)
        REFERENCES cjdr.class (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cjdr.feature_choice (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    feature_id INTEGER NOT NULL,
    CONSTRAINT fk_feature FOREIGN KEY (feature_id)
        REFERENCES cjdr.feature (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cjdr."character" (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "user_id" INTEGER,
    guest_id INTEGER,
    race_id INTEGER NOT NULL,
    class_id INTEGER NOT NULL,
    background_id INTEGER NOT NULL,
    ability_score_id INTEGER NOT NULL,
    createdat timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp with time zone,
    CONSTRAINT fk_ability_score FOREIGN KEY (ability_score_id)
        REFERENCES cjdr.ability_score (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_background FOREIGN KEY (background_id)
        REFERENCES cjdr.background (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_class FOREIGN KEY (class_id)
        REFERENCES cjdr.class (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_race FOREIGN KEY (race_id)
        REFERENCES cjdr.race (id) 
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES cjdr."user" (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_guest FOREIGN KEY (guest_id)
        REFERENCES cjdr.guest (id)
);

CREATE TABLE IF NOT EXISTS cjdr.has_skill (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    skill_id INTEGER NOT NULL,
    CONSTRAINT fk_skill FOREIGN KEY (skill_id)
        REFERENCES cjdr.skill (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    proficiencies_id INT NOT NULL,
    CONSTRAINT fk_proficiencies FOREIGN KEY (proficiencies_id)
        REFERENCES cjdr.proficiencies (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    background_id INT,
    CONSTRAINT fk_background FOREIGN KEY (background_id)
        REFERENCES cjdr.background (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    UNIQUE (skill_id, proficiencies_id, background_id)
);


COMMIT;
