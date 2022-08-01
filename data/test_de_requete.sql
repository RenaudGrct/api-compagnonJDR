-- Active: 1652370291034@@127.0.0.1@5432@cjdr@cjdr
-- SELECT ALL CLASS

CREATE OR REPLACE VIEW cjdr.class_list
AS
SELECT
class.name,
class.hit_points,
Prof.name AS proficiencies,
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
			FROM cjdr.features_choice AS FC
			WHERE FC.features_id = F.id)
	)))AS features
FROM cjdr.class
JOIN cjdr.proficiencies AS Prof
ON class.id = Prof.class_id
JOIN (cjdr.saving_throw AS ST JOIN cjdr.has_saving_throw AS HST ON HST.saving_throw_id = ST.id)
  ON Prof.id = HST.proficiencies_id
JOIN (cjdr.skill AS S JOIN cjdr.has_skill AS HS ON HS.skill_id = S.id)
	ON Prof.id = HS.proficiencies_id
JOIN cjdr.features AS F
	ON class.id = F.class_id
GROUP BY class.name, class.hit_points, Prof.name
;

---  SELECT ALL RACE

CREATE OR REPLACE VIEW cjdr.race_list
AS
SELECT
race.name,
race.speed,
race.extra_language,
race.night_vision,
JSON_AGG(DISTINCT SM.*) AS score_modifier,
JSON_AGG(DISTINCT WL.name) AS languages,
JSON_AGG(DISTINCT RA.* ) AS racial_ability
FROM cjdr.race
JOIN (cjdr.score_modifier AS SM JOIN cjdr.has_score_modifier AS HSM ON HSM.score_modifier_id = SM.id)
ON race.id = HSM.race_id
JOIN (cjdr.world_language AS WL JOIN cjdr.has_world_language AS HWL ON HWL.world_language_id = WL.id)
  ON race.id = HWL.race_id
JOIN (cjdr.racial_ability AS RA JOIN cjdr.has_racial_ability AS HRA ON HRA.racial_ability_id = RA.id)
	ON race.id = HRA.race_id
GROUP BY race.name, race.speed, race.extra_language, race.night_vision
;

--- SELECT ALL BACKGROUNDS

CREATE OR REPLACE VIEW background_list
SELECT
background.name,
background.additional_language,
background.ability,
background.ability_description,
JSON_AGG(DISTINCT S.name) AS skill
FROM cjdr.background
JOIN (cjdr.skill AS S JOIN cjdr.has_skill AS HS ON HS.skill_id = S.id)
	ON background.id = HS.background_id
GROUP BY background.name, background.additional_language, background.ability, background.ability_description
;