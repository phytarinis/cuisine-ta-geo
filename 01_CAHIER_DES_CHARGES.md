# CAHIER DES CHARGES FONCTIONNEL ET TECHNIQUE — v1.0

## 0. Objet et priorités

**Cuisine ta Géo — Le Battle des Saveurs** : jeu local de géographie par la cuisine pour l'E2C Coutras. 2 équipes, 1 écran projeté, formateur opérateur, durée cible 40 minutes. Progression local → France → Monde → consolidation. Le but central est la **géographie** : commune, ville, département, région, pays, continent et localisation sur carte.

Priorités absolues : (1) les 5 mini-jeux fonctionnent, (2) les réponses et scores sont exacts, (3) les cartes sont fiables et lisibles, (4) l'interface se pilote facilement. Ne pas complexifier avec connexion de participants, application mobile, compte, backend, IA, reconnaissance vocale, multijoueur réseau, publicité, télémétrie ou API.

## 1. Matériel et mode de jeu

- Un ordinateur/Chromebook + vidéoprojecteur ; le formateur clique et saisit les réponses reçues oralement ou sur ardoises.
- Deux équipes, par défaut **Brigade bleue (A)** et **Brigade rouge (B)** ; noms modifiables au lancement, max 20 caractères ; conserver contraste des couleurs et étiquettes A/B.
- Chaque équipe discute pendant les défis. En mode « duel », les deux équipes écrivent discrètement A/B/C/D sur ardoise ou papier puis révèlent leurs réponses simultanément ; le formateur les enregistre *après* révélation dans l'interface. Le logiciel n'a besoin d'aucun dispositif de vote et les réponses enregistrées ne peuvent pas changer avant la correction.
- En mode « tour par tour », une seule équipe répond ; l'autre ne participe qu'en cas de vol de points prévu.
- Pas de chrono général hors manche 5. Ne jamais chronométrer la lecture d'une carte dans la manche 3.
- Une bonne réponse rapporte des points ; jamais de points négatifs. Les scores sont des entiers et ne peuvent pas devenir négatifs.

## 2. Parcours des écrans

1. **Accueil** : titre + slogan « Deux brigades, un seul territoire à conquérir ! », bouton **LANCER LA BATAILLE DES SAVEURS** ; visuel 2 food trucks, carte stylisée, plats. Bouton « Reprendre la partie » seulement s'il existe une sauvegarde valide.
2. **Configuration** : champs noms équipe A/B ; bouton « Comment jouer ? » avec 5 règles courtes ; « Commencer ».
3. **Présentation manche** : numéro 1/5 à 5/5, nom, pictogramme, règle propre et bouton « C'est parti ».
4. **Écran défi** : score des deux brigades toujours présent, manche, défi n/total, équipe active ou Duel, contenu de la question, gros boutons adaptés, contrôles formateur discrets.
5. **Écran correction** après chaque défi : réponse(s) exactes, explication géographique courte, points de chacune, puis « Défi suivant » ; ne jamais afficher la bonne réponse trop tôt.
6. **Écran intermédiaire** en fin de manche : score + titre de la manche suivante, possible pause.
7. **Final** : classement (ou égalité), score des deux équipes, rappel de 5 acquisitions géographiques (« commune / département / région / pays / continent »), bouton « Rejouer » (confirmation), bouton « Bilan / Débrief ».
8. **Débrief** : 3 questions de réflexion, bouton retour aux résultats (sans changer les scores).

Pas de longues cinématiques ni de messages en plein écran qui bloquent le jeu. Animations légères non indispensables à la compréhension. Aucun défilement vertical requis sur écran 1366x768 pour répondre.

## 3. Barème définitif

| Manche | Quantité | Score possible par équipe sans bonus/vol |
|---|---:|---:|
| 1. Apéro local | 6 questions en duel, chacune pour les deux équipes | 60 |
| 2. À quelle sauce ? | 6 défis, 3 par équipe | 60 (3×20) |
| 3. GPS en PLS | 6 défis, 3 par équipe | 45 (3×15) |
| 4. Passeport gourmand | 4 questions en duel, chacune pour les deux équipes | 60 (4×15) |
| 5. Coup de feu | 5 bons par équipe, 90 s chacun | 50 (5×10) |
| **Total de base** | | **275** |

