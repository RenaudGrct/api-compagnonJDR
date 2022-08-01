-- Deploy compagnon-jdr:5.seedingTables to pg

BEGIN;

INSERT INTO cjdr.ability_score (strength, dexterity, constitution, wisdom, charisma, intelligence)
VALUES
(15, 10, 14, 12, 13, 11),
(15, 14, 13, 11, 12, 10)
;

INSERT INTO cjdr.background (name, additional_language, ability, ability_description)
VALUES
('Acolyte', 2, 'Abri du fidèle', 'En  tant  qu’acolyte,  vous  imposez  le  respect  à  ceux  qui partagent votre foi, et pouvez mener les cérémonies religieuses  de  votre  divinité. Vous  et  vos  compagnons aventuriers  pouvez  vous  attendre  à  recevoir  des  soins gratuits  dans  un  temple,  un  sanctuaire  ou  toute  autre présence établie de votre foi, bien que vous soyez responsable de fournir toutes les composantes matérielles nécessaires  aux  sorts.  Ceux  qui  partagent  votre  religion vous  aideront  (mais  seulement  vous)  et  vous  offriront  un mode de vie modeste. Vous  pouvez  également  avoir  des  liens  avec  un  temple spécifique dédié à votre divinité ou votre panthéon, et vous y avez une résidence. Cela pourrait être le temple où vous avez servi, si vous êtes resté en bons termes avec lui, ou un Temple dans lequel vous avez trouvé une nouvelle maison. Lorsque vous êtes proche de votre temple, vous pouvez faire appel à des religieux pour vous aider, à condition que l’aide que  vous  demandiez  ne  soit  pas  dangereuse  et  que  vous restiez en règle avec votre temple.' ),
('Criminel', 0, 'Accointances avec la pègre', 'Vous avez un contact fiable et digne de confiance qui agit comme  votre  agent  de  liaison  avec  un  réseau  d’autres criminels.  Vous  savez  comment  envoyer  et  recevoir  des messages via votre contact, même sur de grandes distances. Concrètement,  vous  connaissez  les  messagers  locaux,  les maîtres de caravanes corrompus et les marins miteux qui peuvent délivrer des messages pour vous.' )
;

INSERT INTO cjdr.skill (name)
VALUES
('Intuition'),
('Religion'),
('Discrétion'),
('Tromperie'),
('Acrobaties'),
('Intimidation'),
('Athlétisme'),
('Perception'),
('Persuation')
;

INSERT INTO cjdr.race (name, speed, extra_language, night_vision)
VALUES
('Drakéide', '9 m', 0, false),
('Humain', '9 m', 1, false)
;

INSERT INTO cjdr.score_modifier (name, "number")
VALUES
('Force', 2),
('Charisme', 1),
('Force', 1),
('Dextérité', 1),
('Constitution', 1),
('Sagesse', 1),
('Intelligence', 1)
;

INSERT INTO cjdr.world_language (name)
VALUES
('Commun'),
('Draconique'),
('Elfique'),
('Nain'),
('Orc')
;

INSERT INTO cjdr.racial_ability (name, description)
VALUES
('Ascendance draconique', 'Vous avez une ascendance draconique. Votre souffle et votre résistance aux dégâts sont déterminés par le type de dragon.'),
('aucun traits raciaux', 'Vous ne possèdez aucun traits raciaux')
;

INSERT INTO cjdr.class (name, hit_points)
VALUES
('Paladin', 10),
('Guerrier', 10)
;

INSERT INTO cjdr.saving_throw (name)
VALUES
('Force'),
('Constitution'),
('Sagesse'),
('Charisme')
;

INSERT INTO cjdr.proficiencies (name, class_id)
VALUES
('Paladin', 1),
('Guerrier', 2)
;

