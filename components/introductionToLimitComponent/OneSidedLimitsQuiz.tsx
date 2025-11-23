
import React, { useState } from 'react';

export const OneSidedLimitsQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const questions = [
    {
      id: 1,
      question: "Focus on the Green Line (Left Side). As x gets closer to 2 from the left, what value is y approaching?",
      options: ["1", "2", "3", "0"],
      correct: 2, // Index for "3"
      explanation: "Correct! Following the green path from the left, it climbs up to a height of 3."
    },
    {
      id: 2,
      question: "Now look at the Orange Line (Right Side). As x gets closer to 2 from the right, what value is y approaching?",
      options: ["1", "2", "3", "5"],
      correct: 0, // Index for "1"
      explanation: "Exactly. Coming from the right side, the path drops down to a height of 1."
    },
    {
      id: 3,
      question: "Does the overall limit exist at x = 2?",
      options: [
        "Yes, because both sides have limits.",
        "No, because the left and right limits are different.",
        "Yes, the limit is the average (2).",
        "No, because there is an open circle."
      ],
      correct: 1,
      explanation: "Perfect. Since the Left Hand Limit (3) ≠ Right Hand Limit (1), the overall limit does not exist. The bridge is broken!"
    },
    {
      id: 4,
      question: "How do we write 'Left Hand Limit' in math notation?",
      options: [
        "lim x→2⁻",
        "lim x→2⁺",
        "lim x←2",
        "lim x→-2"
      ],
      correct: 0,
      explanation: "That's it! The little minus sign (⁻) superscript means 'approaching from the negative side' (left)."
    }
  ];

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    
    const isCorrect = index === questions[step].correct;
    if (isCorrect) setScore(score + 1);
    setFeedback(isCorrect ? 'correct' : 'wrong');
  };

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setStep(step + 1); // Move to result screen
    }
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback(null);
  };

  // --- Render the SVG Graph ---
  const renderQuizGraph = () => {
    const width = 400;
    const height = 250;
    const padding = 40;
    
    // Coordinate mapping
    // x: 0 to 4
    // y: 0 to 4
    const toPxX = (x: number) => padding + (x / 4) * (width - 2 * padding);
    const toPxY = (y: number) => height - padding - (y / 4) * (height - 2 * padding);

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="bg-slate-50 rounded border border-slate-200">
            {/* Grid */}
            <defs>
                <pattern id="q-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#q-grid)" />
            
            {/* Axes */}
            <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#64748b" strokeWidth="2" />
            <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#64748b" strokeWidth="2" />
            
            {/* Labels */}
            <text x={toPxX(4)-10} y={toPxY(0)+20} className="text-xs fill-slate-500 font-mono">x</text>
            <text x={toPxX(0)-20} y={padding+10} className="text-xs fill-slate-500 font-mono">y</text>

            {/* Dashed line at x=2 */}
            <line x1={toPxX(2)} y1={toPxY(0)} x2={toPxX(2)} y2={toPxY(4)} stroke="#94a3b8" strokeDasharray="4,4" />
            <text x={toPxX(2)} y={toPxY(0)+15} textAnchor="middle" className="text-xs font-bold fill-slate-600">x=2</text>

            {/* Left Function: Green, ends at (2, 3) */}
            {/* Path: parabola y = -0.5(x-2)^2 + 3 */}
            <path d={`M ${toPxX(0)} ${toPxY(1)} Q ${toPxX(1)} ${toPxY(3)} ${toPxX(2)} ${toPxY(3)}`} stroke="#10b981" strokeWidth="4" fill="none" />
            <circle cx={toPxX(2)} cy={toPxY(3)} r="5" fill="white" stroke="#10b981" strokeWidth="2" />
            <text x={toPxX(1)} y={toPxY(3)-10} className="text-xs font-bold fill-emerald-600">Left</text>
            <text x={toPxX(2)-15} y={toPxY(3)} textAnchor="end" className="text-xs font-mono font-bold fill-emerald-600">y=3</text>

            {/* Right Function: Orange, starts at (2, 1) */}
            {/* Path: line y = 0.5x */}
            <path d={`M ${toPxX(2)} ${toPxY(1)} L ${toPxX(4)} ${toPxY(2)}`} stroke="#f97316" strokeWidth="4" fill="none" />
            <circle cx={toPxX(2)} cy={toPxY(1)} r="5" fill="white" stroke="#f97316" strokeWidth="2" />
            <text x={toPxX(3)} y={toPxY(1.5)-10} className="text-xs font-bold fill-orange-600">Right</text>
            <text x={toPxX(2)-15} y={toPxY(1)} textAnchor="end" className="text-xs font-mono font-bold fill-orange-600">y=1</text>

        </svg>
    );
  };

  // --- Result Screen ---
  if (step >= questions.length) {
      return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center animate-fade-in max-w-2xl mx-auto">
            <div className="text-6xl mb-4">{score === questions.length ? '🎓' : '📝'}</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
            <p className="text-slate-600 mb-6">You scored <span className="font-bold text-indigo-600">{score}</span> out of {questions.length}</p>
            
            <div className="bg-slate-50 p-4 rounded-lg text-left border border-slate-200 mb-8">
                <p className="font-bold text-slate-700 mb-2">Review:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                    <li><strong>Left Limit (x→c⁻):</strong> Where the graph goes coming from the left.</li>
                    <li><strong>Right Limit (x→c⁺):</strong> Where the graph goes coming from the right.</li>
                    <li><strong>Existence:</strong> Limit exists ONLY if Left = Right.</li>
                </ul>
            </div>

            <button onClick={restart} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md font-bold">
                Try Again
            </button>
        </div>
      );
  }

  const q = questions[step];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left: Graph Visual */}
        <div className="md:w-1/2">
             <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 h-full">
                <div className="mb-3 flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Evidence</span>
                    <span className="text-slate-400 text-xs">Graph of f(x)</span>
                </div>
                <div className="h-64 w-full">
                    {renderQuizGraph()}
                </div>
             </div>
        </div>

        {/* Right: Question Panel */}
        <div className="md:w-1/2 flex flex-col justify-center">
             <div className="mb-4">
                 <span className="text-slate-400 font-mono text-xs uppercase">Question {step + 1} of {questions.length}</span>
                 <h3 className="text-lg font-bold text-slate-800 mt-1 leading-tight">{q.question}</h3>
             </div>

             <div className="space-y-3">
                 {q.options.map((opt, idx) => (
                     <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={selectedOption !== null}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex justify-between items-center
                            ${selectedOption === null 
                                ? 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-sm' 
                                : selectedOption === idx 
                                    ? (idx === q.correct ? 'bg-green-50 border-green-500 ring-1 ring-green-500' : 'bg-red-50 border-red-500 ring-1 ring-red-500')
                                    : 'bg-slate-50 border-slate-200 opacity-50'
                            }
                        `}
                     >
                        <span className={`font-medium ${selectedOption === idx && idx === q.correct ? 'text-green-800' : 'text-slate-700'}`}>{opt}</span>
                        {selectedOption === idx && (
                            <span>{idx === q.correct ? '✅' : '❌'}</span>
                        )}
                     </button>
                 ))}
             </div>

             {/* Feedback & Next Button */}
             {feedback && (
                 <div className={`mt-4 p-3 rounded-lg border text-sm ${feedback === 'correct' ? 'bg-green-100 border-green-200 text-green-800' : 'bg-red-100 border-red-200 text-red-800'} animate-fade-in`}>
                     <p className="font-bold mb-1">{feedback === 'correct' ? 'Correct!' : 'Not quite.'}</p>
                     <p className="mb-3">{q.explanation}</p>
                     <button 
                        onClick={nextStep}
                        className="w-full bg-slate-900 text-white py-2 rounded-md font-bold hover:bg-slate-800 transition"
                     >
                        {step < questions.length - 1 ? 'Next Question →' : 'See Results →'}
                     </button>
                 </div>
             )}
        </div>

      </div>
    </div>
  );
};
