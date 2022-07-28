-- Revert compagnon-jdr:4.characterTables from pg

BEGIN;

TRUNCATE cjdr.character RESTART IDENTITY;
DROP TABLE IF EXISTS cjdr.ability_score, cjdr.background, cjdr.skill, cjdr.race, cjdr.score_modifier, cjdr.world_language, 
cjdr.racial_ability, cjdr.class,cjdr.spell CASCADE, cjdr.saving_throW, cjdr.proficiencies CASCADE,
cjdr.features CASCADE, cjdr.features_choice CASCADE, cjdr.character CASCADE;

COMMIT;
