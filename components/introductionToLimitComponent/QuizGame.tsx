
import React, { useState } from 'react';

type QuizGraphType = 'jump' | 'hole' | 'smooth';

interface QuizGraphProps {
  type: QuizGraphType;
  highlightX?: number;
}

const QuizGraph: React.FC<QuizGraphProps> = ({ type }) => {
  const width = 300;
  const height = 200;
  const padding = 30;

  // Helper to map coordinates
  const toPxX = (x: number) => padding + (x / 10) * (width - 2 * padding);
  const toPxY = (y: number) => height - padding - (y / 6) * (height - 2 * padding);

  const renderPaths = () => {
    if (type === 'jump') {
      // Left piece: y = x/2 + 1 ending at x=5 (y=3.5)
      // Right piece: y = x/2 + 2 starting at x=5 (y=4.5)
      return (
        <>
          <path d={`M ${toPxX(0)} ${toPxY(1)} L ${toPxX(5)} ${toPxY(3.5)}`} stroke="#6366f1" strokeWidth="3" fill="none" />
          <circle cx={toPxX(5)} cy={toPxY(3.5)} r="5" fill="white" stroke="#6366f1" strokeWidth="2" />
          
          <path d={`M ${toPxX(5)} ${toPxY(4.5)} L ${toPxX(10)} ${toPxY(7)}`} stroke="#ec4899" strokeWidth="3" fill="none" />
          <circle cx={toPxX(5)} cy={toPxY(4.5)} r="5" fill="#ec4899" />
          
          {/* Dashed line at x=5 */}
          <line x1={toPxX(5)} y1={toPxY(0)} x2={toPxX(5)} y2={toPxY(6)} stroke="#94a3b8" strokeDasharray="4,4" />
          <text x={toPxX(5)} y={toPxY(0) + 15} textAnchor="middle" className="text-xs font-bold fill-slate-500">x=5</text>
        </>
      );
    } else if (type === 'hole') {
       // Smooth curve with hole at x=5
       // y = -0.1(x-5)^2 + 4
       let d = `M ${toPxX(0)} ${toPxY(1.5)}`;
       for(let x=0.1; x<=10; x+=0.1) {
         const y = -0.08 * Math.pow(x-5, 2) + 4;
         d += ` L ${toPxX(x)} ${toPxY(y)}`;
       }
       return (
         <>
           <path d={d} stroke="#10b981" strokeWidth="3" fill="none" />
           {/* Hole at x=5, y=4 */}
           <circle cx={toPxX(5)} cy={toPxY(4)} r="5" fill="white" stroke="#10b981" strokeWidth="2" />
           {/* Actual point defined elsewhere (e.g. y=2) */}
           <circle cx={toPxX(5)} cy={toPxY(2)} r="5" fill="#10b981" />
           <text x={toPxX(5) + 10} y={toPxY(2)} className="text-xs font-bold fill-slate-600">f(5)</text>
           
           <line x1={toPxX(5)} y1={toPxY(0)} x2={toPxX(5)} y2={toPxY(6)} stroke="#94a3b8" strokeDasharray="4,4" />
           <text x={toPxX(5)} y={toPxY(0) + 15} textAnchor="middle" className="text-xs font-bold fill-slate-500">x=5</text>
         </>
       );
    }
    return null;
  };

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="bg-white rounded border border-slate-200">
        <defs>
            <pattern id="grid-small" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-small)" />
        <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#334155" strokeWidth="2" />
        <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#334155" strokeWidth="2" />
        {renderPaths()}
    </svg>
  );
};

