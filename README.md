# Our Scratch Globe

A single-file scratch-off world map for two. Open it through any static server:

    python3 -m http.server 8000   # then visit http://localhost:8000

Needs internet on first load for d3, topojson and the map data (CDN). Trips and photos are saved in the browser (IndexedDB); use ⚙ → Export to back them up.
