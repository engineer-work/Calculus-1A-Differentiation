
import React, { useState } from 'react';

export const LimitDefinitionQuiz: React.FC = () => {
  const [activeQ, setActiveQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const QUESTIONS = [
    {
      question: "In the 'Archery Game' of limits, who chooses their number FIRST?",
      options: [
        "You choose Delta (the aiming precision) first.",
        "The Judge chooses Epsilon (the target size) first.",
        "They choose at the same time.",
        "It doesn't matter."
      ],
      correct: 1,
      explanation: "Correct! The definition says 'For ALL epsilon...', which implies the challenge is issued first. Then you must find a Delta that works for that specific challenge."
    },
    {
      question: "What does |f(x) - L| < ε mean geometrically?",
      options: [
        "The function is far away from L.",
        "The function value is within a horizontal tube of radius ε around L.",
        "The function is undefined.",
        "x is close to a."
      ],
      correct: 1,
      explanation: "Yes! |f(x) - L| represents the vertical distance. Being less than ε means f(x) is trapped inside the horizontal target zone."
    },
    {
      question: "If I make Epsilon smaller (harder challenge), what usually happens to the required Delta?",
      options: [
        "Delta must get bigger.",
        "Delta usually needs to get smaller (more precision required).",
        "Delta stays the same.",
        "Delta becomes infinite."
      ],
      correct: 1,
      explanation: "Exactly. If the target gets smaller, your aim (x values) usually needs to be tighter and more precise (smaller δ) to guarantee a hit."
    },
    {
      question: "What is the correct symbol order for the formal definition?",
      options: [
        "∃δ > 0, ∀ε > 0",
        "∀ε > 0, ∃δ > 0",
        "∀x, ∃y",
        "∃ε > 0, ∀δ > 0"
      ],
      correct: 1,
      explanation: "Perfect. 'For all epsilon greater than zero, there exists a delta greater than zero...' (∀ε, ∃δ)."
    }
  ];

  const handleAnswer = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const correct = idx === QUESTIONS[activeQ].correct;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const next = () => {
    if (activeQ < QUESTIONS.length - 1) {
      setActiveQ(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setActiveQ(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center animate-fade-in mt-10">
         <div className="text-6xl mb-4">📜</div>
         <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Certified!</h2>
         <p className="text-slate-600 mb-6">You scored <span className="font-bold text-indigo-600">{score}</span> out of {QUESTIONS.length}</p>
         <button onClick={restart} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition">
             Re-take Test
         </button>
      </div>
    );
  }

  const q = QUESTIONS[activeQ];

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
            <h3 className="font-bold text-lg font-serif">Formal Logic Quiz</h3>
            <span className="text-sm opacity-70">Q{activeQ + 1} / {QUESTIONS.length}</span>
        </div>

        <div className="p-8">
            <h4 className="text-xl font-medium text-slate-800 mb-6">{q.question}</h4>
            
            <div className="space-y-3">
                {q.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={selectedOption !== null}
                        className={`w-full text-left p-4 rounded-lg border transition-all flex justify-between items-center
                            ${selectedOption === null 
                                ? 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50' 
                                : selectedOption === idx 
                                    ? (isCorrect ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800')
                                    : 'border-slate-100 opacity-50'
                            }
                        `}
                    >
                        <span>{opt}</span>
                        {selectedOption === idx && (
                            <span>{isCorrect ? '✅' : '❌'}</span>
                        )}
                    </button>
                ))}
            </div>

            {selectedOption !== null && (
                <div className={`mt-6 p-4 rounded-lg border animate-fade-in ${isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    <p className="font-bold mb-1">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                    <p>{q.explanation}</p>
                    <div className="text-right mt-2">
                        <button onClick={next} className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-bold hover:bg-slate-700 transition">
                            {activeQ < QUESTIONS.length - 1 ? "Next Question" : "See Results"}
                        </button>
                    </div>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};
