# Our Scratch Globe

A scratch-off desk globe for logging your travels, with photos, notes, a timeline and a journey animation. It installs as an app on your phone and works offline.

## Run locally
    python3 -m http.server 8000   # http://localhost:8000

## Put it on your phone (GitHub Pages)
1. Open https://github.com/MihailKKostov/Globe/settings/pages (on a phone, switch Chrome to "Desktop site" first).
2. Source: "Deploy from a branch", choose this branch and `/ (root)`, Save. Free GitHub accounts need the repo to be public for Pages.
3. Open `https://mihailkkostov.github.io/Globe/` in Chrome on Android, then ⋮ → "Install app".

Your private globe lives in the browser on that device; back it up from ✒ → Export backup.

## Shared globes (Google sign-in, friends)

Friends can sign in with Google, join a globe through an invite link, and all see each other's trips, notes and photos live, with a list of who is on the globe and who is exploring it right now. This needs a free Firebase project, set up once:

1. Go to https://console.firebase.google.com and **create a project** (any name, e.g. `scratch-globe`; Google Analytics is not needed).
2. **Authentication** → Get started → Sign-in method → **Google** → Enable → pick your support email → Save.
3. **Authentication** → Settings → **Authorized domains** → Add domain → `mihailkkostov.github.io`.
4. **Firestore Database** → Create database → pick a location near you → start in **production mode**.
5. Firestore → **Rules** tab → replace everything with the contents of [`firestore.rules`](firestore.rules) → **Publish**.
6. Project settings (⚙) → General → Your apps → **Web** (`</>`) → register an app (no Hosting needed) → copy the `firebaseConfig` values.
7. Edit [`firebase-config.js`](firebase-config.js) on GitHub (pencil icon) and replace `null` with those values, then commit.

Open the app, tap **Sign in**, create a shared globe and use **Share** to send the invite link. You can copy your private globe onto a shared one from the same page.

Notes:
- Anyone who has an invite link can join that globe; the owner can remove people from the Friends page.
- Photos are stored compressed inside the database, so no paid plan is needed. The free tier holds roughly 1,500–2,000 photos per project.
- The Firebase config in `firebase-config.js` is not secret; the rules in `firestore.rules` are what protect your data.

## Testing shared globes locally
`firebase emulators:start --only auth,firestore --project demo-globe` runs Auth and Firestore with the real rules; set `emulators: true` in a test config to point the app at them.
