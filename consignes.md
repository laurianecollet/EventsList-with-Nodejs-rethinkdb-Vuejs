###Etape 0 - Préparation à la base de données
 
* Créer la base de donnée “onlylyon” et la table “festivals”
* Migrer le jeu de données dans la table festival avec les festivals
 
Jeu de donnée en JSON 
(vous pouvez le compléter/modifier les données dans votre base)
http://www.jsoneditoronline.org/?id=38b406b416d64a116a8b8dbef9a6a99e
 
###Etape 1 -  Préparation de l’Application
 
Nb: Chaque intitulé est accompagné d’une requête à effectuer côté Node/RethinkDB
 
* Pouvoir lister les évènements limiter à 7 et trié par date la plus récente à la plus ancienne. On affichera seulement le type, l’intitulé, l’image et un icône si il est payant ou gratuit avec le prix si il est payant

* Pouvoir filtrer sur l’intitulé d’un événement avec un champ texte selon un mot-clef saisi (computed, c’est sympa aussi)

* Créer un bouton permettant à chaque événement payant de le rendre gratuit (cela met également à null son prix)

------

* Pouvoir trier sur la liste par intitulé de A-Z ou par prix croissant avec une simple liste déroulante avec une requête en base de données


* A l’aide de  2 bouton “+” et “-” (icons) permettre d’augmenter ou de diminuer le nb de billet disponible

* Créer un bouton permettant d’envoyer par email les 5 événements les plus récents à  l’adresse julien.boyer@wildcodeschool.fr
 
 
 
###Magasin de Bonus
 
* Utiliser le plugin Vue-Toast pour émettre des toast sur les actions d’envoie email https://github.com/AStaroverov/vue-toast

* Créer un bouton  pour chaque événement “Voir le détail” afin de tomber sur une vue ou l’on voit tout le détail d’un événement

* Créer un bouton supprimer dans la vue détail pour supprimer un événement et avoir une redirection vers la liste (voir this.$router.push())
