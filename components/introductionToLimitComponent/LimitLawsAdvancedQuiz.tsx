
import React, { useState } from 'react';

export const LimitLawsAdvancedQuiz: React.FC = () => {
  const [activeQ, setActiveQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const QUESTIONS = [
    {
      question: "In the proof f(x)g(x) = LM + ε₁M + ε₂L + ε₁ε₂, what represents the 'pure limit' part?",
      options: [
        "LM",
        "ε₁M",
        "ε₁ε₂",
        "L + M"
      ],
      correct: 0,
      explanation: "Correct! LM is the constant product of the two limits. All other terms contain epsilon (ε), which means they are error terms that shrink to zero."
    },
    {
      question: "Why does the term ε₁M go to zero?",
      options: [
        "Because M goes to zero",
        "Because ε₁ goes to zero as x approaches a",
        "It doesn't go to zero",
        "Because M is infinite"
      ],
      correct: 1,
      explanation: "Right! M is just a fixed number (constant). Since ε₁ represents the error shrinking to 0, the product (Small) × (Constant) also becomes 0."
    },
    {
      question: "Which Limit Law requires a special condition to work?",
      options: [
        "Addition: lim [f+g]",
        "Multiplication: lim [f•g]",
        "Division: lim [f/g]",
        "Subtraction: lim [f-g]"
      ],
      correct: 2,
      explanation: "Exactly. The Division Law only works if the denominator's limit (M) is NOT ZERO. Dividing by zero is undefined."
    },
    {
      question: "If lim f(x) = 5 and lim g(x) = 0, what is the limit of f(x)/g(x)?",
      options: [
        "0",
        "5",
        "Undefined (Cannot use the law)",
        "Infinity"
      ],
      correct: 2,
      explanation: "Correct. Since the denominator limit is 0, we cannot simply plug in L/M. We need to investigate further (it might be infinity or DNE)."
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
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center animate-fade-in mt-10">
         <div className="text-6xl mb-4">🎓</div>
         <h2 className="text-2xl font-bold text-slate-800 mb-2">Advanced Laws Mastered!</h2>
         <p className="text-slate-600 mb-6">You scored <span className="font-bold text-indigo-600">{score}</span> out of {QUESTIONS.length}</p>
         <button onClick={restart} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition">
             Review Again
         </button>
      </div>
    );
  }

  const q = QUESTIONS[activeQ];

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
            <h3 className="font-bold text-lg font-serif">Advanced Limit Quiz</h3>
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
