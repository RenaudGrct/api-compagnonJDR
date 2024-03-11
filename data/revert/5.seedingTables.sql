-- Revert compagnon-jdr:5.seedingTables from pg

BEGIN;

TRUNCATE 
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
feature_choice,
character,
has_score_modifier,
has_world_language,
has_racial_ability,
has_saving_throw,
has_skill
;

COMMIT;
