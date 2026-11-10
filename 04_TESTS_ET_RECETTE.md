# Plan de recette / tests d'acceptation — À exécuter avant d'utiliser le jeu

**Tester au clavier/souris, sur ordinateur et à 1366×768, avec et sans Internet.**

## Préparation et navigation
1. Le fichier `index.html` s'ouvre directement hors ligne. Les menus, cartes et questions fonctionnent sans chargement externe.
2. Nouvelle partie : noms modifiables, valeurs par défaut A/B valides, scores 0, joker disponible des deux côtés, manche 1, question 1/6.
3. Passer les 6 questions de la manche 1 déclenche la manche 2 puis 3 puis 4 puis 5 puis le résultat sans blocage ni saut.
4. Essayer de valider un duel sans réponse d'une des équipes : validation refusée ou équipe marquée explicitement « Passe », sans mauvaise attribution de score.
5. Cliquer deux fois sur « Révéler » ou « Valider » n'ajoute jamais deux fois les points.

## Manche 1
6. Question L01 : A=« une commune » et B=« un département » : A reçoit +10 et B +0 ; correction affichée seulement après les deux réponses.
7. Question L06 : bonne réponse exactement « Coutras → Gironde → Nouvelle-Aquitaine → France » ; aucune inversion.

## Manche 2
8. Sur S01, réponse correcte dès l'indice 1 = +20. Rejouer : révéler indice 2 puis bonne réponse = +15 ; indice 3 puis bonne réponse = +10.
9. Activez « Sauce piquante » avant S01 puis bonne réponse à 15 points : l'équipe reçoit +30, joker marqué consommé. Elle ne peut pas le réutiliser en manche 3.
10. Mauvaise réponse en S01 : l'autre équipe obtient une seule possibilité de vol. Bonne réponse au vol = +5 pour l'adversaire et 0 pour l'équipe active. Une seconde tentative de vol est impossible.
11. Mauvaise réponse après joker : joker consommé, équipe active +0. Une réussite du vol ne récupère pas le joker.
12. Vérifier toutes les options des 6 cartes : seul le `answerIndex` désigne la région administrative actuelle.

## Manche 3
13. G01 : repères 4 villes affichés au bon emplacement sur une carte géographiquement correcte. Strasbourg = repère correspondant au `targetCityId`, +10 ; Grand Est = +5. Une autre région ne valide pas +5.
14. Mauvais repère mais bonne région = +5. Bon repère mais mauvaise région = +10. Les scores sont indépendants.
15. Joker activé puis bon repère / mauvaise région = 20 points. Il ne modifie pas le score de l'équipe adverse.
16. Au moment de corriger G01, dévoiler les noms des quatre villes et souligner Strasbourg → Bas-Rhin → Grand Est.
17. Projeter puis réduire la fenêtre : les repères restent positionnés géographiquement, sans dérive d'écran ou superposition de boutons.

## Manche 4
18. M01 Sushi : Japon = +10, Asie = +5, indépendamment pour A/B. Avant correction du pays, aucune équipe ne voit la bonne option signalée.
19. M03 Tacos al pastor : Mexique appartient à l'Amérique du Nord ; le logiciel ne confond pas avec Amérique du Sud.
20. Après correction de chaque carte, la carte du monde présente le pays cité sans devoir accéder à Internet.

## Manche 5
21. 5 bons différents pour A, 5 pour B, régions et départements équilibrés ; chaque série correspond à cinq régions identiques dans un ordre défini (Nouvelle-Aquitaine / Bretagne / Bourgogne-Franche-Comté / Normandie / Grand Est).
22. Un bon correct sur les deux choix = +10 ; un seul choix correct = 0 ; « Passer » = 0. Aucun score partiel dans cette finale.
23. Chaque équipe dispose réellement de 90 secondes ; si le temps expire après 2 bons, les 3 restants valent 0 ; les contrôles deviennent inactifs.
24. Pause sur 53 s restantes puis reprise : reprend à 53 s, pas à 90, n'avance pas pendant pause.
25. Après passage de la première brigade, le chrono se réinitialise à 90 secondes pour l'autre ; les bonnes réponses de la première série ne sont pas révélées avant la fin des deux séries.
26. Après interruption/rechargement durant une finale, sauvegarde/restauration de l'équipe, du bon courant et du temps restant, reprise **en pause**.

## Scores, résultats et stockage
27. Sur une partie avec toutes les bonnes réponses et sans joker/vol : chaque équipe peut atteindre **275 points** si tous ses défis sont réussis ; la composition asymétrique des tours n'accorde pas plus de questions à une équipe.
28. Un joker sur une manche 2 correcte au premier indice ajoute +20 par rapport au total normal. Le joker ne s'utilise pas en duel ou finale.
29. Si A=B à l'écran final, afficher « Égalité ». Si bonus départage joué et les deux répondent pareil (deux justes ou deux faux), conserver l'égalité.
30. Bouton « Rejouer » demande confirmation avant de supprimer partie/score ; annuler conserve exactement la partie.
31. `localStorage` restaure les noms, scores, joker utilisé, manche courante et bonne question. Les données d'une ancienne version incompatibles sont détectées sans planter le jeu.
32. Ajustement manuel de score : ±5/±10, jamais score négatif ; pas de double calcul rétroactif.
33. Ne jamais afficher des réponses ou scores de questions futures lors d'une transition. Pas de fuite de réponse correcte par classes CSS, titres ou aria-label révélateurs dans l'interface avant validation.
34. Boutons accessibles au clavier, contrastes suffisants, texte projetable, pas de débordement sur 1366×768.

## Contrôle des données
- Nombre de cartes : manche 1=6 ; manche 2=6 ; manche 3=6 ; manche 4=4 ; manche 5=5 par équipe ; total = **32**.
- L'intégralité des questions/réponses vient des données fournies, pas d'exemples remplaçant des cartes.
- Pays / région / département associés sont fiables pour le niveau géographique interrogé ; cartes avec vrai contour et latitude/longitude, pas de cartes décoratives fausses.
- Pour départager, une question ponctuelle non incluse dans les 32 cartes est autorisée : « Quelle est la préfecture de la Gironde ? » → Bordeaux.

## Livrable attendu de Codex
- Dossier complet et jouable.
- `README.md` d'utilisation par un formateur non développeur.
- Résultat détaillé de ces tests, avec éventuels problèmes restants explicitement signalés.