- **Joker « Sauce piquante »** : un seul par équipe et par partie ; utilisation autorisée uniquement sur l’écran de préparation, **avant d’afficher la question** de son propre défi en manche 2 ou les repères de sa livraison en manche 3 ; double les points que cette équipe gagne **sur ce défi** (pas le vol) ; si elle se trompe, joker consommé sans effet ; bouton visuellement « utilisé » après activation ; jamais utilisable en manche 1, 4, 5 ou lors d'un vol. Si activé en manche 2 et réponse correcte après 2 indices, 15×2=30. Si activé en manche 3 et une seule des deux parties correcte, seuls les points obtenus sont doublés.
- **Vol de réponse** : uniquement manche 2, après première réponse incorrecte ou abandon de l'équipe active. Adversaire reçoit les indices déjà ouverts et peut choisir une réponse une seule fois, pour **+5 points**. Il ne peut pas utiliser son joker sur un vol. Le joueur initial ne marque rien sur ce défi ; le vol n'ajoute pas un nouveau défi dans le décompte.
- **Pas de point négatif**. En cas d'égalité finale, un départage facultatif (« Question bonus ») : les deux répondent simultanément à la même question locale inédite : « Quelle est la préfecture de la Gironde ? » ; si les deux répondent juste ou faux, le résultat reste une égalité. Ne jamais faire répéter à l'infini ni changer la banque canonique.
- L'équipe A commence la manche 2 : A-B-A-B-A-B. L'équipe B commence la manche 3 : B-A-B-A-B-A ; les données intègrent cet ordre par champ `team`. Les duels 1/4 sont simultanés. Finale : l'équipe avec **le moins de points** avant finale commence ; égalité préalable → A commence. Chaque équipe joue sa série propre et équivalente de 5 questions, sans affichage préalable des réponses de l'adversaire.

## 4. Manche 1 — L'apéro local (DUEL)

- Fichier source : `rounds['1_apero_local']`, exactement **6 QCM à 3 choix**.
- Une question apparaît ; les deux équipes discutent puis montrent leur réponse par ardoise ; le formateur sélectionne le choix de A, puis celui de B dans deux sélecteurs explicites (« Réponse bleue » et « Réponse rouge »), sans indication « juste/faux » avant de cliquer sur « Révéler ».
- Les deux réponses doivent être renseignées pour corriger. Une équipe peut choisir « Passe » ; réponse non comptabilisée → 0.
- Après validation, même correction pour les deux ; chaque réponse exacte = +10. Aucune pénalité, aucun vol, aucun joker.
- Montrer le bon niveau géographique (commune / département / région / pays) dans l'explication.

## 5. Manche 2 — À quelle sauce ? (TOUR PAR TOUR)

- Fichier : `rounds['2_a_quelle_sauce']`, 6 plats, trois par brigade, dans l'ordre déclaré.
- Consigne : **« Dans quelle région actuelle associe-t-on cette spécialité ? »**. Montrer 4 options de régions dès le départ, avec un premier indice descriptif.
- Les trois textes `clues` correspondent à l'indice 1 (première vue = **20 pts**), l'indice 2 (bouton « Révéler un indice » = **15 pts**), l'indice 3 (dernier indice = **10 pts**). Si plusieurs indices ouverts, le score courant = valeur du dernier indice ouvert. Ne pas dépasser 3 indices.
- L'équipe active choisit une seule réponse parmi les quatre (ou « Je passe »). Si juste : gagne les points courants ×2 si son joker était activé ; afficher nom du plat, région actuelle, ville/département associés si pertinent, et une courte explication. Si erreur ou passe : proposer **une seule tentative de vol** à l'adversaire, avec indices identiques ; réussite +5, sinon 0. Ensuite correction commune et défi suivant.
- La région attendue est la région administrative **actuelle** ; ne pas traiter « Lorraine », « Alsace », « Bourgogne » ou « Pays basque » comme des régions administratives distinctes.

## 6. Manche 3 — Le GPS est en PLS ! (TOUR PAR TOUR)

