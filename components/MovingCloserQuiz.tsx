
import React, { useState } from 'react';

export const MovingCloserQuiz: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isOptionCorrect, setIsOptionCorrect] = useState<boolean | null>(null);
  
  const [inputValue, setInputValue] = useState('');
  const [isInputCorrect, setIsInputCorrect] = useState<boolean | null>(null);

  const options = [
    { text: "f(x) gets closer and closer to a particular number", isCorrect: true },
    { text: "f(x) gets bigger and bigger in the positive direction without bound", isCorrect: false },
    { text: "f(x) gets bigger and bigger in the negative direction without bound", isCorrect: false },
    { text: "None of the above", isCorrect: false },
  ];

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setIsOptionCorrect(options[index].isCorrect);
  };

  const handleInputCheck = () => {
    const val = parseFloat(inputValue);
    const textVal = inputValue.trim().toUpperCase();

    // The limit is 2. Accept 2 or 2.0
    if (!isNaN(val) && Math.abs(val - 2) < 0.001) {
      setIsInputCorrect(true);
    } else {
      setIsInputCorrect(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      
      {/* Part 1: Multiple Choice */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="text-slate-800 mb-4 leading-relaxed">
          <p className="mb-4">
            Determine what happens to <span className="font-serif italic">f(x)</span> = 
            <span className="inline-block align-middle mx-1">
              <span className="block text-center border-b border-black leading-tight text-xs mb-0.5">√<span className="border-t border-transparent">3 - 5x + x² + x³</span></span>
              <span className="block text-center leading-tight text-xs">x - 1</span>
            </span> 
             as <span className="italic">x</span> approaches 1 from the <strong>right</strong>.
          </p>
          <p className="text-sm text-slate-600">
             Take values of <span className="italic">x</span> that are greater than 1, but getting closer and closer to 1. 
             For instance, you could try <span className="font-mono text-xs bg-slate-100 px-1 rounded">x = 1.1, 1.01, 1.001</span>, etc.
          </p>
        </div>

        <h4 className="font-bold text-slate-700 mb-3">
            What happens to <span className="italic">f(x)</span> as <span className="italic">x</span> approaches 1 from the right?
        </h4>

        <div className="space-y-3">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3 group
                ${selectedOption === idx 
                  ? (isOptionCorrect ? 'border-green-600 bg-green-50 ring-1 ring-green-600' : 'border-red-500 bg-red-50')
                  : 'border-slate-200 hover:bg-slate-50'
                }
              `}
            >
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors
                 ${selectedOption === idx
                    ? (isOptionCorrect ? 'border-green-600 bg-white' : 'border-red-600 bg-white')
                    : 'border-slate-400 group-hover:border-indigo-400'
                 }
              `}>
                {selectedOption === idx && <div className={`w-2.5 h-2.5 rounded-full ${isOptionCorrect ? 'bg-green-600' : 'bg-red-600'}`}></div>}
              </div>
              <span className={`${selectedOption === idx ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>{opt.text}</span>
            </button>
          ))}
        </div>
        
        {isOptionCorrect && (
             <div className="mt-3 text-green-700 font-bold flex items-center gap-2 animate-fade-in ml-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                Correct
             </div>
        )}
      </div>

      {/* Part 2: Input */}
      {isOptionCorrect && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in">
          <h4 className="font-bold text-slate-700 mb-2">
            What value does <span className="italic">f(x)</span> get closer to?
          </h4>
          <p className="text-sm text-slate-500 mb-4">
             Enter the number below; if there is no such value, enter capital <span className="font-mono font-bold text-slate-700">DNE</span> (for "does not exist").
          </p>
          
          <div className="flex items-start gap-4">
             <div className="relative">
                <input 
                type="text" 
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); setIsInputCorrect(null); }}
                className={`border rounded px-4 py-2 w-40 text-lg font-mono focus:outline-none focus:ring-2 transition-colors
                    ${isInputCorrect === true 
                        ? 'border-green-500 ring-green-200 text-green-700' 
                        : isInputCorrect === false
                            ? 'border-red-500 ring-red-200'
                            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200'
                    }
                `}
                />
                {isInputCorrect === true && (
                    <div className="absolute right-3 top-3 text-green-600 pointer-events-none">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    </div>
                )}
             </div>

             <button 
               onClick={handleInputCheck}
               className="bg-indigo-600 text-white px-6 py-2.5 rounded font-bold hover:bg-indigo-700 transition shadow-sm"
             >
               Submit
             </button>
          </div>

          {isInputCorrect === true && (
             <div className="mt-3 text-green-700 font-bold flex items-center gap-2 animate-fade-in">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                Correct
             </div>
          )}
          
          {isInputCorrect === false && (
              <div className="mt-3 text-red-600 text-sm font-medium animate-fade-in">
                 Incorrect. Look at the pattern in the Python Lab or Table again.
              </div>
          )}
        </div>
      )}

    </div>
  );
};
