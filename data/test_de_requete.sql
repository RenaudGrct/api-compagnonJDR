-- Active: 1652370291034@@127.0.0.1@5432@cjdr@cjdr

-- NOUVEAU SELECT ALL CLASS SANS DISCTINCT

SELECT
C.name,
(SELECT JSONB_AGG(DISTINCT JSONB_BUILD_OBJECT(
	'skills', (SELECT JSON_AGG(S.name)
			FROM skill AS S
			JOIN has_skill AS HS
				ON HS.skill_id = S.id
			JOIN proficiencies AS P
				ON P.id = HS.proficiencies_id
			WHERE P.id = C.id),
	'saving_throws', (SELECT JSON_AGG(ST.name)
			FROM saving_throw AS ST
			JOIN has_saving_throw AS HST
				ON HST.saving_throw_id = ST.id
			JOIN proficiencies AS P
				ON P.id = HST.proficiencies_id
			WHERE P.id = C.id)))) AS proficiencies,

(SELECT JSON_AGG(JSON_BUILD_OBJECT(
	'feature_name', F.name,
	'description', F.description,
	'number_of_use', F.number_of_use,
	'reset', F.reset,
	'choices', (SELECT JSON_AGG(json_build_object(
				'name', FC.name,
				'description', FC.description
			))
			FROM feature_choice AS FC
			WHERE FC.feature_id = F.id)
	)))AS feature

FROM class AS C
JOIN feature AS F ON F.class_id = C.id
GROUP BY C.id
;


---- ANCIEN SELECT ALL CLASSES AVEC DISTINC

SELECT
C.name,
C.hit_points,
JSON_AGG(DISTINCT ST.name) AS saving_throw,
JSON_AGG(DISTINCT S.name) AS skill,

(SELECT JSONB_AGG(DISTINCT JSONB_BUILD_OBJECT(
	'feature_name', F.name,
	'description', F.description,
	'number_of_use', F.number_of_use,
	'reset', F.reset,
	'choice', (SELECT JSON_AGG(json_build_object(
				'name', FC.name,
				'description', FC.description
			))
			FROM feature_choice AS FC
			WHERE FC.feature_id = F.id)
	)))AS feature

FROM class AS C
JOIN proficiencies AS P
ON C.id = P.class_id
JOIN (saving_throw AS ST JOIN has_saving_throw AS HST ON HST.saving_throw_id = ST.id)
  ON P.id = HST.proficiencies_id
JOIN (skill AS S JOIN has_skill AS HS ON HS.skill_id = S.id)
	ON P.id = HS.proficiencies_id
JOIN feature AS F
	ON C.id = F.class_id
GROUP BY C.name, C.hit_points
;


INSERT INTO character
(
	name,
	user_id,
	race_id,
	class_id,
	ability_score_id,
	background_id
	)
VALUES ('Norixius Balasar', 2, 1, 2, 1, 2)
;

INSERT INTO skill_chosen (character_id, skill_id)
VALUES
(5, 5),
(5, 6)
;

INSERT INTO feature_choice_chosen (character_id, feature_choice_id)
VALUES
(5, 2)
;


SELECT
C.id,

(SELECT JSON_BUILD_OBJECT(
	'id', Cl.id,
	'name',Cl.name,
	'proficiencies', JSONB_AGG(DISTINCT JSONB_BUILD_OBJECT(
	'skills', (SELECT JSON_AGG(S.*)
			FROM skill AS S
			JOIN has_skill AS HS
				ON HS.skill_id = S.id
			JOIN proficiencies AS P
				ON P.id = HS.proficiencies_id
			WHERE P.id = Cl.id),
	'saving_throws', (SELECT JSON_AGG(ST.score)
			FROM saving_throw AS ST
			JOIN has_saving_throw AS HST
				ON HST.saving_throw_id = ST.id
			JOIN proficiencies AS P
				ON P.id = HST.proficiencies_id
			WHERE P.id = Cl.id)))) AS proficiencies
	FROM class AS Cl
	GROUP BY Cl.id)

FROM character AS C
WHERE user_id = 2
;

CREATE OR REPLACE VIEW character_list
AS
SELECT
C.id,
C.name,
C.user_id,
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
	'force', score.strength,
	'dextérité', score.dexterity,
	'constitution', score.constitution,
	'sagesse', score.wisdom,
	'intélligence', score.intelligence,
	'charisme', score.charisma)
	FROM ability_score AS score
	WHERE score.id = C.ability_score_id) AS ability_score

FROM character AS C


create or replace procedure proc_race_list(raceName text)
language plpgsql
AS $$
BEGIN
SELECT
R.id,
R.name,
R.speed,
R.extra_language,
R.night_vision,
(SELECT JSON_AGG(DISTINCT JSONB_BUILD_OBJECT(
	'score_name', SM.name,
	'score_number', SM.number))
	FROM score_modifier AS SM
	JOIN has_score_modifier AS HSM
		ON HSM.score_modifier_id = SM.id
	WHERE R.id = HSM.race_id ) AS score_modifier,
JSON_AGG(DISTINCT WL.name) AS languages,
(SELECT JSON_AGG(JSON_BUILD_OBJECT(
	'racial_ability_name', RA.name,
	'description', RA.description))
	FROM racial_ability AS RA
	JOIN has_racial_ability AS HRA
		ON HRA.race_id = RA.id
	WHERE R.id = HRA.race_id) AS racial_ability
FROM race AS R
JOIN (world_language AS WL
	JOIN has_world_language AS HWL
		ON HWL.world_language_id = WL.id)
  ON R.id = HWL.race_id
WHERE R.name = 'Drakéide'
GROUP BY R.id;
COMMIT;
END;$$;
CALL proc_race_list('Drakéide');