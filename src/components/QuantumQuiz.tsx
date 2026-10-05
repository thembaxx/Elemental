import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, HelpCircle, Sparkles } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which reactive nonmetal element has an atomic number Z = 8 and forms essential diatomic gas for aerobic respiration?",
    options: ["Nitrogen (N)", "Oxygen (O)", "Fluorine (F)", "Carbon (C)"],
    correctIndex: 1,
    explanation: "Oxygen (Z=8, valence configuration 2s² 2p⁴) makes up approximately 21% of Earth's atmosphere."
  },
  {
    id: 2,
    question: "Which element has the highest Pauling electronegativity value (3.98) in the periodic table?",
    options: ["Oxygen", "Chlorine", "Fluorine", "Helium"],
    correctIndex: 2,
    explanation: "Fluorine (F, Z=9) is the most electronegative element due to its small atomic radius and high electron affinity."
  },
  {
    id: 3,
    question: "What is the primary electron configuration for Gold (Au, Z = 79)?",
    options: ["[Xe] 4f¹⁴ 5d¹⁰ 6s¹", "[Xe] 4f¹⁴ 5d⁹ 6s²", "[Rn] 5f¹⁴ 6d¹⁰ 7s¹", "[Ar] 3d¹⁰ 4s¹"],
    correctIndex: 0,
    explanation: "Gold exhibits a relativistic subshell stabilization resulting in a filled 5d¹⁰ subshell and single 6s¹ electron."
  },
  {
    id: 4,
    question: "Which group of elements possesses completely filled valence s and p subshells resulting in high chemical inertness?",
    options: ["Alkali Metals", "Halogens", "Noble Gases", "Transition Metals"],
    correctIndex: 2,
    explanation: "Noble Gases (Group 18) possess stable octet valence shells with maximal ionization energies."
  }
];

export function QuantumQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsSubmitted(false);
    setIsCompleted(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 text-slate-100 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-5 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Award size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Quantum Celestial Quiz Lab
            </h2>
            <p className="text-xs text-slate-400">Test your atomic structure & quantum knowledge</p>
          </div>
        </div>

        <div className="px-4 py-2 bg-sky-500/10 border border-sky-400/20 rounded-2xl text-xs font-bold text-sky-300">
          Score: {score} / {QUIZ_QUESTIONS.length}
        </div>
      </div>

      {!isCompleted ? (
        /* Question Card */
        <div className="bg-slate-950/70 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl flex flex-col gap-6 shadow-2xl">
          {/* Progress Bar */}
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">
              Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <h3 className="text-lg font-bold text-white mt-1 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200';
              if (isSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/20';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500/20 border-rose-400 text-rose-200';
                }
              } else if (isSelected) {
                btnStyle = 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-lg shadow-sky-500/20';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left font-semibold text-xs flex items-center justify-between transition-all duration-200 ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isSubmitted && isCorrect && <CheckCircle2 size={18} className="text-emerald-400" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle size={18} className="text-rose-400" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isSubmitted && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
              <strong className="text-sky-300 block mb-1 font-bold">Quantum Telemetry Insight:</strong>
              {currentQ.explanation}
            </div>
          )}

          {/* Bottom Action Button */}
          <div className="flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-500/25 disabled:opacity-50 hover:scale-105 transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-500/25 hover:scale-105 transition-all"
              >
                {currentIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Question →' : 'View Results →'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completion Screen */
        <div className="bg-slate-950/70 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center gap-6 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center border border-white/20 shadow-xl shadow-sky-500/30">
            <Sparkles size={36} className="text-white" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white">Challenge Complete!</h3>
            <p className="text-sm text-slate-400 mt-1">
              You scored <strong className="text-sky-400">{score}</strong> out of {QUIZ_QUESTIONS.length}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-500/25 hover:scale-105 transition-all"
          >
            <RotateCcw size={16} />
            <span>Retake Challenge</span>
          </button>
        </div>
      )}
    </div>
  );
}