INSERT INTO cjdr.features (name, description, number_of_use, reset, class_id)
VALUES
('Imposition des mains', 'Votre toucher béni peut guérir les blessures. Vous possédez une réserve de points de vie à soigner qui se récupère après chaque repos long. Avec cette réserve, vous pouvez restaurer  un  nombre  total  de  points  de  vie  égal  à  votre niveau  de  paladin  multiplié  par  5.  Au  prix  d’une  action, vous  pouvez  toucher  une  créature  et  puiser  dans  votre réserve  pour  soigner  autant  de  points  de  vie  que  vous  le désirez,  sans  dépasser  le  nombre  de  points  dans  votre réserve bien entendu. Vous  pouvez  également  dépenser  5  points  de  vie  de  votre réserve pour guérir la cible d’une maladie ou neutraliser un poison qui l’affecte. Vous pouvez soigner plusieurs maladies  et  neutraliser  plusieurs  poisons  avec  une  seule imposition des mains en dépensant les points de vie séparément  pour  chacun  d’entre  eux. L’imposition des mains n’a pas d’effet sur les morts-vivants et les artificiels.', 5, 'Long repos', 1),
('Sens divin', 'Une forte présence maléfique éveille vos sens, comme une odeur  nocive,  et  un  bien  puissant  fait  résonner  dans  vos oreilles une musique céleste. Par une action, vous pouvez éveiller  votre  conscience  pour  détecter  de  telles  forces. Jusqu’à  la  fin  de  votre  prochain  tour,  vous  connaissez l’emplacement  de  toute  créature  céleste,  fiélon  ou  mort-vivante dans un rayon de 18 mètres autour de vous, et qui ne se trouve pas derrière un abri total. Vous connaissez le type (céleste, fiélon ou mort-vivant) et le nombre de tous les êtres dont vous sentez la présence, mais pas leur identité (le vampire comte Strahd von Zarovich, par exemple). Dans ce même rayon, vous détectez également la présence d’un lieu ou d’un objet qui a été consacré ou profané, comme avec le sort sanctification.', 2, 'Long repos', 1),
('Style de combat', 'Vous adoptez un style particulier de combat qui sera votre spécialité. Choisissez l’une des options suivantes. Vous ne pouvez  pas  prendre  une  option  de  style  de  combat  plus d’une fois, même si vous obtenez plus tard la possibilité de choisir un nouveau style.', 0, 'Permanent', 2),
('Second souffle', 'Vous possédez une réserve d’endurance limitée dans laquelle vous pouvez puiser pour vous protéger contre les dégâts. À votre tour vous pouvez utiliser une action bonus pour regagner un nombre de pv égal à 1d10 + votre niveau de guerrier.', 1, 'Court ou Long repos', 2)
;

INSERT INTO cjdr.features_choice (name, description, features_id)
VALUES
('Archerie', 'Vous obtenez un bonus de +2  aux jets d’attaque  avec une arme à distance', 3),
('Arme à deux mains', 'Lorsque vous obtenez 1 ou 2 à un dé de dégâts lors d’une attaque que vous effectuez avec une arme de corps à corps que vous tenez avec vos deux mains, vous pouvez relancer le dé et obligatoirement prendre le nouveau résultat, même si celui-ci est un 1 ou un 2. L’arme doit avoir la propriété à deux mains ou polyvalente pour octroyer cet avantage.', 3),
('Combat à deux armes', 'Lorsque  vous  vous  engagez  dans  un  combat  avec  deux armes en mains, vous pouvez ajouter votre modificateur de caractéristique aux dégâts de la seconde attaque. ', 3),
('Défense', 'Si vous portez une armure, vous obtenez un bonus de +1 à la CA.', 3),
('Duel', 'Lorsque vous attaquez avec une arme de corps à corps dans une main et aucune autre arme, vous obtenez un bonus de +2 aux dégâts avec cette arme.', 3)
;

INSERT INTO cjdr.character (name, user_id, guest_id, race_id, class_id, ability_score_id, background_id)
VALUES
('BenOclock', 1, 1, 2, 1, 1, 1)
;

INSERT INTO cjdr.has_score_modifier (race_id, score_modifier_id)
VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6)
;

INSERT INTO cjdr.has_world_language (race_id, world_language_id)
VALUES
(1, 1),
(1, 2),
(2, 1)
;

INSERT INTO cjdr.has_racial_ability (race_id, racial_ability_id)
VALUES
(1, 1),
(2, 2)
;

INSERT INTO cjdr.has_saving_throw (saving_throw_id, proficiencies_id)
VALUES
(3, 1),
(4, 1),
(1, 2),
(2, 2)
;

INSERT INTO cjdr.has_skill (skill_id, proficiencies_id, background_id)
VALUES
(1, 1, 1),
(2, 1, 1),
(6, 1, 2),
(9, 1, 2),
(1, 2, null),
(5, 2, null),
(6, 2, null),
(7, 2, null)
;

COMMIT;
