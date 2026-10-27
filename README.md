# Elemental

A chemistry explorer with 23 selected elements, a 3D atom inspector, property heatmaps, quizzes and five focused learning objectives.

[Browse the source](https://github.com/thembaxx/Elemental)

## Engineering highlights

Expo web export, React and Three.js. Bohr-style rings are simplified teaching illustrations. Elemental focuses on inspecting selected elements and practising short objectives; [Hydromental](https://github.com/thembaxx/hydromental) is the separate 118-element web catalogue and science playground. The two repositories are not synchronised.

## Technology

Declared in [package.json](package.json): Expo `~58.0.17` · React `19.3.1` · TypeScript `7.0.2` · Tailwind CSS `^4.3.3` · Three.js `^0.186.1` · React Three Fiber `^9.8.2`.

**Quality tooling:** `lint`, `typecheck`, `format:check` and web `build` scripts are available. Verification results for the selected-element lessons are recorded below.

---

## Project guide

**Explore the elements.**

A visual chemistry explorer with a 3D atom inspector, selected element data, property heatmaps and quizzes. The current dataset covers 23 selected elements; Bohr-style rings are simplified teaching models. The current interface uses DOM React components and Expo's web export. This change does not migrate the interface to native React Native screens or establish iOS/Android device compatibility.

## Selected-element lessons

Select **hydrogen, carbon, oxygen, sodium or iron** in the inspector and scroll to **A closer look**. Each element has an authored objective: ion charge, isotope neutron counts, oxide ions, sodium electron counts, or element identity during chemical change. Write a prediction, read the explanation, choose an answer and check the worked result. Other selected elements retain their existing inspector without claiming a dedicated lesson.

Answer checks use the selected option, with attempts and hint use shown explicitly. Repeating the same question is practice, not a fresh assessment or a validated mastery score. Isotope mass numbers and ion examples are distinguished from the displayed average relative atomic masses and neutral-atom scene. Reference links lead to IUPAC.

Predictions and per-element practice save on this browser under `elemental.lesson-progress.v1`. Known lesson IDs, text lengths, selected options and counts are validated on restore. Browser storage can be unavailable or cleared; a failed write shows a warning. These records do not sync between devices. Switching elements restores each element's own response.

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

## Lesson verification

Checked on 26 October 2026: `npm run lint` passed with 43 existing warnings and no errors; `npm run typecheck` passed; `npm run build` completed the Expo web export to `dist/`. Formatting checks passed for the lesson files and inspector. Focused helper assertions checked all five lesson-to-catalogue matches, exact answer selection, invalid input, bounded restore and stable lesson identities. This verification did not include a native build or physical-device testing.
