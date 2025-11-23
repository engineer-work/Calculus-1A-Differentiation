
import React, { useState, useEffect, useRef } from 'react';

interface Question {
  id: number;
  title: string;
  text: string;
  options: string[];
  correct: string;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Left vs. right",
    text: "Suppose $\\lim_{x \\to a^+} f(x)$ exists and equals $R$. <br/><br/>Must $\\lim_{x \\to a^-} f(x)$ exist?",
    options: ["Yes", "No"],
    correct: "No",
    explanation: "Correct! Counter-example: $f(x) = \\sqrt{x}$. The right limit at 0 is 0. The left limit does not exist (domain error)."
  },
  {
    id: 2,
    title: "Matching sides",
    text: "Suppose that $\\lim_{x \\to a^+} f(x) = R$ and $\\lim_{x \\to a^-} f(x) = L$ <br/><br/>Must $R = L$?",
    options: ["Yes", "No"],
    correct: "No",
    explanation: "Correct! Consider a step function (like the Broken Bridge). The left limit could be 0 while the right limit is 1. They don't have to match."
  },
  {
    id: 3,
    title: "Limit vs. function",
    text: "Suppose that $\\lim_{x \\to a^+} f(x)$ is some number $R$. <br/><br/>Must $f(a) = R$?",
    options: ["Yes", "No"],
    correct: "No",
    explanation: "Correct! The function value $f(a)$ could be undefined, or it could be a point displaced from the curve (like a hole in the road with a floating house)."
  },
  {
    id: 4,
    title: "Function vs. limit",
    text: "Suppose that $f(a) = K$ <br/><br/>Must $\\lim_{x \\to a^+} f(x) = K$?",
    options: ["Yes", "No"],
    correct: "No",
    explanation: "Correct! Just because the function exists at a point $K$ doesn't mean the path leads there. The limit could be different or non-existent."
  }
];

export const QuickLimitQuestionsQuiz: React.FC = () => {
  const [activeQ, setActiveQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [score, setScore] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger MathJax whenever content changes
  useEffect(() => {
    if ((window as any).MathJax && (window as any).MathJax.typesetPromise) {
      // Small timeout to allow DOM to update before typesetting
      setTimeout(() => {
        const node = containerRef.current;
        if (node) {
             (window as any).MathJax.typesetPromise([node]).catch((err: any) => console.log('MathJax error:', err));
        }
      }, 50);
    }
  }, [activeQ, isCorrect, showSummary]);

  const handleOptionClick = (option: string) => {
    if (selectedOption) return; // Prevent changing answer

    setSelectedOption(option);
    const correct = option === QUESTIONS[activeQ].correct;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (activeQ < QUESTIONS.length - 1) {
      setActiveQ(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setActiveQ(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowSummary(false);
  };

  if (showSummary) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-slate-200 text-center animate-fade-in">
        <div className="text-6xl mb-4">{score === QUESTIONS.length ? '🏆' : '📝'}</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Complete</h2>
        <p className="text-slate-600 mb-6">You scored <span className="font-bold text-indigo-600">{score}</span> out of {QUESTIONS.length}</p>
        <button 
          onClick={handleRestart}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  const q = QUESTIONS[activeQ];

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto pb-20 animate-fade-in">
      
      {/* Progress */}
      <div className="flex justify-between items-center mb-6 px-1">
        <h2 className="text-xl font-bold text-slate-800">{activeQ + 1}. {q.title}</h2>
        <span className="text-sm font-mono text-slate-400">Question {activeQ + 1} of {QUESTIONS.length}</span>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-8">
          
          {/* Question Text with Math - using dangerouslySetInnerHTML for stable MathJax */}
          <div 
            className="text-lg text-slate-800 mb-8 leading-relaxed font-serif"
            dangerouslySetInnerHTML={{ __html: q.text }}
          />

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleOptionClick(opt)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-4 rounded-lg border transition-all flex justify-between items-center
                  ${selectedOption === null 
                    ? 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50' 
                    : selectedOption === opt 
                      ? (opt === q.correct ? 'bg-green-50 border-green-500 ring-1 ring-green-500' : 'bg-red-50 border-red-500 ring-1 ring-red-500')
                      : 'border-slate-100 opacity-50'
                  }
                `}
              >
                <span className="font-medium text-slate-700">{opt}</span>
                {selectedOption === opt && (
                  <span>{opt === q.correct ? '✅' : '❌'}</span>
                )}
              </button>
            ))}
          </div>

          {/* Feedback Area */}
          {selectedOption && (
            <div className={`mt-6 p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} animate-fade-in`}>
              <h4 className={`font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h4>
              <div 
                className="text-slate-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: q.explanation }}
              />
              
              <div className="mt-4 text-right">
                <button 
                  onClick={handleNext}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md"
                >
                  {activeQ < QUESTIONS.length - 1 ? "Next Question →" : "See Results"}
                </button>
              </div>
            </div>
          )}

        </div>
        
        {/* Footer/Hint */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 text-xs text-slate-500 italic">
           Tip: In calculus, "Must" is a very strong word. You only need one counter-example to say "No".
        </div>
      </div>

    </div>
  );
};
