# Résultats de recette — 10 novembre 2026

## Environnement et commandes

Tests exécutés sous Linux avec Google Chrome 157.0.8103.50, Playwright et Node.js 24.22.1. Viewports de référence : 1366×768 ; contrôle complémentaire à 1024×600. Les dépendances de test sont extérieures au dossier du jeu ; aucune n'est chargée par l'application.

```sh
CHROME_BIN=/tmp/cuisine-chrome/opt/google/chrome/chrome node tests/game.cjs
CHROME_BIN=/tmp/cuisine-chrome/opt/google/chrome/chrome node tests/web.cjs
node --check app.js
```

`CHROME_BIN` doit désigner votre navigateur de test. Le Chromium préinstallé dans l'environnement cloud interdit `file://` par politique d'administration ; les tests locaux ont donc utilisé Chrome officiel téléchargé depuis `dl.google.com`, sans désactiver la vérification TLS ni changer cette politique.

## Vérifications automatisées réussies

| Domaine | Vérification |
|---|---|
| Données | Copie `data.js` identique au JSON canonique ; 32 identifiants uniques ; index de réponse valides ; toutes les villes candidates existent et contiennent leur cible. Les documents et données sources sont conservés. |
| Parcours | Les cinq manches et toutes les 32 cartes sont parcourues dans l'interface, jusqu'au classement et au débrief, en `file://` avec le réseau désactivé. Aucun événement d'erreur JavaScript. |
| Score de référence | Toutes les bonnes réponses sans joker ni vol donnent exactement **275 points à A et 275 à B** ; les étapes avant finale donnent 225/225. |
| Duels | Validation désactivée tant qu'une réponse manque ; L01 : A juste/B faux → 10/0 ; aucun feedback avant correction ; aucune double attribution. Pays et continent sont traités séparément. |
| Sauce | 20/15/10 selon les indices ; joker à l'indice 2 → 30 ; erreur/passe → un seul vol ; vol juste → 5 ; joker consommé sur erreur et indisponible au GPS. |
| GPS | Bonne ville et mauvaise région → 10 ; mauvaise ville et bonne région → 5 ; joker → 20 ou 30 selon les composantes. Quatre noms révélés seulement à la correction. |
| Cartographie | SVG locaux décodés en HTTP ; même emprise image/repères à 1366 et 1024 pixels ; étiquettes des six corrections GPS sans superposition ; déplacement éventuel des seules étiquettes avec traits de liaison. Repères calculés à partir des latitudes/longitudes, contours Natural Earth réels. |
| Monde | Quatre cartes duelles entièrement jouées ; Mexique → Amérique du Nord ; pays faux/continent juste → 5 ; carte affichée à la correction. |
| Finale | Dix bons parcourus ; toutes les combinaisons département/région vérifiées ; pas de score partiel ; passer → 0 ; série suivante à 90 s ; équipe ayant le moins de points en premier, A en cas d'égalité ; aucune correction avant les deux séries. |
| Chrono | Le temps diminue réellement ; pause près de 53 s stable pendant l'attente ; reprise au temps restant ; expiration bloque la série et passe à l'autre équipe ; reload restaure équipe, carte et temps en pause. Pas de bonus vitesse. |
| Sauvegarde | Restauration des scores, réponses, indice, joker, multiplicateur, manche et défi ; version incompatible ignorée sans planter ; noms échappés comme texte. |
| Arbitrage | ±5/±10, plancher à zéro, historique des corrections ; annulation du reset conserve la partie ; confirmation supprime la sauvegarde. |
| Résultats | Égalité affichée ; bonus joué une seule fois ; deux bonnes réponses conservent l'égalité ; une seule bonne réponse départage ; débrief sans changement des scores. |
| Accessibilité | Activation au clavier, repère SVG avec Entrée, boutons alternatifs ; focus conservé après sélection ; réduction des animations ; pas de débordement horizontal à 1024×600 ni défilement requis pour les défis testés à 1366×768. |
| Mode statique | Serveur HTTP de test servant les mêmes fichiers, sans requête externe ; ressources et cartes chargées. Aucun backend applicatif. |

`tests/web.cjs` vérifie **817 combinaisons et assertions de barème**, incluant les différentes réponses, passes, indices et multiplicateurs des manches 2/3/4/5, ainsi que l'ordre de finale, l'unicité du joker et le départage. `tests/game.cjs` vérifie le parcours par clics et les scénarios d'erreur, pause, sauvegarde et arbitrage. Les combinaisons de barème appellent les mêmes fonctions que l'interface ; elles complètent les tests par clics.

## Contrôles visuels

Écrans d'accueil, carte France/correction et carte monde inspectés par capture. Les cartes respectent leur ratio même dans la grille ; les repères ne dérivent pas avec le redimensionnement. Les réponses exactes ne sont pas encodées dans une classe, un titre ou un libellé accessible des boutons avant validation. Comme toute application locale, le fichier de données reste consultable par une personne ouvrant volontairement le code source ; ce jeu est piloté par le formateur.

## À vérifier en salle / non revendiqué

- Pas de test physique sur le Chromebook de la formatrice ni sur son vidéoprojecteur : vérifier taille, contraste à distance, plein écran et ouverture du dossier local selon les règles de son établissement.
- GitHub Pages n'a pas été activé ni déployé : le comportement statique a été testé sur un serveur HTTP local. Le README explique la publication.
- L'hébergement Pages n'est pas un cache hors ligne : pour jouer sans Internet, utiliser le dossier téléchargé et `index.html`.
- Le stockage dépend du navigateur et de son profil. Vérifier une reprise avant la séance ; une navigation privée peut effacer les données.
- L'expiration a été testée en ramenant le temps restant près de zéro pour exercer le même mécanisme, sans attendre 90 secondes à chaque scénario. Une attente réelle courte vérifie que le chrono avance et reste fixe pendant la pause.

Aucun test automatisé exécuté n'est actuellement en échec. La recette matérielle reste à faire avant une séance publique.
