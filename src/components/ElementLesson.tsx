import React, { useEffect, useState } from "react";
import type { ElementData } from "../data/elements";
import {
  ELEMENT_LESSON_STORAGE_KEY,
  checkElementLesson,
  emptyElementLesson,
  lessonForElement,
  readElementLessonProgress,
  recordElementLessonCheck,
  updateElementLessonProgress,
  type ElementLessonProgress,
} from "../data/element-lessons";

export function ElementLesson({ element }: { element: ElementData }) {
  const lesson = lessonForElement(element);
  return lesson ? <LessonActivity key={lesson.id} lesson={lesson} element={element} /> : null;
}

function LessonActivity({
  lesson,
  element,
}: {
  lesson: NonNullable<ReturnType<typeof lessonForElement>>;
  element: ElementData;
}) {
  const [progress, setProgress] = useState<ElementLessonProgress>(() =>
    emptyElementLesson(lesson.id),
  );
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  // Read external browser storage after hydration without replacing existing records.
  /* oxlint-disable react/set-state-in-effect */
  useEffect(() => {
    try {
      const saved = readElementLessonProgress(localStorage.getItem(ELEMENT_LESSON_STORAGE_KEY));
      setProgress(saved[lesson.id] || emptyElementLesson(lesson.id));
    } catch {
      setMessage("Progress cannot be restored in this browser. You can still try the lesson.");
    }
    setReady(true);
  }, [lesson.id]);
  /* oxlint-enable react/set-state-in-effect */

  function handleSave(change: Partial<ElementLessonProgress>) {
    const next = updateElementLessonProgress(progress, change);
    setProgress(next);
    try {
      const records = readElementLessonProgress(localStorage.getItem(ELEMENT_LESSON_STORAGE_KEY));
      localStorage.setItem(
        ELEMENT_LESSON_STORAGE_KEY,
        JSON.stringify({ version: 1, records: { ...records, [lesson.id]: next } }),
      );
      setMessage("Practice saved on this browser. Clearing site data removes these records.");
    } catch {
      setMessage(
        "This practice could not be saved. Keep this page open if you want to revisit your response.",
      );
    }
  }

  function check() {
    if (progress.selectedOption === null || progress.checked) return;
    try {
      handleSave(recordElementLessonCheck(progress, progress.selectedOption));
    } catch {
      setMessage(
        "Please write a prediction and select an answer. This check supports up to 100 recorded attempts.",
      );
    }
  }

  const correct = progress.checked && checkElementLesson(lesson.id, progress.selectedOption);
  const button =
    "min-h-11 rounded-xl border border-sky-300/40 bg-sky-950/80 px-4 py-2 text-left text-sm font-semibold text-sky-100 transition-colors hover:bg-sky-900/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50";
  return (
    <section
      className="rounded-2xl border border-white/15 bg-slate-950/70 p-4 text-slate-100"
      aria-label={`${element.name} learning objective`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-200">
        A closer look · {element.symbol}
      </p>
      <h3 className="mt-2 text-lg font-bold text-white">{lesson.objective}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-200">
        Five authored objectives cover hydrogen, carbon, oxygen, sodium and iron within the
        selected-element catalogue.
      </p>
      {!ready ? (
        <p className="mt-4 text-sm text-slate-200">Opening your practice…</p>
      ) : (
        <>
          {!progress.revealed ? (
            <>
              <label
                className="mt-4 block text-sm font-semibold"
                htmlFor={`prediction-${lesson.id}`}
              >
                {lesson.prediction}
              </label>
              <textarea
                id={`prediction-${lesson.id}`}
                className="mt-2 w-full rounded-xl border border-white/30 bg-slate-900 p-3 text-base text-white"
                rows={3}
                maxLength={2000}
                value={progress.prediction}
                onChange={(event) => handleSave({ prediction: event.target.value })}
              />
              <button
                type="button"
                className={`${button} mt-3`}
                disabled={!progress.prediction.trim()}
                onClick={() => handleSave({ revealed: true })}
              >
                Keep my prediction and explore
              </button>
            </>
          ) : (
            <>
              <p className="mt-4 whitespace-pre-wrap text-sm text-slate-200">
                <strong>Your prediction:</strong> {progress.prediction}
              </p>
              <p className="mt-4 text-sm leading-relaxed">{lesson.teaching}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-200">
                Selected neutral atom: Z = {element.number}; shell counts{" "}
                {element.shells.join(", ")}. The scene illustrates counts, not literal electron
                paths; ion examples below do not change the scene.
              </p>
              <fieldset className="mt-4" disabled={progress.checked}>
                <legend className="text-sm font-semibold">{lesson.question}</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {lesson.options.map((option, index) => (
                    <label
                      key={option}
                      className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/25 bg-slate-900 p-3 text-sm"
                    >
                      <input
                        type="radio"
                        name={`answer-${lesson.id}`}
                        value={index}
                        checked={progress.selectedOption === index}
                        onChange={() => handleSave({ selectedOption: index, checked: false })}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={button}
                  onClick={check}
                  disabled={
                    progress.checked || progress.selectedOption === null || progress.attempts >= 100
                  }
                >
                  Check my answer
                </button>
                {!progress.checked && (
                  <button
                    type="button"
                    className={button}
                    disabled={progress.hints >= 100}
                    onClick={() => handleSave({ hints: progress.hints + 1 })}
                  >
                    Show a hint
                  </button>
                )}
              </div>
              {progress.hints > 0 && (
                <p className="mt-3 text-sm text-sky-100">
                  <strong>Hint:</strong> {lesson.hint}
                </p>
              )}
              {progress.checked && (
                <div
                  className="mt-4 rounded-xl border border-white/20 bg-slate-900 p-3"
                  role="status"
                >
                  <h4 className="font-semibold">
                    {correct
                      ? "Your answer matches."
                      : "Compare your answer with the worked explanation."}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed">{lesson.explanation}</p>
                  <button
                    type="button"
                    className={`${button} mt-3`}
                    disabled={progress.attempts >= 100}
                    onClick={() => handleSave({ selectedOption: null, checked: false })}
                  >
                    Try this check again
                  </button>
                </div>
              )}
              <p className="mt-3 text-xs leading-relaxed text-slate-200">
                Recorded attempts: {progress.attempts} · Hints opened: {progress.hints}. Repeating
                this same question is practice, not fresh independent evidence or a mastery score.
              </p>
            </>
          )}
        </>
      )}
      <a
        className="mt-4 inline-block min-h-11 py-3 text-sm text-sky-200 underline"
        href="https://iupac.org/what-we-do/periodic-table-of-elements/"
        target="_blank"
        rel="noreferrer"
      >
        IUPAC periodic table reference
      </a>
      <p className="mt-2 text-xs text-slate-200" role="status">
        {message}
      </p>
    </section>
  );
}
