
import React, { useState } from 'react';

export const PossibleLimitBehaviorsQuiz: React.FC = () => {
  const [activeQ, setActiveQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const QUESTIONS = [
    {
      question: "If the Left Limit is 5 and the Right Limit is 5, but the function value f(a) is undefined (a hole), does the limit exist?",
      options: [
        "No, because the hole breaks it.",
        "Yes! The limit is 5.",
        "Yes, but only if f(a) exists.",
        "Impossible to tell."
      ],
      correct: 1,
      explanation: "Correct! The limit is about the journey (approaching), not the destination (the actual point). If both sides agree on 5, the limit is 5."
    },
    {
      question: "If the function shoots up to positive infinity as x approaches 'a' from the right, what do we say about the limit?",
      options: [
        "The limit is infinity, so it exists.",
        "The limit is 0.",
        "The limit Does Not Exist (DNE).",
        "The limit is everything."
      ],
      correct: 2,
      explanation: "Right. Infinity is not a real number. If a function grows without bound, it never 'settles' on a value, so the limit DNE."
    },
    {
      question: "What happens in the 'Oscillating' case (like sin(1/x))?",
      options: [
        "It settles on 0.",
        "It settles on 1.",
        "It bounces back and forth forever, so limit DNE.",
        "It creates a black hole."
      ],
      correct: 2,
      explanation: "Exactly. To have a limit, you must approach a single specific number. Bouncing forever means you never settle."
    },
    {
      question: "If Left Limit is -2 and Right Limit is +2 (The Jump), does the overall limit exist?",
      options: [
        "Yes, it is 0.",
        "No, DNE.",
        "Yes, it is both -2 and +2.",
        "Only on Tuesdays."
      ],
      correct: 1,
      explanation: "Correct. For the overall limit to exist, the Left and Right sides MUST agree. If they don't, the limit DNE."
    }
  ];

  const handleAnswer = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const correct = idx === QUESTIONS[activeQ].correct;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const nextQ = () => {
    if (activeQ < QUESTIONS.length - 1) {
      setActiveQ(activeQ + 1);
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
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center max-w-lg mx-auto animate-fade-in">
        <div className="text-6xl mb-4">{score === QUESTIONS.length ? '🌟' : '🧐'}</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Results</h2>
        <p className="text-slate-600 mb-6">You got <span className="font-bold text-indigo-600">{score}</span> out of {QUESTIONS.length} correct.</p>
        <button onClick={restart} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg">
          Try Again
        </button>
      </div>
    );
  }

  const q = QUESTIONS[activeQ];

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-fade-in">
       <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
             <h3 className="font-bold text-lg">Limit Behavior Quiz</h3>
             <span className="text-sm opacity-70">Question {activeQ + 1} / {QUESTIONS.length}</span>
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
                        ? 'border-slate-200 hover:bg-slate-50' 
                        : selectedOption === idx 
                           ? (isCorrect ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800')
                           : 'opacity-50 border-slate-200'
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

             {isCorrect !== null && (
               <div className={`mt-6 p-4 rounded-lg border ${isCorrect ? 'bg-green-100 border-green-200 text-green-800' : 'bg-red-100 border-red-200 text-red-800'} animate-fade-in`}>
                 <p className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect.'}</p>
                 <p className="text-sm mt-1">{q.explanation}</p>
                 <button onClick={nextQ} className="mt-3 bg-slate-900 text-white px-4 py-2 rounded text-sm font-bold hover:bg-slate-800">
                   {activeQ < QUESTIONS.length - 1 ? "Next Question" : "Finish Quiz"}
                 </button>
               </div>
             )}
          </div>
       </div>
    </div>
  );
};
