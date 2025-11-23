
import React, { useState } from 'react';

export const MoreLimitsQuiz: React.FC = () => {
  const [activeQ, setActiveQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [results, setResults] = useState<Record<number, boolean>>({});

  const QUESTIONS = [
    {
      id: 0,
      title: "Another function",
      intro: "Let's explore the right and left hand limits of a few more functions. In this problem, we'll examine the function:",
      math: "g(x) = \\frac{x}{\\tan(2x)} \\quad \\text{as } x \\to 0^{\\pm}",
      tableData: [
        { x: "1.0", y: "-0.458" },
        { x: "0.5", y: "0.321" },
        { x: "0.1", y: "0.493" },
        { x: "0.05", y: "0.498" },
        { x: "0.01", y: "0.4999" },
      ],
      tableCaption: "Values of g(x) as x approaches 0 from the right:",
      prompt: "Use the calculator button below (or Python Lab) to find the left-hand limit.",
      type: "mcq",
      options: [
        { text: "As x → 0⁻, g(x) gets closer to a particular number L", correct: true },
        { text: "As x → 0⁻, g(x) gets bigger without bound (+∞)", correct: false },
        { text: "As x → 0⁻, g(x) gets bigger in negative direction (-∞)", correct: false },
        { text: "As x → 0⁻, approaches neither", correct: false }
      ],
      inputPrompt: "What value does g(x) get closer to as x → 0⁻?",
      inputCorrect: "0.5"
    },
    {
      id: 1,
      title: "Yet another function",
      intro: "In this problem, we'll examine the function:",
      math: "h(x) = \\frac{|x| + \\sin x}{x^2}",
      tableData: [
        { x: "-1.0", y: "0.159" },
        { x: "-0.5", y: "0.082" },
        { x: "-0.1", y: "0.017" },
        { x: "-0.01", y: "0.002" },
        { x: "-0.001", y: "0.0002" },
      ],
      tableCaption: "Values of h(x) as x approaches 0 from the left:",
      prompt: "Use a calculator to find the right-hand limit.",
      type: "mcq",
      options: [
        { text: "As x → 0⁺, h(x) gets closer to a particular number L", correct: false },
        { text: "As x → 0⁺, h(x) gets bigger without bound (+∞)", correct: true },
        { text: "As x → 0⁺, h(x) gets bigger in negative direction (-∞)", correct: false },
        { text: "As x → 0⁺, approaches neither", correct: false }
      ],
      inputPrompt: "What value does h(x) get closer to as x → 0⁺? (Enter DNE for does not exist)",
      inputCorrect: "DNE"
    },
    {
      id: 2,
      title: "One last function",
      intro: "In this problem, we'll examine the function j(x) = sin(13/x), as x approaches 0 from the right.",
      math: "\\lim_{x \\to 0^+} \\sin(13/x)",
      tableData: [], 
      tableCaption: "",
      prompt: "Make sure your calculator is in radians!",
      type: "mcq",
      options: [
        { text: "As x → 0⁺, j(x) gets closer to a particular number L", correct: false },
        { text: "As x → 0⁺, j(x) gets bigger without bound (+∞)", correct: false },
        { text: "As x → 0⁺, j(x) gets bigger in negative direction (-∞)", correct: false },
        { text: "As x → 0⁺, approaches neither finite number, nor ±∞", correct: true }
      ],
      inputPrompt: "What value does j(x) get closer to as x → 0⁺? (Enter DNE)",
      inputCorrect: "DNE"
    }
  ];

  const handleMCQ = (qId: number, idx: number) => {
    setAnswers(prev => ({ ...prev, [`${qId}_mcq`]: idx }));
    setResults(prev => ({ ...prev, [`${qId}_mcq`]: QUESTIONS[qId].options[idx].correct }));
  };

  const handleInput = (qId: number, val: string) => {
    setAnswers(prev => ({ ...prev, [`${qId}_input`]: val }));
    const correct = val.trim().toUpperCase() === QUESTIONS[qId].inputCorrect;
    setResults(prev => ({ ...prev, [`${qId}_input`]: correct }));
  };

  const q = QUESTIONS[activeQ];

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-in">
       
       {/* Progress Bar */}
       <div className="flex gap-2 mb-8 justify-center">
          {QUESTIONS.map((qs, i) => (
              <button 
                key={i}
                onClick={() => setActiveQ(i)}
                className={`h-2 w-12 rounded-full transition-colors ${i === activeQ ? 'bg-indigo-600' : 'bg-slate-200'}`}
              />
          ))}
       </div>

       <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
           <div className="bg-slate-50 p-6 border-b border-slate-200">
               <h2 className="text-2xl font-bold text-slate-800 mb-2">{q.title}</h2>
               <p className="text-slate-600 mb-4">{q.intro}</p>
               <div className="bg-white p-4 rounded-lg border border-slate-200 inline-block shadow-sm">
                   <span className="font-serif text-xl">$$ {q.math} $$</span>
               </div>
           </div>

           <div className="p-8">
               {q.tableData.length > 0 && (
                   <div className="mb-8 bg-indigo-50/50 rounded-xl p-6 border border-indigo-100">
                       <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">{q.tableCaption}</p>
                       <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-w-sm">
                           <div className="text-xs font-mono text-slate-400 border-b pb-1">x</div>
                           <div className="text-xs font-mono text-slate-400 border-b pb-1">f(x)</div>
                           {q.tableData.map((row, i) => (
                               <React.Fragment key={i}>
                                   <div className="font-mono text-slate-700">{row.x}</div>
                                   <div className="font-mono text-indigo-600 font-bold">{row.y}</div>
                               </React.Fragment>
                           ))}
                       </div>
                       <p className="text-xs text-slate-500 mt-4 italic">
                           Data suggests limit is {q.id === 0 ? '0.5' : (q.id === 1 ? '0' : 'DNE')}... but wait! The question asks for the OTHER side.
                       </p>
                   </div>
               )}

               <div className="mb-8">
                   <h3 className="font-bold text-slate-800 mb-4 text-lg">{q.prompt}</h3>
                   <div className="space-y-3">
                       {q.options.map((opt, idx) => (
                           <button
                             key={idx}
                             onClick={() => handleMCQ(q.id, idx)}
                             className={`w-full text-left p-4 rounded-lg border transition-all flex justify-between items-center group
                                ${answers[`${q.id}_mcq`] === idx 
                                    ? (results[`${q.id}_mcq`] ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800')
                                    : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50'
                                }
                             `}
                           >
                               <span className="flex items-center gap-3">
                                   <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                                       ${answers[`${q.id}_mcq`] === idx ? 'border-current' : 'border-slate-300 group-hover:border-indigo-400'}
                                   `}>
                                       {answers[`${q.id}_mcq`] === idx && <div className="w-2 h-2 rounded-full bg-current" />}
                                   </div>
                                   {opt.text}
                               </span>
                               {answers[`${q.id}_mcq`] === idx && (
                                   <span className="text-xl">{results[`${q.id}_mcq`] ? '✅' : '❌'}</span>
                               )}
                           </button>
                       ))}
                   </div>
               </div>

               {results[`${q.id}_mcq`] && (
                   <div className="animate-fade-in pt-6 border-t border-slate-100">
                       <h3 className="font-bold text-slate-800 mb-3">{q.inputPrompt}</h3>
                       <div className="flex gap-4">
                           <input 
                              type="text" 
                              placeholder="e.g. 0.5 or DNE"
                              className={`border-2 rounded-lg px-4 py-2 font-mono outline-none transition-colors w-48
                                 ${results[`${q.id}_input`] === true ? 'border-green-500 text-green-700 bg-green-50' : 
                                   results[`${q.id}_input`] === false ? 'border-red-500 text-red-700 bg-red-50' : 'border-slate-300 focus:border-indigo-500'}
                              `}
                              onChange={(e) => handleInput(q.id, e.target.value)}
                           />
                           {results[`${q.id}_input`] === true && (
                               <div className="flex items-center text-green-600 font-bold gap-2">
                                   <span>Correct!</span>
                               </div>
                           )}
                       </div>
                   </div>
               )}

           </div>
           
           <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between">
               <button 
                 onClick={() => setActiveQ(Math.max(0, activeQ - 1))}
                 disabled={activeQ === 0}
                 className="px-4 py-2 text-slate-500 disabled:opacity-30 hover:text-slate-800 font-bold"
               >
                   ← Previous
               </button>
               <button 
                 onClick={() => setActiveQ(Math.min(QUESTIONS.length - 1, activeQ + 1))}
                 disabled={activeQ === QUESTIONS.length - 1}
                 className="px-6 py-2 bg-slate-900 text-white rounded-lg disabled:opacity-30 hover:bg-slate-800 font-bold shadow-md"
               >
                   Next Function →
               </button>
           </div>
       </div>
    </div>
  );
};
