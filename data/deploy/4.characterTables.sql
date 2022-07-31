-- Deploy compagnon-jdr:4.characterTables to pg

BEGIN;

CREATE TABLE IF NOT EXISTS cjdr.ability_score (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    strength integer NOT NULL,
    dexterity integer NOT NULL,
    constitution integer NOT NULL,
    wisdom integer NOT NULL,
    charisma integer NOT NULL,
    intelligence integer NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.background (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    additional_language text COLLATE pg_catalog."default" NOT NULL,
    ability text COLLATE pg_catalog."default" NOT NULL,
    ability_description text COLLATE pg_catalog."default" NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.skill (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL  
);

CREATE TABLE IF NOT EXISTS cjdr.race (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    speed text COLLATE pg_catalog."default" NOT NULL,
    extra_language integer NOT NULL,
    night_vision boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.score_modifier (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    "number" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.has_score_modifier (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    race_id INT NOT NULL,
    CONSTRAINT fk_race FOREIGN KEY (race_id)
        REFERENCES cjdr.race (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    score_modifier_id INT NOT NULL,
    CONSTRAINT fk_score_modifier FOREIGN KEY (score_modifier_id)
        REFERENCES cjdr.score_modifier (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    UNIQUE (race_id, score_modifier_id)
);

CREATE TABLE IF NOT EXISTS cjdr.world_language (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.has_world_language (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    race_id INT NOT NULL,
    CONSTRAINT fk_race FOREIGN KEY (race_id)
        REFERENCES cjdr.race (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    world_language_id INT NOT NULL,
    CONSTRAINT fk_world_language FOREIGN KEY (world_language_id)
        REFERENCES cjdr.world_language (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    UNIQUE (race_id, world_language_id)
);

CREATE TABLE IF NOT EXISTS cjdr.racial_ability (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.has_racial_ability (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    race_id INT NOT NULL,
    CONSTRAINT fk_race FOREIGN KEY (race_id)
        REFERENCES cjdr.race (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    racial_ability_id INT NOT NULL,
    CONSTRAINT fk_racial_ability FOREIGN KEY (racial_ability_id)
        REFERENCES cjdr.racial_ability (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    UNIQUE (race_id, racial_ability_id)
);

CREATE TABLE IF NOT EXISTS cjdr.class (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    hit_points integer NOT NULL
);


CREATE TABLE IF NOT EXISTS cjdr.saving_throw (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL
);

CREATE TABLE IF NOT EXISTS cjdr.proficiencies (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    class_id INT NOT NULL,
    CONSTRAINT fk_class FOREIGN KEY (class_id)
        REFERENCES cjdr.class (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cjdr.has_saving_throw (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    saving_throw_id INT NOT NULL,
    CONSTRAINT fk_saving_throw FOREIGN KEY (saving_throw_id)
        REFERENCES cjdr.saving_throw (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    proficiencies_id INT NOT NULL,
    CONSTRAINT fk_proficiencies FOREIGN KEY (proficiencies_id)
        REFERENCES cjdr.proficiencies (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    UNIQUE (saving_throw_id, proficiencies_id)
);

CREATE TABLE IF NOT EXISTS cjdr.features (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    number_of_use text,
    reset text,
    class_id integer NOT NULL,
    CONSTRAINT fk_class FOREIGN KEY (class_id)
        REFERENCES cjdr.class (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cjdr.features_choice (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    features_id integer NOT NULL,
    CONSTRAINT fk_features FOREIGN KEY (features_id)
        REFERENCES cjdr.features (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cjdr.character (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    user_id INTEGER,
    guest_id INTEGER,
    race_id integer NOT NULL,
    class_id integer NOT NULL,
    ability_score_id integer NOT NULL,
    background_id integer NOT NULL,
    createdat timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp with time zone,
    CONSTRAINT fk_ability_score FOREIGN KEY (ability_score_id)
        REFERENCES cjdr.ability_score (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_background FOREIGN KEY (background_id)
        REFERENCES cjdr.background (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_class FOREIGN KEY (class_id)
        REFERENCES cjdr.class (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_race FOREIGN KEY (race_id)
        REFERENCES cjdr.race (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES cjdr."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cjdr.has_skill (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    skill_id INT NOT NULL,
    CONSTRAINT fk_skill FOREIGN KEY (skill_id)
        REFERENCES cjdr.skill (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    proficiencies_id INT NOT NULL,
    CONSTRAINT fk_proficiencies FOREIGN KEY (proficiencies_id)
        REFERENCES cjdr.proficiencies (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    background_id INT,
    CONSTRAINT fk_background FOREIGN KEY (background_id)
        REFERENCES cjdr.background (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    UNIQUE (skill_id, proficiencies_id, background_id)
);

-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cjdr TO iqnjpsmxnndhqm;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cjdr TO cjdr;

COMMIT;
