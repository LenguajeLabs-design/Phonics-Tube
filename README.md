# Phonics Tube

A cobalt blue, warm yellow and coral phonics library inspired by HackerTube, organised around the 128-lesson UFLI Foundations scope and sequence.

## Run

No build step or dependencies. Run `python3 -m http.server 4173 --directory dist`, then visit http://localhost:4173.

## Included

164 video links with researched listed runtimes under five minutes; six original word-card activities; all 128 lessons with explicit resource gaps; search, category filters, sorting, eight playlists, grid/list views, browser-local bookmarks and history, and practice-only mode.

## Content and China access

Edit the catalog in `dist/data.js`. Interface titles are descriptive learning titles. Listed runtimes were checked on YouTube; complete instructional review is pending. Some videos cover multiple lessons; preview them and read their alignment notes before assigning.

No third-party video has been downloaded or rehosted. Permission has not been obtained. Only set `directUrl` and `permission: 'granted'` after obtaining necessary rights. Store permission records outside this public repository. The player can serve an authorised direct video file instead of YouTube.

All CSS, JavaScript and illustrations are local. No remote fonts, thumbnails, analytics or CDN libraries. YouTube connects only when a visitor explicitly loads a player. Original word practice uses no external media. Mainland China accessibility of the hosting and video delivery still requires testing on real networks; coordinate mainland hosting requirements with school IT.

Practice is original supplemental material, not a reproduction of UFLI lessons. This is an independent resource, not an official UFLI product. UFLI Foundations is a program of the University of Florida Literacy Institute. Sequence reference: https://ufli.education.ufl.edu/foundations/toolbox/

## Deploy

GitHub Pages serves `index.html` from the main branch root, using assets in `dist/`. Serve `dist/` directly with other static hosting providers. `.openai/hosting.json` configures the private Sites preview. No API keys, accounts or backend needed.

## Validate

Run `node tests/catalog.test.cjs`. Browser QA covers lesson search, bookmarks, lesson gaps, practice progression, mobile layouts and click-to-load players.


## Expanded sound catalog

The expanded catalog contains 164 clips with listed runtimes at or below five minutes, checked on 19 November 2026. Coverage includes individual alphabet sounds, vowel teams, digraphs, VCe, r-controlled vowels, spelling rules and affixes. Exact supporting lesson arrays avoid treating a noncontiguous set of review lessons as a continuous range. Accent notes and partial-coverage cautions appear in the player. Full video instructional review is still pending. Lessons 5 and 10 currently have original practice rather than a suitably restricted video.

See `CATALOG-SOURCES.md` for the research and duration evidence.
