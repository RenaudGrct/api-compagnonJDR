-- Revert compagnon-jdr:5.seedingTables from pg

BEGIN;

TRUNCATE 
cjdr.ability_score,
cjdr.background,
cjdr.skill,
cjdr.race,
cjdr.score_modifier,
cjdr.world_language,
cjdr.racial_ability,
cjdr.class,
cjdr.saving_throw,
cjdr.proficiencies,
cjdr.features,
cjdr.features_choice,
cjdr.character,
cjdr.has_score_modifier,
cjdr.has_world_language,
cjdr.has_racial_ability,
cjdr.has_saving_throw,
cjdr.has_skill
;

COMMIT;
