-- Deploy compagnon-jdr:4.characterTables to pg

BEGIN;


CREATE TABLE IF NOT EXISTS cjdr.ability_score (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    strength integer NOT NULL,
    dexterity integer NOT NULL,
    constitution integer NOT NULL,
    wisdom integer NOT NULL,
    charisma integer NOT NULL,
    intelligence integer NOT NULL,
    CONSTRAINT ability_score_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cjdr.background (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    additional_language text COLLATE pg_catalog."default" NOT NULL,
    ability text COLLATE pg_catalog."default" NOT NULL,
    ability_description text COLLATE pg_catalog."default" NOT NULL,
    skill text COLLATE pg_catalog."default" NOT NULL,
    money integer,
    CONSTRAINT background_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cjdr.skill (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT skill_pkey PRIMARY KEY (id)
  
);

CREATE TABLE IF NOT EXISTS cjdr.race (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   name text COLLATE pg_catalog."default" NOT NULL,
    speed text COLLATE pg_catalog."default" NOT NULL,
    ability_score_modifier integer NOT NULL,
    extra_spell text COLLATE pg_catalog."default" NOT NULL,
    extra_language boolean NOT NULL,
    language text COLLATE pg_catalog."default" NOT NULL,
    damage_resistance text COLLATE pg_catalog."default" NOT NULL,
    ascending text COLLATE pg_catalog."default",
    night_vision boolean NOT NULL,
    racial_ability text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT race_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cjdr.score_modifier (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    "number" integer NOT NULL,
    CONSTRAINT score_modifier_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cjdr.world_language (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT world_language_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cjdr.racial_ability (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT racial_ability_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cjdr.class (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    starting_spell text COLLATE pg_catalog."default" NOT NULL,
    proficiencies integer NOT NULL,
    hit_points integer NOT NULL,
    features integer NOT NULL,
    CONSTRAINT class_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cjdr.spell (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    race_id integer,
    CONSTRAINT spell_pkey PRIMARY KEY (id),
    CONSTRAINT race_id FOREIGN KEY (race_id)
        REFERENCES cjdr.race (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS cjdr.saving_throw (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT saving_throw_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cjdr.proficiencies (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    saving_throw integer NOT NULL,
    skills integer NOT NULL,
    class_id integer,
    CONSTRAINT proficiencies_pkey PRIMARY KEY (id),
    CONSTRAINT class_id FOREIGN KEY (class_id)
        REFERENCES cjdr.class (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE IF NOT EXISTS cjdr.features (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    features_choice integer NOT NULL,
    class_id integer NOT NULL,
    CONSTRAINT features_pkey PRIMARY KEY (id),
    CONSTRAINT class_id FOREIGN KEY (class_id)
        REFERENCES cjdr.class (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS cjdr.features_choice (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    class_id integer NOT NULL,
    CONSTRAINT features_choice_pkey PRIMARY KEY (id),
    CONSTRAINT class_id FOREIGN KEY (class_id)
        REFERENCES cjdr.class (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS cjdr.character (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    user_id integer NOT NULL,
    race_id integer NOT NULL,
    class_id integer NOT NULL,
    ability_score_id integer NOT NULL,
    background_id integer NOT NULL,
    money integer,
    createdat timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp with time zone,
    CONSTRAINT character_pkey PRIMARY KEY (id),
    CONSTRAINT ability_score_id FOREIGN KEY (ability_score_id)
        REFERENCES cjdr.ability_score (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT background_id FOREIGN KEY (background_id)
        REFERENCES cjdr.background (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT class_id FOREIGN KEY (class_id)
        REFERENCES cjdr.class (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT race_id FOREIGN KEY (race_id)
        REFERENCES cjdr.race (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES cjdr."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cjdr TO cjdr;

COMMIT;
