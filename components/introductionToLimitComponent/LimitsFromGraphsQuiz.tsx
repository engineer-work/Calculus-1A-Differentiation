
import React, { useState } from 'react';

export const LimitsFromGraphsQuiz: React.FC = () => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validation, setValidation] = useState<Record<string, boolean>>({});

  // Question Data mirroring the screenshots
  const PROBLEMS = [
    {
        id: 0,
        title: "x → -2",
        graphFocus: -2,
        questions: [
            { id: "q1_1", latex: "\\lim_{x \\to -2^-} f(x) =", correct: "3" },
            { id: "q1_2", latex: "\\lim_{x \\to -2^+} f(x) =", correct: "1" },
            { id: "q1_3", latex: "\\lim_{x \\to -2} f(x) =", correct: "DNE" },
            { id: "q1_4", latex: "f(-2) =", correct: "2" },
        ]
    },
    {
        id: 1,
        title: "x → 1",
        graphFocus: 1,
        questions: [
            { id: "q2_1", latex: "\\lim_{x \\to 1^-} f(x) =", correct: "2" },
            { id: "q2_2", latex: "\\lim_{x \\to 1^+} f(x) =", correct: "2" },
            { id: "q2_3", latex: "\\lim_{x \\to 1} f(x) =", correct: "2" },
            { id: "q2_4", latex: "f(1) =", correct: "DNE" },
        ]
    },
    {
        id: 2,
        title: "x → 3",
        graphFocus: 3,
        questions: [
            { id: "q3_1", latex: "\\lim_{x \\to 3^-} f(x) =", correct: "DNE" },
            { id: "q3_2", latex: "\\lim_{x \\to 3^+} f(x) =", correct: "1" },
            { id: "q3_3", latex: "\\lim_{x \\to 3} f(x) =", correct: "DNE" },
            { id: "q3_4", latex: "f(3) =", correct: "1" },
        ]
    }
  ];

  const handleInputChange = (qId: string, val: string) => {
      setAnswers(prev => ({...prev, [qId]: val}));
      // Reset validation on change
      setValidation(prev => {
          const newV = {...prev};
          delete newV[qId];
          return newV;
      });
  };

  const checkAnswer = (qId: string, correctVal: string) => {
      const userVal = (answers[qId] || "").trim().toUpperCase();
      // Allow some flexibility? No, math is precise. DNE must be DNE. Numbers match.
      const isCorrect = userVal === correctVal;
      setValidation(prev => ({...prev, [qId]: isCorrect}));
  };

  // Render MathJax
  React.useEffect(() => {
      if ((window as any).MathJax) {
          (window as any).MathJax.typesetPromise();
      }
  }, [activeTab]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      {/* Tab Navigation */}
      <div className="flex justify-center gap-4">
          {PROBLEMS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(idx as any)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                    activeTab === idx 
                    ? 'bg-slate-900 text-white shadow-lg scale-105' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                  Problem {idx + 1}: {p.title}
              </button>
          ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-800">Estimate limits from the graph</h3>
              <p className="text-sm text-slate-500 mt-1">
                  Type <strong>DNE</strong> if the value does not exist.
              </p>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left Column: The Questions */}
              <div className="space-y-6">
                  {PROBLEMS[activeTab].questions.map((q) => (
                      <div key={q.id} className="flex items-center gap-4">
                          <div className="text-lg font-serif min-w-[120px]">
                              $$ {q.latex} $$
                          </div>
                          <div className="relative flex-1">
                              <input 
    type="text" 
    value={answers[q.id] || ''}
    onChange={(e) => handleInputChange(q.id, e.target.value)}
    onBlur={() => checkAnswer(q.id, q.correct)}
    placeholder="?"
    className={`w-full border-2 rounded-lg px-4 py-2 font-mono outline-none transition-colors 
        ${validation[q.id] === true ? 'border-green-500 bg-green-50 text-green-800' : 
          validation[q.id] === false ? 'border-red-500 bg-red-50 text-red-800' : 
          // FIX IS HERE: Dark Background + White Text
          'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500'
          } 
    `}
/>
                              {validation[q.id] === true && (
                                  <div className="absolute right-3 top-3 text-green-600">
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                                  </div>
                              )}
                          </div>
                      </div>
                  ))}
              </div>

              {/* Right Column: Context/Mini Graph Placeholder */}
              {/* Since the main visual is in the 'Visual Guide' tab, we put a static reference image or helper here */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-center items-center text-center">
                   <div className="text-6xl mb-4">📈</div>
                   <h4 className="font-bold text-slate-700">Need a hint?</h4>
                   <p className="text-sm text-slate-500 mt-2">
                       Switch to the <strong>Visual Guide</strong> tab to inspect the graph interactively!
                   </p>
                   <div className="mt-6 text-left text-xs text-slate-400 font-mono bg-white p-4 rounded border w-full">
                       DEBUG INFO:<br/>
                       Problem ID: {activeTab}<br/>
                       Focus Point: x = {PROBLEMS[activeTab].graphFocus}<br/>
                       Correct Answers: {PROBLEMS[activeTab].questions.map(q => q.correct).join(', ')}
                   </div>
              </div>

          </div>
      </div>

    </div>
  );
};
