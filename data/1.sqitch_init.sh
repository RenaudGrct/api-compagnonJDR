## Création de l'utilisateur et de la BDD

su postgres
## création du Role cjdr en tant que superuser
createuser -P -s -e cjdr

createdb -O cjdr cjdr

## Initialisation du nouveau porjet sqitch et création de la première version

  # sqitch init compagnon-jdr --engine pg
  # sqitch add 1.userTable -n 'Création de la table user'