- Fichier : `rounds['3_gps_en_pls']`, 6 livraisons, trois par équipe.
- **Étape 1 : localisation de la ville.** Afficher **la carte correcte de la France métropolitaine (Corse visible)** et 4 **repères A/B/C/D non nommés**, associés aux 4 villes `candidateCityIds`. L'énoncé donne la destination ; l'équipe clique sur un repère (ou sur gros boutons A/B/C/D sous la carte, équivalents pour l'accessibilité). Avant validation, rien n'indique la bonne réponse. Une seule tentative, +10 si bon repère, sinon 0.
- **Étape 2 : région de destination.** Présenter quatre régions dans `regionOptions` ; une seule tentative, +5 si correcte. Cette étape a lieu même si la localisation de la ville était erronée ; aucune dépendance de score.
- **Étape 3 : correction.** Montrer les quatre noms de villes au bon endroit sur la carte, mettre en valeur la destination, puis afficher « Ville → Département → Région » et détail +10/+5. Les repères doivent être tirés de latitudes/longitudes de `cities`, projetées sur une carte géographiquement fiable, **pas placés arbitrairement en pourcentage sur une image approximative**. Un agrandissement discret des zones où les points sont proches est autorisé, sans ajouter de logique cartographique complexe.
- L'équipe joue seule. Pas de vol. Joker autorisé avant la question, et multiplie la somme des points obtenus sur la livraison.

## 7. Manche 4 — Passeport gourmand (DUEL)

- Fichier : `rounds['4_passeport_gourmand']`, 4 plats (Japon, Maroc, Mexique, Pologne).
- Pour chaque plat : 1) **pays associé** : 4 options, +10 par équipe ; 2) **continent où se trouve le pays** : 4 options, +5 par équipe. Les deux équipes montrent simultanément leurs choix ; le formateur les enregistre ; ne jamais dévoiler le pays avant d'avoir reçu les deux réponses à la question 1, ni le continent avant la question 2.
- À la correction finale du défi, afficher une carte du monde **avec le pays localisé** (point ou zone mise en évidence) et une explication sur son continent. Les spécialités sont « associées à », non des appartenances exclusives.
- Pas de vol, pas de joker. Le Mexique est situé en **Amérique du Nord**. Pays et continents sont deux composantes de score indépendantes : un mauvais pays n'empêche pas de gagner +5 pour un continent exact.

## 8. Manche 5 — Le coup de feu ! (FINALE)

- Fichier : `rounds['5_coup_de_feu']`, séries A et B de **5 bons de livraison distincts mais équilibrés**. Chaque équipe a 90 secondes ; l'autre équipe attend. L'ordre de passage dépend du score avant finale, sans changer les séries d'équipe.
- Sur chaque bon : ville et commande alimentaire **déjà affichées** ; l'équipe doit sélectionner le **bon département parmi trois**, puis **la bonne région parmi trois**. Elle clique sur « Valider le bon » ; bonne paire = +10 ; si une des deux parties est fausse = 0. Chaque carte une seule tentative ; proposer « Passer » = 0.
- Dès validation, passer **immédiatement** au bon suivant, sans expliquer la bonne réponse pendant le chrono ; afficher une indication brève (« Bon envoyé ! ») puis poursuivre. Le formateur peut **mettre en pause** en cas de problème technique. Le temps n'avance pas pendant pause ni lors de la transition entre A et B.
- Si les 5 bons sont traités avant 90 s, arrêter le chrono et garder le score ; bonus vitesse **interdit** (plus simple et équitable). Si 90 s arrivent avant la fin, bloquer les saisies, noter les bons non traités à 0 et passer à l'autre brigade / résultats.
- Après les deux séries, révéler une table de correction « ville → département → région » pour les 10 commandes. Pas de vol, pas de joker.

## 9. Gestion des scores, sauvegarde, arbitrage

- Gestion centralisée du score pour éviter les doublons : un défi ne peut être compté qu'une fois ; bouton « Révéler / Valider » devient inactif après validation ; transition idempotente.
- Reprise de session dans `localStorage`, **versionnée**, en conservant : noms d'équipes, scores, jokers utilisés, manche, carte, indices dévoilés, réponses retenues, état de pause/chrono, série active et temps restant. Écrire après chaque validation et aux transitions de manche. Pour le chrono, écrire les secondes restantes après pause et à la fin de chaque bon, et au moins périodiquement pendant le chrono ; à la reprise, le chrono reste **en pause** pour laisser reprendre en sécurité.
- Bouton « Nouvelle partie » derrière confirmation double-action (pas de réinitialisation par erreur). Bouton admin « Corriger le score » limité aux ajustements manuels ±5 / ±10, avec affichage visible « correction manuelle » dans l'historique, jamais de score négatif ; pas d'action manuelle rétroactive sur les réponses. Bouton pause/reprendre sur chaque manche, nécessaire en manche 5, facultatif ailleurs.
- Si erreur de clic avant validation : réponse modifiable ; après validation : verrouillée, avec compensation manuelle des points si besoin. N'ajouter aucun bouton « précédent » risquant de recalculer le score.
- Fin de partie : score égal = « Égalité ! Deux brigades au top. » ; gagnant sinon félicitations sans ridiculiser les perdants ; reprise impossible après « Rejouer » confirmé.

## 10. Exigences visuelles et accessibilité

