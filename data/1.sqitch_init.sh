## Création de l'utilisateur et de la BDD

export PGUSER=postgres

createuser cjdr

createdb -O cjdr cjdr


## Initialisation du nouveau porjet sqitch et création de la première version

# sqitch init cjdr --engine pg
# sqitch add 1.userTable -n 'Création de la table user'