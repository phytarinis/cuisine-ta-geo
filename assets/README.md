# Cartographie locale

Contours : Natural Earth, Admin 0 Countries, échelle 1:50m, domaine public.
Source : https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson
Téléchargée le 10 novembre 2026 ; aucune requête nécessaire pendant le jeu.

France : polygones métropolitains du pays France, Corse comprise. Projection équirectangulaire adaptée : x=(longitude+5,5)×40 ; y=(51,5−latitude)×60. ViewBox 640×660. Le facteur vertical correspond approximativement à la compensation de latitude moyenne de la France. Les repères utilisent exactement la même transformation dans app.js.

Monde : tous les polygones des pays, projection équirectangulaire x=(longitude+180)×2 ; y=(90−latitude)×2, viewBox 720×360. Points représentatifs intérieurs : Japon 138°E/37°N, Maroc 7°O/32°N, Mexique 102°O/23°N, Pologne 19°E/52°N. Ce sont des repères de pays, pas des capitales.

Les SVG contiennent des contours réels simplifiés à l'échelle de la source, et non des illustrations inventées. Les étiquettes A/B/C/D viennent des coordonnées lat/lon canoniques des villes ; elles se redimensionnent avec le même viewBox.

Pour régénérer les cartes après téléchargement du GeoJSON source : depuis la racine du dépôt, `python3 tools/build_maps.py /chemin/vers/ne_50m_admin_0_countries.geojson`. Python n'est utile qu'au développement, jamais pour jouer.
