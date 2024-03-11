-- Deploy compagnon-jdr:6.views to pg

BEGIN;

-- SELECT ALL CLASS

CREATE OR REPLACE VIEW class_list
AS
SELECT
C.id,
C.name,
(SELECT JSONB_AGG(DISTINCT JSONB_BUILD_OBJECT(
	'skills', (SELECT JSON_AGG(S.*)
			FROM skill AS S
			JOIN has_skill AS HS
				ON HS.skill_id = S.id
			JOIN proficiencies AS P
				ON P.id = HS.proficiencies_id
			WHERE P.id = C.id),
	'saving_throws', (SELECT JSON_AGG(ST.score)
			FROM saving_throw AS ST
			JOIN has_saving_throw AS HST
				ON HST.saving_throw_id = ST.id
			JOIN proficiencies AS P
				ON P.id = HST.proficiencies_id
			WHERE P.id = C.id)))) AS proficiencies,

(SELECT JSON_AGG(JSON_BUILD_OBJECT(
	'id', F.id,
	'feature_name', F.name,
	'description', F.description,
	'number_of_use', F.number_of_use,
	'reset', F.use_reset,
	'choices', (SELECT JSON_AGG(json_build_object(
				'id', FC.id,
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

---  SELECT ALL RACE

CREATE OR REPLACE VIEW race_list
AS
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
GROUP BY R.id
;


--- SELECT ALL BACKGROUNDS
CREATE OR REPLACE VIEW background_list
AS
SELECT
B.id,
B.name,
B.additional_language,
B.ability,
B.ability_description,
JSON_AGG(DISTINCT S.name) AS skill
FROM background AS B
JOIN (skill AS S
	JOIN has_skill AS HS
		ON HS.skill_id = S.id)
	ON B.id = HS.background_id
GROUP BY B.id
;

COMMIT;