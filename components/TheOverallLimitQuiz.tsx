
import React, { useState } from 'react';

export const TheOverallLimitQuiz: React.FC = () => {
  const [activeQ, setActiveQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const QUESTIONS = [
    {
      id: 1,
      text: "What is the 'Overall Limit' rule?",
      type: "concept",
      options: [
        "Left Limit must equal Right Limit",
        "The function value f(a) must exist",
        "The graph must be a straight line",
        "Left Limit must be zero"
      ],
      correct: 0,
      explanation: "Correct! The ONLY requirement for the overall limit to exist is that the Left approach and Right approach meet at the same number."
    },
    {
      id: 2,
      text: "Look at the data below. Does the overall limit exist at x = 3?",
      type: "data",
      dataDisplay: {
        left: "2.9, 2.99, 2.999 -> Approaches 5",
        right: "3.1, 3.01, 3.001 -> Approaches 5"
      },
      options: [
        "No, because we don't know f(3)",
        "Yes, the limit is 5",
        "No, the limit is 3",
        "Yes, the limit is 0"
      ],
      correct: 1,
      explanation: "Yes! Since both the left side approaches 5 AND the right side approaches 5, the overall limit is 5."
    },
    {
      id: 3,
      text: "Scenario: Left Limit = 4. Right Limit = 4. f(a) is undefined (hole). Does the limit exist?",
      type: "scenario",
      options: [
        "No, because of the hole.",
        "Yes, the limit is 4.",
        "Yes, the limit is undefined.",
        "Impossible to say."
      ],
      correct: 1,
      explanation: "Spot on. Remember, limits don't care about the point itself (the hole). They only care if the roads meet. Since 4 = 4, the limit exists!"
    },
    {
      id: 4,
      text: "Scenario: Left Limit = -1. Right Limit = +1. Does the limit exist?",
      type: "scenario",
      options: [
        "Yes, it is 0",
        "Yes, it is +/- 1",
        "No, Limit DNE",
        "Yes, it is 1"
      ],
      correct: 2,
      explanation: "Correct. Since -1 does not equal +1, the paths do not meet. This is a Jump Discontinuity, so the limit Does Not Exist (DNE)."
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
         <div className="text-6xl mb-4">🏆</div>
         <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
         <p className="text-slate-600 mb-6">You scored <span className="font-bold text-indigo-600">{score}</span> out of {QUESTIONS.length}</p>
         <button onClick={restart} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition">
             Play Again
         </button>
      </div>
    );
  }

  const q = QUESTIONS[activeQ];

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
            <h3 className="font-bold text-lg">Overall Limit Challenge</h3>
            <span className="text-sm opacity-70">Q{activeQ + 1} / {QUESTIONS.length}</span>
        </div>

        <div className="p-8">
            <h4 className="text-xl font-medium text-slate-800 mb-6">{q.text}</h4>
            
            {q.dataDisplay && (
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg mb-6 font-mono text-sm text-indigo-900">
                    <div className="mb-1"><strong>Left:</strong> {q.dataDisplay.left}</div>
                    <div><strong>Right:</strong> {q.dataDisplay.right}</div>
                </div>
            )}

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
