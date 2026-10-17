# Elemental

A chemistry explorer with 23 selected elements, a 3D atom inspector, property heatmaps and quizzes.

[Browse the source](https://github.com/thembaxx/Elemental)

## Engineering highlights

Expo web export, React Native Web and Three.js. Bohr-style rings are simplified teaching illustrations; this is distinct from the 118-element Hydromental project.

## Technology

Declared in [package.json](package.json): React `^19.2.3` · TypeScript `~6.0.3` · Tailwind CSS `^4.3.3` · Three.js `^0.186.1` · React Three Fiber `^9.8.1`.

**Quality tooling:** `lint`, `typecheck` scripts are available. See the setup guide below for prerequisites; this documentation pass does not assert that those checks were run.

---

## Project guide

**Explore the elements.**

A visual chemistry explorer with a 3D atom inspector, selected element data, property heatmaps and quizzes. Built with Expo, React, React Native Web and Three.js. The current dataset covers 23 selected elements; Bohr-style rings are simplified teaching models.

## Run and build

```sh
npm ci
npm run web
npm run lint
npm run typecheck
npm run build
```

The web export is in `dist/`. Expo copies `public/` into the export and injects the application bundle into the custom `public/index.html`. `npm run discovery` regenerates crawl files and public HTML from `src/brand.json`. Vercel uses the same build command so discovery content stays in sync.

See [BRAND.md](BRAND.md) for positioning, domain and scope. The canonical domain is `https://elemental-psi.vercel.app`. `/about.html` renders without JavaScript; `/llms.txt` and `/llm.txt` expose the same index, with `/llms-full.txt` providing fuller context.
