# Samantha Wynne — Portfolio

A responsive, interactive portfolio based on Samantha Hannah Wynne's résumé. Built with semantic HTML, CSS, vanilla JavaScript, and Vite.

**Public website:** <https://samantha-hannah-wynne.github.io/>

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use `npm run build` to create the production site in `dist`, and `npm run preview` to preview it.

## Content and interactions

- Résumé-based projects, education, experience, skills, and contact details.
- Original CSS project artwork and an animated, pointer-responsive orbital sculpture.
- Project filters and accessible native-dialog project explorers.
- Illustrative traffic-signal, expense-tracker, branching-story, and responsive-design demos. These are clearly identified as portfolio concept demos, not the original project builds.
- Complete ivory/sage/lavender light palette and original dark palette. The theme follows the OS until explicitly changed and remembers that choice in local storage.
- A short personal story about moving from Chennai to Ireland at 17 to pursue computer science.
- Live Ravaged and original website links in the work section and project explorers, email copying, Dublin local time, mobile navigation, and downloadable résumé.
- Live project cards navigate directly to their websites; separate buttons retain the concept demos. External links, including LinkedIn, use same-tab navigation so embedded previews do not depend on popup/new-window support.
- Keyboard navigation, focus management, reduced-motion support, and responsive layouts.

Page content lives in `index.html`; project details and demos are in `src/main.js`; styling is in `src/style.css`. The original résumé is served from `public/samantha-wynne-resume.pdf`.

The site uses Google Fonts with local fallback fonts. There are no analytics, accounts, server APIs, or form submissions. Expense demo entries stay in memory and reset when the project is reopened.

Responsive layouts adapt to narrow and wide viewports, portrait and landscape, short windows, and zoomed layouts. Project dialogs remain scrollable within the available viewport; decorative artwork does not dictate the width of readable content.

## Ravaged

The Python game and browser edition are maintained separately at <https://github.com/Samantha-Hannah-Wynne/Ravaged>, with their own setup instructions and regression tests. The portfolio links to the game at <https://samantha-hannah-wynne.github.io/Ravaged/>; the game is not bundled or deployed with the portfolio.

## Deployment

The source repository is <https://github.com/Samantha-Hannah-Wynne/Samantha-Hannah-Wynne.github.io>.

GitHub Pages uses **GitHub Actions** as its deployment source. `.github/workflows/deploy.yml` installs locked dependencies with Node.js 22, builds the site, and publishes only `dist`. Every push to `main` deploys the latest version; the workflow can also be run manually from the Actions tab.

To update the site, change the source files, run `npm run build`, and push the changes to `main`. The public URL stays the same. Do not commit `node_modules`, `dist`, credentials, or the separately maintained Ravaged game.

The downloadable résumé intentionally includes the contact details in the supplied PDF. Replace `public/samantha-wynne-resume.pdf` when you update the résumé.
