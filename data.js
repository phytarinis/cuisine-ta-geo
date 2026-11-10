/* Données locales : chargées sans fetch() pour fonctionner même en ouvrant index.html. */
window.CUISINE_TA_GEO_DATA = {
  "version": "1.0.0",
  "title": "Cuisine ta Géo — Le Battle des Saveurs",
  "teams": {
    "A": "Brigade bleue",
    "B": "Brigade rouge"
  },
  "cities": {
    "coutras": {
      "name": "Coutras",
      "lat": 45.041,
      "lon": -0.128,
      "department": "Gironde",
      "region": "Nouvelle-Aquitaine"
    },
    "libourne": {
      "name": "Libourne",
      "lat": 44.914,
      "lon": -0.244,
      "department": "Gironde",
      "region": "Nouvelle-Aquitaine"
    },
    "bordeaux": {
      "name": "Bordeaux",
      "lat": 44.838,
      "lon": -0.579,
      "department": "Gironde",
      "region": "Nouvelle-Aquitaine"
    },
    "bayonne": {
      "name": "Bayonne",
      "lat": 43.493,
      "lon": -1.475,
      "department": "Pyrénées-Atlantiques",
      "region": "Nouvelle-Aquitaine"
    },
    "strasbourg": {
      "name": "Strasbourg",
      "lat": 48.583,
      "lon": 7.745,
      "department": "Bas-Rhin",
      "region": "Grand Est"
    },
    "rennes": {
      "name": "Rennes",
      "lat": 48.112,
      "lon": -1.68,
      "department": "Ille-et-Vilaine",
      "region": "Bretagne"
    },
    "brest": {
      "name": "Brest",
      "lat": 48.39,
      "lon": -4.486,
      "department": "Finistère",
      "region": "Bretagne"
    },
    "marseille": {
      "name": "Marseille",
      "lat": 43.296,
      "lon": 5.369,
      "department": "Bouches-du-Rhône",
      "region": "Provence-Alpes-Côte d’Azur"
    },
    "nice": {
      "name": "Nice",
      "lat": 43.71,
      "lon": 7.262,
      "department": "Alpes-Maritimes",
      "region": "Provence-Alpes-Côte d’Azur"
    },
    "montpellier": {
      "name": "Montpellier",
      "lat": 43.611,
      "lon": 3.877,
      "department": "Hérault",
      "region": "Occitanie"
    },
    "toulouse": {
      "name": "Toulouse",
      "lat": 43.604,
      "lon": 1.444,
      "department": "Haute-Garonne",
      "region": "Occitanie"
    },
    "lille": {
      "name": "Lille",
      "lat": 50.629,
      "lon": 3.057,
      "department": "Nord",
      "region": "Hauts-de-France"
    },
    "lyon": {
      "name": "Lyon",
      "lat": 45.764,
      "lon": 4.835,
      "department": "Rhône",
      "region": "Auvergne-Rhône-Alpes"
    },
    "grenoble": {
      "name": "Grenoble",
      "lat": 45.188,
      "lon": 5.724,
      "department": "Isère",
      "region": "Auvergne-Rhône-Alpes"
    },
    "dijon": {
      "name": "Dijon",
      "lat": 47.322,
      "lon": 5.041,
      "department": "Côte-d’Or",
      "region": "Bourgogne-Franche-Comté"
    },
    "besancon": {
      "name": "Besançon",
      "lat": 47.238,
      "lon": 6.024,
      "department": "Doubs",
      "region": "Bourgogne-Franche-Comté"
    },
    "clermont": {
      "name": "Clermont-Ferrand",
      "lat": 45.778,
      "lon": 3.087,
      "department": "Puy-de-Dôme",
      "region": "Auvergne-Rhône-Alpes"
    },
    "limoges": {
      "name": "Limoges",
      "lat": 45.834,
      "lon": 1.262,
      "department": "Haute-Vienne",
      "region": "Nouvelle-Aquitaine"
    },
    "amiens": {
      "name": "Amiens",
      "lat": 49.895,
      "lon": 2.295,
      "department": "Somme",
      "region": "Hauts-de-France"
    },
    "reims": {
      "name": "Reims",
      "lat": 49.258,
      "lon": 4.032,
      "department": "Marne",
      "region": "Grand Est"
    },
    "caen": {
      "name": "Caen",
      "lat": 49.182,
      "lon": -0.37,
      "department": "Calvados",
      "region": "Normandie"
    },
    "rouen": {
      "name": "Rouen",
      "lat": 49.443,
      "lon": 1.099,
      "department": "Seine-Maritime",
      "region": "Normandie"
    },
    "nantes": {
      "name": "Nantes",
      "lat": 47.218,
      "lon": -1.554,
      "department": "Loire-Atlantique",
      "region": "Pays de la Loire"
    },
    "nancy": {
      "name": "Nancy",
      "lat": 48.693,
      "lon": 6.183,
      "department": "Meurthe-et-Moselle",
      "region": "Grand Est"
    },
    "paris": {
      "name": "Paris",
      "lat": 48.857,
      "lon": 2.352,
      "department": "Paris",
      "region": "Île-de-France"
    }
  },
  "rounds": {
    "1_apero_local": [
      {
        "id": "L01",
        "prompt": "Coutras, où se trouve l’E2C, est…",
        "options": [
          "une commune",
          "un département",
          "une région"
        ],
        "answerIndex": 0,
        "explanation": "Coutras est une commune de Gironde."
      },
      {
        "id": "L02",
        "prompt": "Dans quel département se trouve Coutras ?",
        "options": [
          "Dordogne",
          "Gironde",
          "Landes"
        ],
        "answerIndex": 1,
        "explanation": "Coutras est en Gironde (33)."
      },
      {
        "id": "L03",
        "prompt": "Quel est le numéro du département de la Gironde ?",
        "options": [
          "24",
          "47",
          "33"
        ],
        "answerIndex": 2,
        "explanation": "La Gironde porte le numéro 33."
      },
      {
        "id": "L04",
        "prompt": "Dans quelle région se trouve le département de la Gironde ?",
        "options": [
          "Occitanie",
          "Nouvelle-Aquitaine",
          "Grand Est"
        ],
        "answerIndex": 1,
        "explanation": "La Gironde fait partie de la Nouvelle-Aquitaine."
      },
      {
        "id": "L05",
        "prompt": "Libourne et Bordeaux sont deux villes…",
        "options": [
          "du même département",
          "de deux pays différents",
          "de deux régions différentes"
        ],
        "answerIndex": 0,
        "explanation": "Ces deux villes sont situées en Gironde."
      },
      {
        "id": "L06",
        "prompt": "Quelle suite va du plus petit territoire au plus grand ?",
        "options": [
          "France → Gironde → Coutras → Nouvelle-Aquitaine",
          "Coutras → Gironde → Nouvelle-Aquitaine → France",
          "Gironde → France → Coutras → Nouvelle-Aquitaine"
        ],
        "answerIndex": 1,
        "explanation": "Commune → département → région → pays."
      }
    ],
    "2_a_quelle_sauce": [
      {
        "id": "S01",
        "team": "A",
        "dish": "Canelé",
        "clues": [
          "Petite pâtisserie dorée, croustillante à l’extérieur et moelleuse à l’intérieur.",
          "Son goût évoque la vanille et le rhum.",
          "Elle est particulièrement associée à la ville de Bordeaux."
        ],
        "options": [
          "Bretagne",
          "Nouvelle-Aquitaine",
          "Normandie",
          "Grand Est"
        ],
        "answerIndex": 1,
        "associatedCity": "Bordeaux",
        "associatedDepartment": "Gironde",
        "explanation": "Une spécialité traditionnellement associée à Bordeaux."
      },
      {
        "id": "S02",
        "team": "B",
        "dish": "Kouign-amann",
        "clues": [
          "Gâteau très riche en beurre et en sucre, à la pâte feuilletée et caramélisée.",
          "Son nom vient du breton.",
          "On l’associe notamment à Douarnenez, dans le Finistère."
        ],
        "options": [
          "Pays de la Loire",
          "Normandie",
          "Bretagne",
          "Occitanie"
        ],
        "answerIndex": 2,
        "associatedCity": "Douarnenez",
        "associatedDepartment": "Finistère",
        "explanation": "Pâtisserie emblématique de Bretagne, souvent associée à Douarnenez."
      },
      {
        "id": "S03",
        "team": "A",
        "dish": "Cassoulet",
        "clues": [
          "Plat mijoté avec haricots blancs et viandes, servi bien chaud.",
          "Il est célèbre dans le Sud-Ouest.",
          "Castelnaudary, dans l’Aude, en revendique une tradition."
        ],
        "options": [
          "Occitanie",
          "Nouvelle-Aquitaine",
          "Bretagne",
          "Grand Est"
        ],
        "answerIndex": 0,
        "associatedCity": "Castelnaudary",
        "associatedDepartment": "Aude",
        "explanation": "Le cassoulet est notamment associé à Castelnaudary (Occitanie)."
      },
      {
        "id": "S04",
        "team": "B",
        "dish": "Quiche lorraine",
        "clues": [
          "Tarte salée à base de pâte, œufs, crème et lardons.",
          "Son nom évoque directement une ancienne région historique française.",
          "Nancy et Metz se situent dans la grande région actuelle à retrouver."
        ],
        "options": [
          "Centre-Val de Loire",
          "Bourgogne-Franche-Comté",
          "Hauts-de-France",
          "Grand Est"
        ],
        "answerIndex": 3,
        "associatedCity": "Nancy / Metz",
        "associatedDepartment": "Meurthe-et-Moselle / Moselle",
        "explanation": "La Lorraine est un territoire historique appartenant aujourd’hui au Grand Est."
      },
      {
        "id": "S05",
        "team": "A",
        "dish": "Bouillabaisse",
        "clues": [
          "Soupe/plat de poissons, traditionnellement préparé dans un port méditerranéen.",
          "Le littoral concerné est baigné par la mer Méditerranée.",
          "Cette spécialité est associée à Marseille."
        ],
        "options": [
          "Nouvelle-Aquitaine",
          "Provence-Alpes-Côte d’Azur",
          "Occitanie",
          "Corse"
        ],
        "answerIndex": 1,
        "associatedCity": "Marseille",
        "associatedDepartment": "Bouches-du-Rhône",
        "explanation": "La bouillabaisse est liée à Marseille et à la Provence."
      },
      {
        "id": "S06",
        "team": "B",
        "dish": "Escargots à la bourguignonne",
        "clues": [
          "Escargots servis traditionnellement avec du beurre, de l’ail et du persil.",
          "Le nom de cette recette renvoie à une ancienne région viticole.",
          "Cette région historique a fusionné avec la Franche-Comté."
        ],
        "options": [
          "Bretagne",
          "Île-de-France",
          "Bourgogne-Franche-Comté",
          "Normandie"
        ],
        "answerIndex": 2,
        "associatedCity": "Bourgogne (territoire historique)",
        "associatedDepartment": "Plusieurs départements possibles",
        "explanation": "Les escargots à la bourguignonne sont associés à la Bourgogne, aujourd’hui en Bourgogne-Franche-Comté."
      }
    ],
    "3_gps_en_pls": [
      {
        "id": "G02",
        "team": "B",
        "delivery": "Commande de galettes à livrer à Rennes.",
        "targetCityId": "rennes",
        "candidateCityIds": [
          "brest",
          "nantes",
          "caen",
          "rennes"
        ],
        "regionOptions": [
          "Pays de la Loire",
          "Bretagne",
          "Normandie",
          "Nouvelle-Aquitaine"
        ],
        "regionAnswerIndex": 1,
        "explanation": "Rennes se trouve dans le département Ille-et-Vilaine, en région Bretagne."
      },
      {
        "id": "G01",
        "team": "A",
        "delivery": "Commande de tarte flambée à livrer à Strasbourg.",
        "targetCityId": "strasbourg",
        "candidateCityIds": [
          "lille",
          "rennes",
          "strasbourg",
          "lyon"
        ],
        "regionOptions": [
          "Grand Est",
          "Bretagne",
          "Hauts-de-France",
          "Normandie"
        ],
        "regionAnswerIndex": 0,
        "explanation": "Strasbourg se trouve dans le département Bas-Rhin, en région Grand Est."
      },
      {
        "id": "G04",
        "team": "B",
        "delivery": "Commande de cassoulet à livrer à Toulouse.",
        "targetCityId": "toulouse",
        "candidateCityIds": [
          "bordeaux",
          "limoges",
          "toulouse",
          "montpellier"
        ],
        "regionOptions": [
          "Nouvelle-Aquitaine",
          "Grand Est",
          "Auvergne-Rhône-Alpes",
          "Occitanie"
        ],
        "regionAnswerIndex": 3,
        "explanation": "Toulouse se trouve dans le département Haute-Garonne, en région Occitanie."
      },
      {
        "id": "G03",
        "team": "A",
        "delivery": "Commande de bouillabaisse à livrer à Marseille.",
        "targetCityId": "marseille",
        "candidateCityIds": [
          "marseille",
          "nice",
          "montpellier",
          "lyon"
        ],
        "regionOptions": [
          "Occitanie",
          "Corse",
          "Provence-Alpes-Côte d’Azur",
          "Nouvelle-Aquitaine"
        ],
        "regionAnswerIndex": 2,
        "explanation": "Marseille se trouve dans le département Bouches-du-Rhône, en région Provence-Alpes-Côte d’Azur."
      },
      {
        "id": "G06",
        "team": "B",
        "delivery": "Commande de gaufres à livrer à Lille.",
        "targetCityId": "lille",
        "candidateCityIds": [
          "reims",
          "lille",
          "amiens",
          "strasbourg"
        ],
        "regionOptions": [
          "Normandie",
          "Grand Est",
          "Hauts-de-France",
          "Île-de-France"
        ],
        "regionAnswerIndex": 2,
        "explanation": "Lille se trouve dans le département Nord, en région Hauts-de-France."
      },
      {
        "id": "G05",
        "team": "A",
        "delivery": "Commande de quenelles à livrer à Lyon.",
        "targetCityId": "lyon",
        "candidateCityIds": [
          "grenoble",
          "clermont",
          "dijon",
          "lyon"
        ],
        "regionOptions": [
          "Auvergne-Rhône-Alpes",
          "Bourgogne-Franche-Comté",
          "Grand Est",
          "Occitanie"
        ],
        "regionAnswerIndex": 0,
        "explanation": "Lyon se trouve dans le département Rhône, en région Auvergne-Rhône-Alpes."
      }
    ],
    "4_passeport_gourmand": [
      {
        "id": "M01",
        "dish": "Sushi",
        "country": "Japon",
        "continent": "Asie",
        "countryOptions": [
          "Japon",
          "Thaïlande",
          "Mexique",
          "Italie"
        ],
        "countryAnswerIndex": 0,
        "continentOptions": [
          "Afrique",
          "Asie",
          "Europe",
          "Océanie"
        ],
        "continentAnswerIndex": 1,
        "explanation": "Le sushi est fortement associé à la cuisine japonaise."
      },
      {
        "id": "M02",
        "dish": "Tajine",
        "country": "Maroc",
        "continent": "Afrique",
        "countryOptions": [
          "Espagne",
          "Maroc",
          "Inde",
          "Pologne"
        ],
        "countryAnswerIndex": 1,
        "continentOptions": [
          "Asie",
          "Europe",
          "Afrique",
          "Amérique du Sud"
        ],
        "continentAnswerIndex": 2,
        "explanation": "Le tajine est notamment associé à la cuisine marocaine, ainsi qu’aux cuisines du Maghreb."
      },
      {
        "id": "M03",
        "dish": "Tacos al pastor",
        "country": "Mexique",
        "continent": "Amérique du Nord",
        "countryOptions": [
          "Portugal",
          "Pologne",
          "Mexique",
          "Japon"
        ],
        "countryAnswerIndex": 2,
        "continentOptions": [
          "Amérique du Sud",
          "Afrique",
          "Europe",
          "Amérique du Nord"
        ],
        "continentAnswerIndex": 3,
        "explanation": "Les tacos al pastor sont une spécialité mexicaine. Le Mexique est en Amérique du Nord."
      },
      {
        "id": "M04",
        "dish": "Pierogi",
        "country": "Pologne",
        "continent": "Europe",
        "countryOptions": [
          "Canada",
          "Italie",
          "Pologne",
          "Inde"
        ],
        "countryAnswerIndex": 2,
        "continentOptions": [
          "Europe",
          "Asie",
          "Amérique du Nord",
          "Océanie"
        ],
        "continentAnswerIndex": 0,
        "explanation": "Les pierogi sont particulièrement associés à la Pologne et se trouvent aussi dans plusieurs pays voisins."
      }
    ],
    "5_coup_de_feu": {
      "A": [
        {
          "id": "F01",
          "team": "A",
          "targetCityId": "bayonne",
          "order": "Livraison de gâteau basque",
          "departmentOptions": [
            "Pyrénées-Atlantiques",
            "Gironde",
            "Landes"
          ],
          "departmentAnswerIndex": 0,
          "regionOptions": [
            "Bretagne",
            "Nouvelle-Aquitaine",
            "Occitanie"
          ],
          "regionAnswerIndex": 1,
          "explanation": "Bayonne → Pyrénées-Atlantiques → Nouvelle-Aquitaine."
        },
        {
          "id": "F02",
          "team": "A",
          "targetCityId": "brest",
          "order": "Livraison de crêpes",
          "departmentOptions": [
            "Loire-Atlantique",
            "Finistère",
            "Morbihan"
          ],
          "departmentAnswerIndex": 1,
          "regionOptions": [
            "Bretagne",
            "Normandie",
            "Pays de la Loire"
          ],
          "regionAnswerIndex": 0,
          "explanation": "Brest → Finistère → Bretagne."
        },
        {
          "id": "F03",
          "team": "A",
          "targetCityId": "dijon",
          "order": "Livraison de pain d’épices",
          "departmentOptions": [
            "Doubs",
            "Côte-d’Or",
            "Jura"
          ],
          "departmentAnswerIndex": 1,
          "regionOptions": [
            "Grand Est",
            "Bourgogne-Franche-Comté",
            "Auvergne-Rhône-Alpes"
          ],
          "regionAnswerIndex": 1,
          "explanation": "Dijon → Côte-d’Or → Bourgogne-Franche-Comté."
        },
        {
          "id": "F04",
          "team": "A",
          "targetCityId": "caen",
          "order": "Livraison de teurgoule",
          "departmentOptions": [
            "Calvados",
            "Seine-Maritime",
            "Manche"
          ],
          "departmentAnswerIndex": 0,
          "regionOptions": [
            "Bretagne",
            "Pays de la Loire",
            "Normandie"
          ],
          "regionAnswerIndex": 2,
          "explanation": "Caen → Calvados → Normandie."
        },
        {
          "id": "F05",
          "team": "A",
          "targetCityId": "nancy",
          "order": "Livraison de quiche lorraine",
          "departmentOptions": [
            "Moselle",
            "Bas-Rhin",
            "Meurthe-et-Moselle"
          ],
          "departmentAnswerIndex": 2,
          "regionOptions": [
            "Bourgogne-Franche-Comté",
            "Grand Est",
            "Hauts-de-France"
          ],
          "regionAnswerIndex": 1,
          "explanation": "Nancy → Meurthe-et-Moselle → Grand Est."
        }
      ],
      "B": [
        {
          "id": "F06",
          "team": "B",
          "targetCityId": "bordeaux",
          "order": "Livraison de canelés",
          "departmentOptions": [
            "Dordogne",
            "Gironde",
            "Landes"
          ],
          "departmentAnswerIndex": 1,
          "regionOptions": [
            "Occitanie",
            "Nouvelle-Aquitaine",
            "Pays de la Loire"
          ],
          "regionAnswerIndex": 1,
          "explanation": "Bordeaux → Gironde → Nouvelle-Aquitaine."
        },
        {
          "id": "F07",
          "team": "B",
          "targetCityId": "rennes",
          "order": "Livraison de galettes bretonnes",
          "departmentOptions": [
            "Finistère",
            "Morbihan",
            "Ille-et-Vilaine"
          ],
          "departmentAnswerIndex": 2,
          "regionOptions": [
            "Normandie",
            "Bretagne",
            "Pays de la Loire"
          ],
          "regionAnswerIndex": 1,
          "explanation": "Rennes → Ille-et-Vilaine → Bretagne."
        },
        {
          "id": "F08",
          "team": "B",
          "targetCityId": "besancon",
          "order": "Livraison de comté",
          "departmentOptions": [
            "Jura",
            "Doubs",
            "Côte-d’Or"
          ],
          "departmentAnswerIndex": 1,
          "regionOptions": [
            "Bourgogne-Franche-Comté",
            "Grand Est",
            "Auvergne-Rhône-Alpes"
          ],
          "regionAnswerIndex": 0,
          "explanation": "Besançon → Doubs → Bourgogne-Franche-Comté."
        },
        {
          "id": "F09",
          "team": "B",
          "targetCityId": "rouen",
          "order": "Livraison de teurgoule",
          "departmentOptions": [
            "Calvados",
            "Seine-Maritime",
            "Eure"
          ],
          "departmentAnswerIndex": 1,
          "regionOptions": [
            "Normandie",
            "Bretagne",
            "Hauts-de-France"
          ],
          "regionAnswerIndex": 0,
          "explanation": "Rouen → Seine-Maritime → Normandie."
        },
        {
          "id": "F10",
          "team": "B",
          "targetCityId": "strasbourg",
          "order": "Livraison de choucroute",
          "departmentOptions": [
            "Haut-Rhin",
            "Bas-Rhin",
            "Moselle"
          ],
          "departmentAnswerIndex": 1,
          "regionOptions": [
            "Grand Est",
            "Bourgogne-Franche-Comté",
            "Île-de-France"
          ],
          "regionAnswerIndex": 0,
          "explanation": "Strasbourg → Bas-Rhin → Grand Est."
        }
      ]
    }
  },
  "points": {
    "duel_local_correct": 10,
    "indice_points_by_clue_index": [
      20,
      15,
      10
    ],
    "stolen_response": 5,
    "gps_pin_correct": 10,
    "gps_region_correct": 5,
    "monde_country_correct": 10,
    "monde_continent_correct": 5,
    "final_bon_complet": 10,
    "joker_multiplier": 2
  },
  "final_seconds_per_team": 90
};
