/** Five authored objectives within Elemental's existing selected-element catalogue. */
export const elementLessons = [
  {
    id: "hydrogen-charge-v1",
    symbol: "H",
    atomicNumber: 1,
    objective: "Distinguish a hydrogen atom from a hydrogen ion.",
    prediction:
      "A neutral hydrogen atom loses its only electron. Predict what changes and what stays the same.",
    teaching:
      "Atomic number counts protons. A neutral hydrogen atom has one proton and one electron. Removing an electron changes charge, not the identity of the nucleus.",
    question: "What is the net charge after a neutral hydrogen atom loses one electron?",
    options: ["0", "+1", "−1", "+2"],
    correctIndex: 1,
    hint: "One proton contributes +1 and each electron contributes −1.",
    explanation:
      "The ion has one proton (+1) and no electrons: net charge +1. It is H⁺, still hydrogen because its atomic number remains 1. An isolated H⁺ is a simplified counting example; in water it is associated with other molecules.",
  },
  {
    id: "carbon-isotopes-v1",
    symbol: "C",
    atomicNumber: 6,
    objective: "Use mass number and atomic number to count neutrons.",
    prediction:
      "Carbon-12 and carbon-13 are both carbon. Predict which nuclear particle count is different.",
    teaching:
      "Every carbon nucleus has six protons. Mass number is protons plus neutrons for a specified isotope. The catalogue's relative atomic mass is not the mass number of a single atom.",
    question: "How many neutrons does carbon-13 contain?",
    options: ["6", "13", "7", "19"],
    correctIndex: 2,
    hint: "Neutrons = the isotope's mass number − its atomic number.",
    explanation:
      "Carbon-13 has 13 − 6 = 7 neutrons. Carbon-12 has 6. Both have six protons, so both are carbon; different neutron counts make them isotopes. Do not subtract from the displayed average relative atomic mass 12.011.",
  },
  {
    id: "oxygen-ion-v1",
    symbol: "O",
    atomicNumber: 8,
    objective: "Explain the charge of a simple oxide ion.",
    prediction:
      "A neutral oxygen atom gains two electrons. Predict whether its net charge becomes positive or negative.",
    teaching:
      "The neutral oxygen model has eight protons and eight electrons, with principal-shell counts 2 and 6. Gaining two electrons leaves ten electrons while the nucleus still has eight protons.",
    question: "What net charge does this oxide ion have?",
    options: ["+2", "0", "−1", "−2"],
    correctIndex: 3,
    hint: "Compare eight positive proton charges with ten negative electron charges.",
    explanation:
      "8 − 10 = −2, so the oxide ion is O²⁻. This charge-counting model is not an oxygen molecule: O₂ contains two oxygen atoms and is a different description. The displayed inspector remains a neutral-atom model.",
  },
  {
    id: "sodium-electrons-v1",
    symbol: "Na",
    atomicNumber: 11,
    objective: "Count electrons when sodium forms a +1 ion.",
    prediction:
      "Neutral sodium has shell counts 2, 8, 1. Predict what happens to the electron count if the outer electron is removed.",
    teaching:
      "Neutral sodium has eleven protons and eleven electrons. Forming Na⁺ removes one electron. A sodium ion in table salt is not a piece of pure sodium metal.",
    question: "How many electrons does a Na⁺ ion contain?",
    options: ["10", "11", "12", "1"],
    correctIndex: 0,
    hint: "Start with the neutral atom's eleven electrons, then remove one.",
    explanation:
      "11 − 1 = 10 electrons, arranged as 2 and 8 in this shell-count model. Eleven proton charges minus ten electron charges gives +1. Its atomic number stays 11. Rings illustrate counts, not literal electron orbits.",
  },
  {
    id: "iron-identity-v1",
    symbol: "Fe",
    atomicNumber: 26,
    objective: "Distinguish chemical change from a change of element.",
    prediction:
      "Iron reacts to form rust. Predict whether the iron nuclei become the nuclei of a different element.",
    teaching:
      "Chemical reactions rearrange atoms and electrons. Rust contains iron compounds, not a newly created element. Steel is an alloy containing iron; it is not a separate element on the periodic table.",
    question: "What atomic number do the iron atoms have when present in rust?",
    options: ["8", "26", "34", "0"],
    correctIndex: 1,
    hint: "Iron's identity depends on the number of protons in each iron nucleus.",
    explanation:
      "They still have atomic number 26. Their chemical surroundings and electron arrangement change, while each iron nucleus retains 26 protons. Creating a different element requires a nuclear change, not ordinary rusting.",
  },
] as const;

