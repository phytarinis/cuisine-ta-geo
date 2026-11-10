"""Regenerate local SVGs from a Natural Earth GeoJSON, from repository root.

Usage: python3 tools/build_maps.py /path/to/ne_50m_admin_0_countries.geojson
Source and public-domain attribution: assets/README.md.
"""

import json
import sys
from pathlib import Path


def polygons(feature):
    geometry = feature['geometry']
    if geometry['type'] == 'MultiPolygon':
        return geometry['coordinates']
    return [geometry['coordinates']]


def project(lon, lat, france):
    if france:
        return (lon + 5.5) * 40, (51.5 - lat) * 60
    return (lon + 180) * 2, (90 - lat) * 2


def paths(features, france):
    result = []
    for feature in features:
        if france and feature['properties']['ADMIN'] != 'France':
            continue
        for polygon in polygons(feature):
            if france and not all(-6 < x < 10 and 41 < y < 52 for x, y in polygon[0]):
                continue
            rings = []
            for ring in polygon:
                points = [project(x, y, france) for x, y in ring]
                rings.append('M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in points) + ' Z')
            result.append('<path d="' + ' '.join(rings) + '"/>')
    return ''.join(result)


def main():
    with open(sys.argv[1], encoding='utf-8') as source:
        features = json.load(source)['features']
    for france, name, viewbox in [(True, 'france', '0 0 640 660'),
                                  (False, 'monde', '0 0 720 360')]:
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}">'
            f'<title>Carte {name} — Natural Earth, domaine public</title>'
            f'<g fill="#f9f2db" stroke="#6c8898" stroke-width="{1 if france else .35}">'
            + paths(features, france) + '</g></svg>'
        )
        Path(f'assets/{name}.svg').write_text(svg, encoding='utf-8')


if __name__ == '__main__':
    main()
