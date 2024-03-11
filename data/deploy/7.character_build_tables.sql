-- Active: 1652370291034@@127.0.0.1@5432@cjdr@cjdr
-- Deploy compagnon-jdr:7.character_build_tables to pg

BEGIN;

ALTER TABLE IF EXISTS guest
ADD is_guest BOOLEAN NOT NULL DEFAULT true;


CREATE TABLE IF NOT EXISTS skill_chosen(
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      character_id INTEGER NOT NULL,
      CONSTRAINT fk_character FOREIGN KEY (character_id)
            REFERENCES character (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
      skill_id INTEGER NOT NULL,
      CONSTRAINT fk_skill FOREIGN KEY (skill_id)
            REFERENCES skill (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS feature_choice_chosen(
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      character_id INTEGER NOT NULL,
      CONSTRAINT fk_character FOREIGN KEY (character_id)
            REFERENCES character (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
      feature_choice_id INTEGER NOT NULL,
      CONSTRAINT fk_feature_choice FOREIGN KEY (feature_choice_id)
            REFERENCES feature_choice (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
);

CREATE OR REPLACE VIEW character_list
AS
SELECT
C.id,
C.name,
C.user_id,
C.guest_id,
(SELECT JSON_BUILD_OBJECT(
	'id', Cl.id,
	'name',Cl.name,
	
	'proficiencies', JSONB_AGG(DISTINCT JSONB_BUILD_OBJECT(
		'skills', (SELECT JSON_AGG(S.*)
			FROM skill AS S
			JOIN skill_chosen AS SC
				ON SC.skill_id = S.id
			WHERE C.id = SC.character_id),
		'saving_throws', (SELECT JSON_AGG(ST.score)
			FROM saving_throw AS ST
			JOIN has_saving_throw AS HST
				ON HST.saving_throw_id = ST.id
			JOIN proficiencies AS P
				ON P.id = HST.proficiencies_id
			WHERE P.id = Cl.id))),
	'features', (SELECT JSON_AGG(JSON_BUILD_OBJECT(
		'name', F.name,
		'description', F.description,
		'choice', (SELECT JSON_AGG(FC.*)
				FROM feature_choice AS FC
				JOIN feature_choice_chosen AS FCC
					ON FCC.feature_choice_id = FC.id
				WHERE C.id = FCC.character_id AND F.id = FC.feature_id)))
			FROM feature AS F	 
			WHERE F.class_id = Cl.id))
	
	FROM class AS Cl
	WHERE Cl.id = C.class_id
	GROUP BY Cl.id) AS class,

(SELECT JSON_BUILD_OBJECT(
	'id', R.id,
	'name', R.name,
	'speed', R.speed,
	'extra_language', R.extra_language,
	'night_vision', R.night_vision,
	
	'score_modifier', (SELECT JSON_AGG(DISTINCT JSONB_BUILD_OBJECT(
		'score_name', SM.name,
		'score_number', SM.number))
		FROM score_modifier AS SM
		JOIN has_score_modifier AS HSM
			ON HSM.score_modifier_id = SM.id
		WHERE R.id = HSM.race_id),
	
	'language', JSON_AGG(DISTINCT WL.name),

	'racial_ability', (SELECT JSON_AGG(DISTINCT JSONB_BUILD_OBJECT(
		'racial_ability_name', RA.name,
		'description', RA.description))
		FROM racial_ability AS RA
		JOIN has_racial_ability AS HRA
			ON HRA.racial_ability_id = RA.id
		WHERE R.id = HRA.race_id))

	FROM race AS R
	JOIN has_world_language AS HWL
		ON HWL.race_id = R.id
	JOIN world_language AS WL
		ON WL.id = HWL.world_language_id
	WHERE C.race_id = R.id
	GROUP BY R.id) AS race,
	
(SELECT JSON_BUILD_OBJECT(
	'id', B.id,
	'name', B.name,
	'additional_language', B.additional_language,
	'ability', B.ability,
	'ability_description', B.ability_description,
	'skill', JSON_AGG(DISTINCT S.name))
	FROM background AS B
	JOIN has_skill AS HS
		ON HS.background_id = B.id
	JOIN skill AS S
		ON S.id = HS.skill_id
	WHERE B.id = C.background_id
	GROUP BY B.id) AS background,

(SELECT JSON_BUILD_OBJECT(
	'strength', score.strength,
	'dexterity', score.dexterity,
	'constitution', score.constitution,
	'wisdom', score.wisdom,
	'intelligence', score.intelligence,
	'charisma', score.charisma)
	FROM ability_score AS score
	WHERE score.id = C.ability_score_id) AS ability_score

FROM "character" AS C;

COMMIT;
