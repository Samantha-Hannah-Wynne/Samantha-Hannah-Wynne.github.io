# Little Layer Studio owner photo workflow

Bookmark the owner tool:

`https://samantha-hannah-wynne.github.io/little-layer-studio/owner-photo-desk.html`

The page resizes one photo into two WebP files, strips the original photo metadata and generates the exact gallery-card HTML. Processing happens locally in the browser.

Publishing remains protected by GitHub:

1. Prepare and download the three generated files.
2. Sign in to the `Samantha-Hannah-Wynne` GitHub account.
3. Upload both WebP files to `public/little-layer-studio/assets/prints/`.
4. Edit `public/little-layer-studio/index.html`.
5. Search for `OWNER PHOTO CARDS` and paste the generated card immediately above that marker.
6. Commit the changes. GitHub Pages deploys automatically.

The tool does not request or store a GitHub password or token. Anyone can technically open the preparation page, but only a GitHub user with write access to the repository can publish changes.