export const IntroLimitsQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const questions = [
    {
      id: 1,
      title: "Case #1: The Broken Path",
      description: "Detective! Look at this function graph. The path breaks at x=5.",
      question: "Does the limit exist at x=5?",
      type: 'jump' as QuizGraphType,
      options: [
        { text: "Yes, because there are points everywhere.", isCorrect: false },
        { text: "No, because the Left and Right sides don't meet.", isCorrect: true },
        { text: "Yes, limits always exist.", isCorrect: false },
      ],
      explanation: "Correct! For a limit to exist, the left path (purple) and right path (pink) must meet at the same height. Here, they are disconnected."
    },
    {
      id: 2,
      title: "Case #2: The Pothole",
      description: "Aha! The road is smooth, but there's a hole at x=5. The actual value is down at y=2.",
      question: "Does the limit exist at x=5?",
      type: 'hole' as QuizGraphType,
      options: [
        { text: "No, because there is a hole.", isCorrect: false },
        { text: "Yes! The limit is where the road WANTS to go (y=4).", isCorrect: true },
        { text: "Yes, the limit is the black dot (y=2).", isCorrect: false },
      ],
      explanation: "Spot on! The limit is about the journey (the road), not the destination (the dot). Even with a hole, the road approaches height 4."
    },
    {
      id: 3,
      title: "Case #3: Calculator Evidence",
      description: "We found these GPS coordinates approaching a mystery point:",
      question: "Based on the data, what is the Limit?",
      isTable: true,
      tableData: [
        { x: 2.9, y: 5.9 },
        { x: 2.99, y: 5.99 },
        { x: 2.999, y: 5.999 },
        { x: '...', y: '?' },
      ],
      options: [
        { text: "5", isCorrect: false },
        { text: "5.999", isCorrect: false },
        { text: "6", isCorrect: true },
      ],
      explanation: "Excellent work. As X gets closer and closer to 3, Y gets closer and closer to 6."
    }
  ];

  const handleAnswer = (isCorrect: boolean) => {
    if (feedback !== null) return; // Prevent double clicks
    
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(score + 1);
  };

  const nextStep = () => {
    setFeedback(null);
    if (step < questions.length) {
      setStep(step + 1);
    }
  };

  if (step >= questions.length) {
    return (
      <div className="bg-indigo-900 rounded-xl p-8 text-white text-center shadow-xl">
        <h3 className="text-3xl font-bold mb-4">Case Closed!</h3>
        <div className="text-6xl mb-6">🕵️‍♂️</div>
        <p className="text-xl mb-6">You scored {score} out of {questions.length}.</p>
        <p className="text-indigo-200 mb-8">
          {score === questions.length 
            ? "You are a Master Limit Detective! You understand that limits are about the journey, not just the destination."
            : "Good detective work! Review the cases to sharpen your skills."}
        </p>
        <button 
          onClick={() => { setStep(0); setScore(0); }}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-full transition"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQ = questions[step];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-10">
      {/* Header */}
      <div className="bg-slate-900 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <span className="text-2xl">🕵️‍♀️</span>
            <h3 className="text-lg font-bold text-white font-mono">Limit Detective: {currentQ.title}</h3>
        </div>
        <div className="text-slate-400 text-sm font-mono">Case {step + 1}/{questions.length}</div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
            {/* Visual / Evidence */}
            <div className="flex-1">
                {currentQ.isTable ? (
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 h-full flex items-center justify-center">
                        <table className="w-full text-center border-collapse">
                            <thead>
                                <tr className="border-b border-slate-300">
                                    <th className="p-2 font-mono text-slate-500">X (Input)</th>
                                    <th className="p-2 font-mono text-slate-500">Y (Output)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentQ.tableData?.map((row, i) => (
                                    <tr key={i} className="even:bg-white odd:bg-slate-100 font-mono">
                                        <td className="p-2 border-r border-slate-200">{row.x}</td>
                                        <td className="p-2 font-bold text-indigo-600">{row.y}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="h-48 md:h-64 w-full">
                        <QuizGraph type={currentQ.type} />
                    </div>
                )}
            </div>

            {/* Question & Options */}
            <div className="flex-1 flex flex-col justify-center">
                <p className="text-slate-600 mb-2 italic">{currentQ.description}</p>
                <h4 className="text-xl font-bold text-slate-900 mb-6">{currentQ.question}</h4>
                
                <div className="space-y-3">
                    {currentQ.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(opt.isCorrect)}
                            disabled={feedback !== null}
                            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between
                                ${feedback === null 
                                    ? 'border-slate-200 hover:border-indigo-500 hover:bg-indigo-50' 
                                    : opt.isCorrect 
                                        ? 'border-green-500 bg-green-50 text-green-800' 
                                        : 'border-slate-200 opacity-50'
                                }
                            `}
                        >
                            <span>{opt.text}</span>
                            {feedback !== null && opt.isCorrect && <span>✅</span>}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Feedback Overlay */}
        {feedback && (
            <div className={`mt-6 p-4 rounded-lg border ${feedback === 'correct' ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'} animate-fade-in`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h5 className={`font-bold ${feedback === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                            {feedback === 'correct' ? 'Correct Evidence!' : 'Incorrect.'}
                        </h5>
                        <p className="text-sm mt-1 text-slate-700">{currentQ.explanation}</p>
                    </div>
                    <button 
                        onClick={nextStep}
                        className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition shadow-lg"
                    >
                        Next Case →
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
