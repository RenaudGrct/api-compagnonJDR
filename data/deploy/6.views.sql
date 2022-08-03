-- Deploy compagnon-jdr:6.views to pg

BEGIN;

-- SELECT ALL CLASS

CREATE OR REPLACE VIEW cjdr.class_list
AS
SELECT
C."name",
(SELECT JSONB_AGG(DISTINCT JSONB_BUILD_OBJECT(
	'skills', (SELECT JSON_AGG(S.*)
			FROM cjdr.skill AS S
			JOIN cjdr.has_skill AS HS
				ON HS.skill_id = S.id
			JOIN cjdr.proficiencies AS P
				ON P.id = HS.proficiencies_id
			WHERE P.id = C.id),
	'saving_throws', (SELECT JSON_AGG(ST.score)
			FROM cjdr.saving_throw AS ST
			JOIN cjdr.has_saving_throw AS HST
				ON HST.saving_throw_id = ST.id
			JOIN cjdr.proficiencies AS P
				ON P.id = HST.proficiencies_id
			WHERE P.id = C.id)))) AS proficiencies,

(SELECT JSON_AGG(JSON_BUILD_OBJECT(
	'id', F.id,
	'feature_name', F."name",
	'description', F."description",
	'number_of_use', F.number_of_use,
	'reset', F.use_reset,
	'choices', (SELECT JSON_AGG(json_build_object(
				'id', FC.id,
				'name', FC."name",
				'description', FC."description"
			))
			FROM cjdr.features_choice AS FC
			WHERE FC.features_id = F.id)
	)))AS features

FROM cjdr."class" AS C
JOIN cjdr.features AS F ON F.class_id = C.id
GROUP BY C.id
;

---  SELECT ALL RACE

CREATE OR REPLACE VIEW cjdr.race_list
AS
SELECT
R.id,
R."name",
R.speed,
R.extra_language,
R.night_vision,
(SELECT JSON_AGG(DISTINCT JSONB_BUILD_OBJECT(
	'score_name', SM."name",
	'score_number', SM."number"))
	FROM cjdr.score_modifier AS SM
	JOIN cjdr.has_score_modifier AS HSM
		ON HSM.score_modifier_id = SM.id
	WHERE R.id = HSM.race_id ) AS score_modifier,
JSON_AGG(DISTINCT WL."name") AS languages,
(SELECT JSON_AGG(JSON_BUILD_OBJECT(
	'racial_ability_name', RA."name",
	'description', RA."description"))
	FROM cjdr.racial_ability AS RA
	JOIN cjdr.has_racial_ability AS HRA
		ON HRA.race_id = RA.id
	WHERE R.id = HRA.race_id) AS racial_ability
FROM cjdr.race AS R
JOIN (cjdr.world_language AS WL
	JOIN cjdr.has_world_language AS HWL
		ON HWL.world_language_id = WL.id)
  ON R.id = HWL.race_id
GROUP BY R.id
;


--- SELECT ALL BACKGROUNDS
CREATE OR REPLACE VIEW cjdr.background_list
AS
SELECT
B."name",
B.additional_language,
B.ability,
B.ability_description,
JSON_AGG(DISTINCT S."name") AS skill
FROM cjdr.background AS B
JOIN (cjdr.skill AS S
	JOIN cjdr.has_skill AS HS
		ON HS.skill_id = S.id)
	ON B.id = HS.background_id
GROUP BY B.id
;

COMMIT;
