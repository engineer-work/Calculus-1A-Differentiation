
import React, { useState } from 'react';

export const LimitLawsQuiz: React.FC = () => {
  const [activeQ, setActiveQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const QUESTIONS = [
    {
      question: "If lim f(x) = 4 and lim g(x) = 2, what is the limit of f(x) + g(x)?",
      options: [
        "2",
        "6",
        "8",
        "Cannot be determined"
      ],
      correct: 1,
      explanation: "Correct! The limit of the sum is the sum of the limits. 4 + 2 = 6."
    },
    {
      question: "If lim f(x) = 0 and lim g(x) = 5, what is the limit of f(x) * g(x)?",
      options: [
        "5",
        "0",
        "Infinity",
        "Undefined"
      ],
      correct: 1,
      explanation: "Right. 0 * 5 = 0. The Product Law holds."
    },
    {
      question: "We can find the limit of f(x) / g(x) by dividing the limits L / M, UNLESS...",
      options: [
        "Unless L is negative",
        "Unless M is negative",
        "Unless M is zero",
        "Unless L is zero"
      ],
      correct: 2,
      explanation: "Exactly. Division by zero is undefined! If the bottom limit is 0, the Quotient Law cannot be used directly."
    },
    {
      question: "True or False: The limit laws work even if x approaches from one side (like x → a+)?",
      options: [
        "True",
        "False"
      ],
      correct: 0,
      explanation: "True! As long as both limits approach from the SAME side, the laws apply perfectly."
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
         <div className="text-6xl mb-4">⚖️</div>
         <h2 className="text-2xl font-bold text-slate-800 mb-2">Law School Graduated!</h2>
         <p className="text-slate-600 mb-6">You scored <span className="font-bold text-indigo-600">{score}</span> out of {QUESTIONS.length}</p>
         <button onClick={restart} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition">
             Retake Exam
         </button>
      </div>
    );
  }

  const q = QUESTIONS[activeQ];

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
            <h3 className="font-bold text-lg font-serif">Limit Laws Exam</h3>
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