- Univers **food trucks et arcade culinaire**, non une simple page scolaire. Bleu AFEPT `#1396d4`, rouge AFEPT `#e94b61` et base crème/bleu nuit ; fond clair pour les réponses, typographie lisible type Fira Sans ou alternative système sans téléchargement. Étiquettes A/B en plus des couleurs.
- En-tête compact : manche courante, noms des deux brigades, points, état du joker. Corps central : plat / défi et carte ou options. Pied : commandes du formateur.
- Icônes légères (SVG/emoji autorisés), quelques micro-animations (apparition plat, « +10 », transition courte), bouton « Réduire les animations ». Pas de son obligatoire ; si son, bouton couper le son et audio local.
- Dimensions de référence 1366×768, minimum 1024×600, interface utilisable au clavier, gros boutons, focus visible, contraste élevé, texte >=16px idéalement 18px pour projection. Aucune information de réussite par couleur seule.
- Texte bref à chaque question ; correction pédagogiquement explicite.

## 11. Contrainte cartes et ressources locales

- Créer localement `assets/france.svg` avec **contour exact de la France métropolitaine**, Corse visible (provenance géographique libre : Natural Earth), et `assets/monde.svg` avec contours des pays/continents ou points et pays clairement situés. Ne jamais utiliser de **carte inventée**, ni d'image de carte incohérente, ni de dépendance externe à l'exécution.
- Le moteur des repères de ville lit `lat` et `lon` dans `cities`, utilise une projection cohérente sur le `viewBox` du SVG, et maintient les repères à leur emplacement si le SVG se redimensionne. Les 4 choix sont visibles à la fois et cliquables ; les boutons A/B/C/D sous la carte reproduisent ces choix.
- Préparer les SVG lors du **codage** et les intégrer au dépôt ; les récupérer depuis Natural Earth (domaine naturalearthdata.com), qui autorise librement la réutilisation. Les données du référentiel INSEE sont utilisées pour les réponses géographiques. Assurer le fonctionnement hors ligne.
- Illustrations culinaires facultatives. Première version : noms de plats, pictogrammes/emoji et CSS soignés suffisent. Les photos ne doivent jamais être un prérequis pour jouer.

## 12. Architecture technique requise

- Jeu **HTML, CSS, JavaScript natif**. Pas de React, Next.js, Node, npm, backend, API externe, cookies ou connexion.
- Fichiers cibles : `index.html`, `styles.css`, `app.js`, `data.js` (copie renommée de `02_DONNEES_JEU.js`), `assets/france.svg`, `assets/monde.svg`, `README.md`. Charger `data.js` **avant** `app.js` via balises `<script defer>` ; ne pas faire `fetch()` d'un JSON local pour que le jeu puisse s'ouvrir aussi avec `file://` sur Chromebook.
- Fonctions JS souhaitées : initialisation, renderScreen, renderQuestion, submitDuelAnswers, submitAlternatingAnswer, awardPoints, nextCard, saveGame, restoreGame, pauseTimer, resumeTimer, resetGame.
- Aucune modification des données sources n'est nécessaire pour écrire les règles ; les données sont présentes dans `02_DONNEES_JEU.js` / JSON. Utiliser `answerIndex` plutôt que comparer des textes pour évaluer.
- Ajouter un README technique : ouvrir le fichier index.html, publier sur GitHub Pages si besoin, modifier les questions, règles des données, lancer les tests.

## 13. Recommandations pédagogiques

- Distinguer le score ludique du positionnement individuel UP2C. Le jeu permet principalement d'observer **2d (Se repérer dans l'espace et le temps)**, **4c (Apporter sa contribution au collectif)**, **1c (Échanger oralement avec autrui)** ; pas de validation de palier automatique.
- Débrief : « Quelle différence entre une ville, un département, une région, un pays et un continent ? » ; « Comment avez-vous utilisé la carte ? » ; « Quand ces repères sont-ils utiles (stage, transport, rendez-vous, emploi) ? ».
- La séance complète peut exploiter des recherches et cartes, avant ou après le jeu ; ce dossier concerne **le jeu numérique**, pas une refonte complète de toutes les fiches UP2C.

## 14. Critères de livraison non négociables

Livrer une application complète, **pas une maquette**. Toutes les 32 cartes jouables, 5 manches successives, scores auto, ardoises/duels, vols, indices, jokers, GPS en vraie carte avec repères, carte du monde, chrono, pause, reprise, égalité, résultats et débrief. Ne pas se contenter d'un écran d'accueil ni d'une seule manche. Voir `04_TESTS_ET_RECETTE.md` pour les scénarios exacts.
