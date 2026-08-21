# ასობანი

Interactive Georgian reading game for young children (around age 4).

## How it works

1. A picture appears.
2. Empty letter slots show the word to build.
3. The full Georgian alphabet is below.
4. Tap a letter to hear its sound.
5. Drag the letter into the correct slot (or tap letter, then tap a slot).
6. When the word is complete, celebrate and move to the next picture.

## Run locally

Any static file server works. Examples:

```bash
# Python
python3 -m http.server 5173

# Node
npx --yes serve -l 5173
```

Then open `http://localhost:5173`.

## Deploy on GitHub Pages

Settings → Pages → Deploy from branch `main` → `/` (root).

## Tech

- Plain HTML / CSS / JS (no build step)
- Pre-recorded Georgian letter and word audio (`ka-GE` neural voice)
- Pointer-based drag and drop for phones and tablets