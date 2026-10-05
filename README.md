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
- Three full-width software project showcases alternate artwork and copy, with scroll reveals and animated project illustrations instead of a four-slot grid. Animations respect the pause control and reduced-motion preferences; filters keep the remaining cards full-width.
- Illustrative traffic-signal, expense-tracker, branching-story, and responsive-design demos. These are clearly identified as portfolio concept demos, not the original project builds.
- Complete ivory/sage/lavender light palette and original dark palette. The theme follows the OS until explicitly changed and remembers that choice in local storage.
- A short personal story about moving from Chennai to Ireland at 17 to pursue computer science.
- A dedicated `#analytics` section with logistics experience, expandable analytics skills, related work, and an analytics-specific contact link. Navigation, introductory copy, and metadata cover both software development and data analytics.
- Separate software and data analytics CV downloads, preserving the original PDFs. Analytics content is based on the supplied résumé, with no invented performance metrics or employer data.
- Both PDFs are current, role-specific CVs. Software Development contains the traffic-light system, Ravaged, and web project with the software CV. Expense Tracker appears only in Data Analytics, alongside the analytics CV; software filters do not affect it.
- Extracurricular recognition cards expand to show the résumé-listed Best Debater competitions and H.H Radha Devi Award. These are portfolio designs, not fabricated certificate scans.
- Interactive volunteering postcards cover JOG’24 and Me to We, using native details/summary controls that support touch, keyboard, and use without JavaScript.
- The `#badges` gallery includes two AWS Educate training badges (Compute and Storage) and three Anthropic completion certificates (AI Capabilities and Limitations, Claude Code 101, and Claude 101). Each links directly to Samantha's verified Credly or Skilljar credential, without LinkedIn redirects. Official artwork is stored locally under `public/credentials/` so expiring Skilljar image URLs do not break the gallery. AWS training badges are not presented as AWS professional certifications.
- Live Ravaged and original website links in the work section and project explorers, email copying, Dublin local time, mobile navigation, and downloadable résumé.
- Live project cards navigate directly to their websites; separate buttons retain the concept demos. External links, including LinkedIn, use same-tab navigation so embedded previews do not depend on popup/new-window support.
- Keyboard navigation, focus management, reduced-motion support, and responsive layouts.

Page content lives in `index.html`; project details and demos are in `src/main.js`; styling is in `src/style.css`. The original résumé is served from `public/samantha-wynne-resume.pdf`.
The data analytics résumé is served from `public/samantha-wynne-data-analytics-cv.pdf`. The existing Expense Tracker concept demo is reused in the analytics section; it is not presented as a production analytics dashboard.

The site uses Google Fonts with local fallback fonts. There are no analytics, accounts, server APIs, or form submissions. Expense demo entries stay in memory and reset when the project is reopened.

Responsive layouts adapt to narrow and wide viewports, portrait and landscape, short windows, and zoomed layouts. Project dialogs remain scrollable within the available viewport; decorative artwork does not dictate the width of readable content.

## Ravaged

The Python game and browser edition are maintained separately at <https://github.com/Samantha-Hannah-Wynne/Ravaged>, with their own setup instructions and regression tests. The portfolio links to the game at <https://samantha-hannah-wynne.github.io/Ravaged/>; the game is not bundled or deployed with the portfolio.

## Deployment

### Little Layer Studio

The separate 3D-printing hobby website lives in `public/little-layer-studio/` and is published at <https://samantha-hannah-wynne.github.io/little-layer-studio/>. Vite copies this self-contained static site into `dist/little-layer-studio/`; the personal portfolio at the root is unchanged.

Edit the studio's `index.html`, `contact.html`, `references.html`, `site.css`, and `site.js` within that folder. Its assets include original digital product mockups and four downloadable preview brochures. Images are not finished-print photos, prices are indicative, and orders are not open. The approved public WhatsApp contact is configured in `contact.html` and `site.js`. The optional message builder opens a WhatsApp draft; it does not submit a website form or send a message automatically.

Only the customer-facing studio site is included. Owner pricing notes, planning guides, development tooling and authentication files must not be added to this repository.

### Publishing both sites

The source repository is <https://github.com/Samantha-Hannah-Wynne/Samantha-Hannah-Wynne.github.io>.

GitHub Pages uses **GitHub Actions** as its deployment source. `.github/workflows/deploy.yml` installs locked dependencies with Node.js 22, builds the site, and publishes only `dist`. Every push to `main` deploys the latest version; the workflow can also be run manually from the Actions tab.

To update the site, change the source files, run `npm run build`, and push the changes to `main`. The public URL stays the same. Do not commit `node_modules`, `dist`, credentials, or the separately maintained Ravaged game.

The downloadable résumés intentionally include the contact details in the supplied PDFs. Replace `public/samantha-wynne-resume.pdf` or `public/samantha-wynne-data-analytics-cv.pdf` when you update the corresponding résumé.
