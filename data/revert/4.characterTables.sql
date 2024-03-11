-- Revert compagnon-jdr:4.characterTables from pg

BEGIN;

DROP TABLE IF EXISTS
character,
ability_score,
background,
skill,
race,
score_modifier,
world_language,
racial_ability,
class,
saving_throw,
proficiencies,
feature,
feature_choice
CASCADE;

COMMIT;
