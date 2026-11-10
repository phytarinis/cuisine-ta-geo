# À LIRE EN PREMIER — Cuisine ta Géo

Ce dossier est le **kit de conception intégral à transmettre à Codex**. Le jeu n'est **pas encore codé**.

## Les fichiers

1. **00_PROMPT_CODEX_A_COPIER.txt** : à coller tel quel dans Codex ; lui demander de lire les fichiers joints.
2. **01_CAHIER_DES_CHARGES.md** : toutes les règles, mécaniques, écrans, barème, interface et logique technique.
3. **02_DONNEES_JEU.js** : banque prête à l'emploi (32 défis/cartes), sans requête réseau.
4. **02_DONNEES_JEU.json** : mêmes données pour contrôle/édition, référence canonique.
5. **03_GUIDE_ANIMATION_E2C.md** : consignes du formateur, points pédagogiques et débrief.
6. **04_TESTS_ET_RECETTE.md** : test de conformité avant la séance.

## Mode d'emploi

- Décompresser le ZIP dans un **nouveau dossier/projet GitHub**, indépendant de « Ce Coutras qui n'existe pas » et « Festoche ou Fiasco ».
- Ouvrir Codex dans ce dossier, copier le contenu du fichier `00_PROMPT_CODEX_A_COPIER.txt` et fournir les autres fichiers si nécessaire.
- Laisser Codex créer **index.html, styles.css, app.js, assets/france.svg, assets/monde.svg** et éventuellement des ressources graphiques facultatives.
- Tester en ouvrant `index.html` directement (pas de serveur), puis sur Chromebook + vidéoprojecteur.

## Origine pédagogique

Adapté de la séance existante « Cuisine ta géographie » : spécialités régionales, pays du monde, géolocalisation sur des cartes. La version numérique remplace les diapositives/exercices par cinq mini-jeux compétitifs ; elle ne remplace pas tout le travail de recherche et d'expression de la séance originelle.

Supports initiaux consultés :
- [Diaporama « Cuisine ta geo »](https://docs.google.com/presentation/d/1HgXwPrBf5irRMLEyPzhbIP9VVi4yOqP579iIV6hcPEk/edit)
- [Exercice « Cuisine ta géographie »](https://docs.google.com/document/d/1Mio847hMqSOIBbVEPy14Qdk7puU8KKvv_-PuMbbFj_M/edit)
- [Corrigé](https://docs.google.com/document/d/1ZjhPXh2JWmKxi-UeM_OEXPnsQV5GBwZ5IqvEnSc89ko/edit)

Références pour les cartes : [Natural Earth (données cartographiques librement réutilisables)](https://www.naturalearthdata.com/downloads/), [INSEE — Coutras](https://www.insee.fr/fr/metadonnees/geographie/commune/33138-coutras). Pour la France, utiliser une carte exacte de la France métropolitaine, y compris la Corse, et ne **pas inventer** les contours.
