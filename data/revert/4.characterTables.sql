-- Revert compagnon-jdr:4.characterTables from pg

BEGIN;

DROP TABLE IF EXISTS
cjdr."character",
cjdr.ability_score,
cjdr.background,
cjdr.skill,
cjdr.race,
cjdr.score_modifier,
cjdr.world_language,
cjdr.racial_ability,
cjdr."class",
cjdr.saving_throw,
cjdr.proficiencies,
cjdr.feature,
cjdr.feature_choice
CASCADE;

COMMIT;