export type ElementLessonId = (typeof elementLessons)[number]["id"];
export type ElementLessonProgress = {
  lessonId: ElementLessonId;
  prediction: string;
  revealed: boolean;
  selectedOption: number | null;
  checked: boolean;
  attempts: number;
  hints: number;
  updatedAt: string;
};
export type ElementLessonRecords = Partial<Record<ElementLessonId, ElementLessonProgress>>;
export const ELEMENT_LESSON_STORAGE_KEY = "elemental.lesson-progress.v1";

export function lessonForElement(element: { number: number; symbol: string }) {
  return (
    elementLessons.find(
      (lesson) => lesson.atomicNumber === element.number && lesson.symbol === element.symbol,
    ) || null
  );
}

export function emptyElementLesson(lessonId: ElementLessonId): ElementLessonProgress {
  return {
    lessonId,
    prediction: "",
    revealed: false,
    selectedOption: null,
    checked: false,
    attempts: 0,
    hints: 0,
    updatedAt: "",
  };
}

/** Apply a learner interaction, preserving the authored lesson identity. */
export function updateElementLessonProgress(
  progress: ElementLessonProgress,
  change: Partial<ElementLessonProgress>,
  now = new Date(),
): ElementLessonProgress {
  return { ...progress, ...change, lessonId: progress.lessonId, updatedAt: now.toISOString() };
}

export function checkElementLesson(lessonId: ElementLessonId, option: unknown): boolean {
  const lesson = elementLessons.find((item) => item.id === lessonId);
  return (
    !!lesson &&
    typeof option === "number" &&
    Number.isInteger(option) &&
    option >= 0 &&
    option < lesson.options.length &&
    option === lesson.correctIndex
  );
}

export function readElementLessonProgress(value: unknown): ElementLessonRecords {
  if (typeof value === "string") {
    if (value.length > 20_000) return {};
    try {
      value = JSON.parse(value);
    } catch {
      return {};
    }
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const payload = value as Record<string, unknown>;
  if (
    payload.version !== 1 ||
    !payload.records ||
    typeof payload.records !== "object" ||
    Array.isArray(payload.records)
  )
    return {};
  const records = payload.records as Record<string, unknown>;
  const clean: ElementLessonRecords = {};
  for (const lesson of elementLessons) {
    const raw = records[lesson.id];
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
    const item = raw as Record<string, unknown>;
    if (item.lessonId !== lesson.id) continue;
    const count = (key: string) =>
      typeof item[key] === "number" &&
      Number.isInteger(item[key]) &&
      item[key] >= 0 &&
      item[key] <= 100
        ? item[key]
        : 0;
    const prediction = typeof item.prediction === "string" ? item.prediction.slice(0, 2000) : "";
    const revealed = !!prediction.trim() && item.revealed === true;
    const selectedOption =
      typeof item.selectedOption === "number" &&
      Number.isInteger(item.selectedOption) &&
      item.selectedOption >= 0 &&
      item.selectedOption < lesson.options.length
        ? item.selectedOption
        : null;
    const attempts = count("attempts");
    clean[lesson.id] = {
      lessonId: lesson.id,
      prediction,
      revealed,
      selectedOption,
      checked: revealed && selectedOption !== null && attempts > 0 && item.checked === true,
      attempts,
      hints: count("hints"),
      updatedAt:
        typeof item.updatedAt === "string" &&
        item.updatedAt.length <= 40 &&
        Number.isFinite(Date.parse(item.updatedAt))
          ? item.updatedAt
          : "",
    };
  }
  return clean;
}

export function recordElementLessonCheck(
  progress: ElementLessonProgress,
  option: number,
  now = new Date(),
): ElementLessonProgress {
  const lesson = elementLessons.find((item) => item.id === progress.lessonId);
  if (
    !lesson ||
    !progress.revealed ||
    !progress.prediction.trim() ||
    !Number.isInteger(option) ||
    option < 0 ||
    option >= lesson.options.length ||
    progress.attempts >= 100
  )
    throw new RangeError("Write a prediction and select a valid answer before checking.");
  return {
    ...progress,
    selectedOption: option,
    checked: true,
    attempts: progress.attempts + 1,
    updatedAt: now.toISOString(),
  };
}
