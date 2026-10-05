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
- A compact 3D-printing hobby section below the personal story introduces Little Layer Studio and links to `/little-layer-studio/`. It shares the portfolio's light/dark palette and responsive layout without changing the software project filters.
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

Edit the studio's `index.html`, `contact.html`, `references.html`, `site.css`, and `site.js` within that folder. The `#printed` gallery contains 9 photos of Samantha's finished prints, separate from the 24 digital concept mockups and four downloadable preview brochures. One photo each is retained for the flip calendar and MagSafe charger. The purple piece is a key stand; the Halloween project is a spooky baking kit. Samantha identifies the charging hardware as Apple-certified with up to 25W charging; the caption distinguishes that hardware from the printed housing and qualifies charging speed by device and adapter compatibility. The baking-kit photo does not establish food-contact suitability. The hero and concept collections remain labelled mockups, and prices are indicative. New print requests are reviewed individually before confirming feasibility, price and timing; the toy concepts still require the applicable safety work. Collection is available by private arrangement, with the address shared directly, and delivery is available in Dublin subject to agreeing the area, charge and timing. The approved public WhatsApp contact is configured in `contact.html` and `site.js`. The optional message builder opens a WhatsApp draft; it does not submit a website form or send a message automatically.

Studio website copy uses no em dashes. Responsive layouts cover phone, tablet and desktop widths and portrait/landscape orientations. Navigation links have a minimum 44px touch height, touch devices avoid hover movement, and reduced-motion preferences are respected. Customer reviews are not included yet.

The bundle calculator uses only the 24 priced concept designs, not the finished-print gallery. Visitors can mix categories, change quantities and remove selections. Quantities count the listed unit (an individual item, pair or set), and totals use the indicative item prices without automatic bundle discounts or delivery/customisation charges. The WhatsApp enquiry draft includes each selected design, its quantity, unit price, line total, overall estimate, fulfilment preference and optional notes. Empty enquiries are disabled. Selections and notes remain in memory only; refreshing starts over, and Clear all also resets the notes and fulfilment preference. The floating summary hides while the calculator is visible so it does not cover the form. There is no checkout, payment or automatic message sending.

`theme.js` and `theme.css` provide light/dark appearance across all three studio pages, including the calculator and photo previews. The initial theme follows the system preference; choosing the header toggle stores only `little-layer-studio-theme` in local storage. The choice survives navigation and reloads. If browser storage is unavailable, a console warning is emitted and the toggle still works for the current page. Photos and digital mockup images retain their original colours. Without JavaScript, the theme toggle and calculator remain hidden, while photo links, brochures and the direct WhatsApp contact remain usable.

Finished-print photos are stored in `assets/prints/` within the studio folder as 640px and 1280px wide WebP files, with orientation applied and EXIF metadata removed. Gallery thumbnails use responsive image sources and lazy loading; each links directly to its larger image without JavaScript. With JavaScript, the shared image dialog shows a photo-specific caption, keeps the whole photograph visible and returns focus when closed. Mockup previews retain their separate disclosure. Do not publish original HEIC files or private location metadata. Portfolio photos are not sale listings or claims of original model authorship.

Only the customer-facing studio site is included. Owner pricing notes, planning guides, development tooling and authentication files must not be added to this repository.

### Publishing both sites

The source repository is <https://github.com/Samantha-Hannah-Wynne/Samantha-Hannah-Wynne.github.io>.

GitHub Pages uses **GitHub Actions** as its deployment source. `.github/workflows/deploy.yml` installs locked dependencies with Node.js 22, builds the site, and publishes only `dist`. Every push to `main` deploys the latest version; the workflow can also be run manually from the Actions tab.

To update the site, change the source files, run `npm run build`, and push the changes to `main`. The public URL stays the same. Do not commit `node_modules`, `dist`, credentials, or the separately maintained Ravaged game.

The downloadable résumés intentionally include the contact details in the supplied PDFs. Replace `public/samantha-wynne-resume.pdf` or `public/samantha-wynne-data-analytics-cv.pdf` when you update the corresponding résumé.
