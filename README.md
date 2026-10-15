# Elemental

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
