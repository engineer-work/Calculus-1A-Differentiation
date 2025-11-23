
import React, { useState } from 'react';

export const ReviewProblemsQuiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, boolean>>({});

  const QUESTIONS = [
    {
      id: "q1",
      title: "Function vs. limit 2",
      type: "true_false",
      text: "True or false: If we know f(a) exists, this means that lim x→a f(x) exists.",
      correct: "False",
      explanation: "Correct! The function value f(a) is separate from the limit. The function could have a value at 'a' but the roads (limits) might not meet there."
    },
    {
      id: "q2",
      title: "Double-sided limit",
      type: "mcq",
      text: "Suppose that lim x→a⁻ f(x) = lim x→a⁺ f(x) = 3. Which of the following must be true?",
      options: [
        { id: "opt1", text: "lim x→a f(x) = 3", correct: true },
        { id: "opt2", text: "f(a) = 3", correct: false },
        { id: "opt3", text: "Both must be true", correct: false },
        { id: "opt4", text: "Neither is necessarily true", correct: false }
      ],
      explanation: "Correct! By definition, if the left and right limits agree on a number (3), then the overall limit is that number. It implies nothing about f(a)."
    },
    {
      id: "q3",
      title: "Floor function",
      type: "floor_blanks",
      text: "Recall that the floor function ⌊x⌋ denotes the greatest integer less than or equal to x. Calculate the following values (or enter DNE).",
      parts: [
        { label: "lim x→2⁻ ⌊x⌋ =", correct: "1", id: "f1" },
        { label: "lim x→2⁺ ⌊x⌋ =", correct: "2", id: "f2" },
        { label: "lim x→2 ⌊x⌋ =", correct: "DNE", id: "f3" },
        { label: "⌊2⌋ =", correct: "2", id: "f4" },
      ]
    }
  ];

  const handleSelect = (qId: string, val: string) => {
      setAnswers(prev => ({...prev, [qId]: val}));
  };

  const checkAnswer = (qId: string, correctVal: string, partId?: string) => {
      const key = partId ? `${qId}_${partId}` : qId;
      const userVal = answers[key];
      if (!userVal) return;

      const isCor = userVal.trim().toUpperCase() === correctVal.toUpperCase();
      setResults(prev => ({...prev, [key]: isCor}));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20">
        
        {/* Q1: True/False */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{QUESTIONS[0].title}</h3>
            </div>
            <div className="p-6">
                <p className="text-lg text-slate-800 mb-4">{QUESTIONS[0].text}</p>
                <div className="flex gap-4 mb-4">
                    <button 
                        onClick={() => {
                            handleSelect(QUESTIONS[0].id, "True");
                            setResults(prev => ({...prev, [QUESTIONS[0].id]: false})); // Immediate check
                        }}
                        className={`px-6 py-2 rounded-lg border transition-all ${answers[QUESTIONS[0].id] === "True" ? 'bg-slate-800 text-white' : 'hover:bg-slate-50'}`}
                    >
                        True
                    </button>
                    <button 
                        onClick={() => {
                            handleSelect(QUESTIONS[0].id, "False");
                            setResults(prev => ({...prev, [QUESTIONS[0].id]: true})); // Immediate check
                        }}
                        className={`px-6 py-2 rounded-lg border transition-all ${answers[QUESTIONS[0].id] === "False" ? 'bg-slate-800 text-white' : 'hover:bg-slate-50'}`}
                    >
                        False
                    </button>
                </div>
                {results[QUESTIONS[0].id] !== undefined && (
                    <div className={`p-3 rounded-lg ${results[QUESTIONS[0].id] ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {results[QUESTIONS[0].id] ? "✅ " + QUESTIONS[0].explanation : "❌ Incorrect. Try visualizing the Floating House."}
                    </div>
                )}
            </div>
        </div>

        {/* Q2: MCQ */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{QUESTIONS[1].title}</h3>
            </div>
            <div className="p-6">
                <p className="text-lg text-slate-800 mb-4 font-serif">Suppose that lim x→a⁻ f(x) = lim x→a⁺ f(x) = 3. Which of the following must be true?</p>
                <div className="space-y-3">
                    {(QUESTIONS[1].options as any[]).map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => {
                                handleSelect(QUESTIONS[1].id, opt.id);
                                setResults(prev => ({...prev, [QUESTIONS[1].id]: opt.correct}));
                            }}
                            className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between
                                ${answers[QUESTIONS[1].id] === opt.id 
                                    ? (opt.correct ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500') 
                                    : 'hover:bg-slate-50 border-slate-200'
                                }
                            `}
                        >
                            <span>{opt.text}</span>
                            {answers[QUESTIONS[1].id] === opt.id && (
                                <span>{opt.correct ? '✅' : '❌'}</span>
                            )}
                        </button>
                    ))}
                </div>
                {results[QUESTIONS[1].id] === true && (
                     <div className="mt-4 text-green-700 text-sm font-medium">
                         {QUESTIONS[1].explanation}
                     </div>
                )}
            </div>
        </div>

        {/* Q3: Floor Function */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{QUESTIONS[2].title}</h3>
            </div>
            <div className="p-6">
                <p className="text-slate-600 mb-6">{QUESTIONS[2].text}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(QUESTIONS[2].parts as any[]).map((part) => (
                        <div key={part.id} className="flex items-center gap-3">
                            <div className="font-serif text-lg min-w-[120px]">{part.label}</div>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    className={`border-2 rounded px-3 py-1 w-24 font-mono outline-none transition-colors
                                        ${results[`${QUESTIONS[2].id}_${part.id}`] === true ? 'border-green-500 bg-green-50' : 
                                          results[`${QUESTIONS[2].id}_${part.id}`] === false ? 'border-red-500 bg-red-50' : 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500'
          }
                                    `}
                                    onChange={(e) => {
                                        handleSelect(`${QUESTIONS[2].id}_${part.id}`, e.target.value);
                                    }}
                                    onBlur={() => checkAnswer(QUESTIONS[2].id, part.correct, part.id)}
                                />
                                {results[`${QUESTIONS[2].id}_${part.id}`] === true && (
                                    <span className="absolute right-2 top-1.5 text-green-600 text-xs">✔</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    </div>
  );
};
