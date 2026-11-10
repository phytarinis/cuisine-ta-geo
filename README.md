# Cuisine ta Géo — Le Battle des Saveurs

Jeu de géographie pour deux brigades, conçu pour l’E2C Coutras : cinq manches et les 32 cartes du kit pédagogique. Un seul écran, piloté par la formatrice, et deux ardoises suffisent.

## Jouer sur Chromebook ou ordinateur

1. Télécharger le dossier complet du dépôt (Code → Download ZIP), puis le décompresser.
2. Ouvrir **index.html** dans Chrome. Garder `data.js`, `app.js`, `styles.css` et le dossier `assets` à côté.
3. Cliquer sur **Lancer la bataille des saveurs**, nommer les équipes et commencer. Le bouton **Comment jouer ?** rappelle les règles.
4. Pour projeter, utiliser le plein écran du navigateur. Les boutons sont utilisables au clavier avec Tab et Entrée ; les repères de carte ont aussi des boutons équivalents.

Aucune installation, connexion, inscription, bibliothèque distante ou requête de données n’est nécessaire pour jouer. Après téléchargement, le dossier fonctionne sans Internet. Sur GitHub Pages, la première ouverture demande Internet ; télécharger le dossier pour une séance entièrement hors ligne.

## Les cinq manches

- **Apéro local** : les deux équipes révèlent leur ardoise simultanément. Saisir les deux choix puis **Révéler**. +10 par réponse correcte.
- **À quelle sauce ?** : une équipe joue, avec trois indices à 20/15/10 points. Une erreur ou un passe donne un seul vol à l’autre équipe (+5).
- **GPS en PLS** : choisir un repère sur la vraie carte de France (+10), puis une région (+5), indépendamment. Les noms des villes apparaissent à la correction.
- **Passeport gourmand** : duel pays (+10), puis continent (+5). Chaque étape attend les deux réponses ; la carte du monde apparaît à la correction.
- **Coup de feu** : cinq bons par équipe, 90 secondes chacune. Département et région justes ensemble : +10, sinon 0. Pas de bonus vitesse. L’équipe ayant le moins de points commence (A en cas d’égalité). Les dix corrections apparaissent après les deux séries.

Chaque équipe dispose d’un seul joker **Sauce piquante ×2** pour toute la partie, à annoncer sur l’écran de préparation d’un défi des manches 2 ou 3. Il est consommé même en cas d’erreur et ne double jamais un vol. Le score de base maximal sans joker est **275 par équipe**.

## Pause, sauvegarde et arbitrage

- **Pause** masque le défi et arrête le chrono. Après rechargement, cliquer sur **Reprendre la partie**, puis **Reprendre** : la sauvegarde revient en pause, au bon défi et avec le temps restant.
- Sauvegarde automatique locale au navigateur après les choix, validations, transitions et pendant le chrono. Garder le même navigateur, profil et emplacement de fichier. Le stockage peut être désactivé ou éphémère en navigation privée ; un message avertit s’il est indisponible. Ce n’est pas une sauvegarde partagée entre ordinateurs.
- Avant validation, un choix peut être modifié. Après validation, aucun retour arrière ne recalcule les points.
- **Corriger le score / historique** permet ±5 ou ±10, sans score négatif. L’historique affiche les corrections manuelles.
- **Nouvelle partie / Rejouer** demande une confirmation. Annuler conserve la partie.
- Une égalité finale autorise un seul duel bonus facultatif : la préfecture de la Gironde. +10 par bonne réponse ; si les deux répondent pareil, l’égalité reste entière.
- **Bilan / Débrief** ouvre les questions pédagogiques sans modifier les scores. Le score ne valide pas automatiquement les compétences UP2C.

## Publier sur GitHub Pages

Dans les paramètres de **ce dépôt uniquement**, ouvrir Pages, choisir le déploiement depuis une branche, `main` et `/ (root)`, puis enregistrer. Les fichiers du jeu doivent d’abord être commités et envoyés sur cette branche. Aucune compilation n’est nécessaire. Ne pas publier les autres projets.

## Structure et évolution

- `index.html` : page et dialogues ; `styles.css` : interface et animations ; `app.js` : état, navigation, arbitrage, scores et chrono.
- `data.js` : données exécutables chargées avant l’application, sans `fetch`. Copie exacte de `02_DONNEES_JEU.js`.
- `02_DONNEES_JEU.json` : référence canonique éditable. Pour modifier une question, maintenir les trois fichiers de données synchronisés et les index de réponse dans les options. Conserver les nombres de cartes, l’ordre des équipes et les identifiants uniques. Changer la version de sauvegarde `VERSION`/`KEY` dans `app.js` si une modification rend les anciennes parties incompatibles.
- `assets/france.svg`, `assets/monde.svg` : cartes locales Natural Earth (domaine public). Provenance et formules dans `assets/README.md`.
- Documents `00_` à `04_` : conception, données, animation et critères de recette d’origine, conservés.

## Tests de développement (facultatifs pour jouer)

Le jeu lui-même utilise uniquement HTML/CSS/JavaScript natifs. Les tests automatisés utilisent Node.js et Playwright **sur la machine de développement seulement**, avec un navigateur Chromium/Chrome disponible :

```sh
node tests/game.cjs
node tests/web.cjs
```

Si nécessaire, installer Playwright dans un répertoire de développement extérieur au jeu et l’exposer avec `NODE_PATH`. Le navigateur peut être sélectionné avec `CHROME_BIN=/chemin/vers/chrome` ; sinon les tests cherchent Chromium système. Les tests ouvrent directement `index.html`, coupent le réseau et parcourent les 32 cartes, puis vérifient erreurs, scores, joker/vol, pause/reprise, arbitrage et remise à zéro.

Consulter `TEST_RESULTS.md` pour les résultats et les limites de validation, puis effectuer la recette matérielle sur le Chromebook et le vidéoprojecteur utilisés en séance.
