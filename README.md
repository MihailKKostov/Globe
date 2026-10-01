# Our Scratch Globe

A scratch-off world map for two, installable as an app. Everything it needs is in this repo (no CDN), so it works offline once opened.

## Run locally
    python3 -m http.server 8000   # http://localhost:8000

## Put it on your phone (GitHub Pages)
1. Repo → Settings → Pages → Source "Deploy from a branch", pick this branch, folder `/ (root)`, Save.
2. Open `https://<user>.github.io/<repo>/` in Chrome on Android.
3. Chrome menu (⋮) → "Install app" / "Add to Home screen".

Trips and photos live in the browser's storage on that device/origin, so always use the same URL, and back up via ⚙ → Export.
