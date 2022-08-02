-- Active: 1652370291034@@127.0.0.1@5432@cjdr@cjdr
-- SELECT ALL CLASS

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