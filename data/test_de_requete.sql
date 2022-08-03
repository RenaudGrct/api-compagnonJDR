-- Active: 1652370291034@@127.0.0.1@5432@cjdr@cjdr

-- NOUVEAU SELECT ALL CLASS SANS DISCTINCT

SELECT
C.name,
(SELECT JSONB_AGG(DISTINCT JSONB_BUILD_OBJECT(
	'skills', (SELECT JSON_AGG(S.name)
			FROM cjdr.skill AS S
			JOIN cjdr.has_skill AS HS
				ON HS.skill_id = S.id
			JOIN cjdr.proficiencies AS P
				ON P.id = HS.proficiencies_id
			WHERE P.id = C.id),
	'saving_throws', (SELECT JSON_AGG(ST.name)
			FROM cjdr.saving_throw AS ST
			JOIN cjdr.has_saving_throw AS HST
				ON HST.saving_throw_id = ST.id
			JOIN cjdr.proficiencies AS P
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
			FROM cjdr.features_choice AS FC
			WHERE FC.features_id = F.id)
	)))AS features

FROM cjdr.class AS C
JOIN cjdr.features AS F ON F.class_id = C.id
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
			FROM cjdr.features_choice AS FC
			WHERE FC.features_id = F.id)
	)))AS features

FROM cjdr.class AS C
JOIN cjdr.proficiencies AS P
ON C.id = P.class_id
JOIN (cjdr.saving_throw AS ST JOIN cjdr.has_saving_throw AS HST ON HST.saving_throw_id = ST.id)
  ON P.id = HST.proficiencies_id
JOIN (cjdr.skill AS S JOIN cjdr.has_skill AS HS ON HS.skill_id = S.id)
	ON P.id = HS.proficiencies_id
JOIN cjdr.features AS F
	ON C.id = F.class_id
GROUP BY C.name, C.hit_points
;