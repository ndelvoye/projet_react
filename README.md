Projet React
============================================================
Réalisation d'une application Rich Media (multimédia, interactive & synchronisée) à l'aide de React - Module Interfaces Riches - IMR3 - ENSSAT 2021

But de l'application
--------------------
L'application permet à un utilisateur de :
* Visualiser un film
* Naviguer dans le contenu par le biais d’un chapitrage 
* Consulter une carte illustrant les lieux où se déroule l’action
* Interagir avec la carte en selectionnant des points d’intérêt et ainsi accéder aux moments du film concernés.
* Visualiser une liste dynamique de mots-clés
* Chatter en direct
* Partager dans le chat un moment précis du film

Données gérées par l'application
--------------------------------
## Appel Back-end
* un noeud `Film` contenant trois champs, `file_url`, `title`, `synopsis_url`, descrivant les informations sur le titre, l’url du fichier ainsi qu’une URL donnant son synopsis
* un noeud `Chapters` contenant un tableau d’objets dont les champs `pos` et `title` contiennent respectivement le timestamp en secondes et le titre du chapitre
* un noeud `Waypoints` contenant un tableau d’objets dont les champs `lat`, `lng`, `label` et `timestamp` contiennent les latitudes, longitudes en degrés décimaux, un libellé et un timestamp en secondes
* un noeud `Keywords` contenant des mots-clés associés à certains moment du film. Il est composé d'un tableau d’objets à deux champs, `pos` et `data`. Le premier contient le moment en secondes auxquels correspondent le ou les mots-clés contenus dans le second champ. data est un tableau d’objets à deux champs, `title` et `url` contenant le mot-clef pour le premier et l’URL d’une page contenant plus d’informations sur le mot-clé

## Chat
* `when` contient le timestamp Unix du moment où le message a été reçu par le serveur
* `name` contient le nom de son auteur
* `message` contient le contenu du message 
* `moment` contient le timestamp en secondes du moment du film partagé

Run app
-------
1. `npm install`
2. `npm start`
3. Connect to `http://localhost:3000/`

Run test
--------
* `npm test`

Live demo
---------
https://react-ndelvoye.herokuapp.com/

Auteur
------
| <a href="https://github.com/ndelvoye" target="_blank">**DELVOYE Nicolhas**</a> |
| :---: |
| <a href="https://github.com/ndelvoye" target="_blank"><img src="https://avatars0.githubusercontent.com/u/33501606?v3&s=200" width="150" height="150" /></a> | 
