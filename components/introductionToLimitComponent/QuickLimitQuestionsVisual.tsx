import React, { useState } from 'react';

type Scenario = 0 | 1 | 2 | 3;

export const QuickLimitQuestionsVisual: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>(0);

  // --- CONFIGURATION ---
  const SCENARIOS = [
    {
      id: 0,
      title: "Left vs Right Existence",
      question: "If Right Limit exists, MUST Left Limit exist?",
      answer: "NO",
      kidTitle: "The Cliff Edge",
      kidDesc: "Just because there is a road on the Right side, doesn't mean there is ground on the Left side!",
      phdDesc: "Counter-Example: f(x) = √x. Right limit at x=0 is 0. Left limit is undefined (complex domain).",
      func: (x: number) => (x < 0 ? NaN : Math.sqrt(x)),
      domainError: true // Flag to show error on left
    },
    {
      id: 1,
      title: "Matching Sides",
      question: "If Left Limit = L and Right Limit = R, MUST L = R?",
      answer: "NO",
      kidTitle: "The Misaligned Bridge",
      kidDesc: "The Left Team built low. The Right Team built high. They don't have to match!",
      phdDesc: "Counter-Example: Heaviside Step Function. Left limit is 0, Right limit is 1. L ≠ R.",
      func: (x: number) => (x < 0 ? 0.5 : 2.5),
      domainError: false
    },
    {
      id: 2,
      title: "Limit vs Function",
      question: "If Limit is R, MUST the function value f(a) = R?",
      answer: "NO",
      kidTitle: "The Flying House",
      kidDesc: "The road points to the empty lot, but the house floated up into the sky!",
      phdDesc: "Counter-Example: Removable Discontinuity. Limit exists (is continuous path), but point is displaced.",
      func: (x: number) => x * x + 1, // Visual curve
      pointY: 4, // Actual point at x=0
      limitY: 1, // Limit at x=0
      domainError: false
    },
    {
      id: 3,
      title: "Function vs Limit",
      question: "If f(a) = K, MUST the Limit be K?",
      answer: "NO",
      kidTitle: "The Hidden Basement",
      kidDesc: "Just because a house is at height K doesn't mean the road leads there. The road might go way over head!",
      phdDesc: "Counter-Example: f(0)=0, but f(x)=2 for x>0. The value is defined, but the limit approaches something else.",
      func: (x: number) => 2, // Road is at 2
      pointY: 0, // Point is at 0
      limitY: 2,
      domainError: false
    }
  ];

  const currentScen = SCENARIOS[scenario];

  // --- GRAPH RENDERING ---
  const width = 600;
  const height = 350;
  const padding = 50;
  const xMin = -2;
  const xMax = 2;
  const yMin = -1;
  const yMax = 5;

  const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  const renderCurve = () => {
    // Left side path
    let dLeft = "";
    if (!currentScen.domainError) {
        for(let i=0; i<=100; i++) {
            const x = -2 + (i/100)*1.95; // Up to -0.05
            const y = currentScen.func(x);
            if(!isNaN(y)) {
                const px = toPxX(x);
                const py = toPxY(y);
                dLeft += (i===0 ? `M ${px} ${py}` : ` L ${px} ${py}`);
            }
        }
    }

    // Right side path
    let dRight = "";
    for(let i=0; i<=100; i++) {
        const x = 0.05 + (i/100)*1.95; // Start at 0.05
        const y = currentScen.func(x);
        if(!isNaN(y)) {
            const px = toPxX(x);
            const py = toPxY(y);
            dRight += (i===0 ? `M ${px} ${py}` : ` L ${px} ${py}`);
        }
    }

    return (
        <>
            {dLeft && <path d={dLeft} stroke="#6366f1" strokeWidth="4" fill="none" />}
            {dRight && <path d={dRight} stroke="#ec4899" strokeWidth="4" fill="none" />}
            
            {/* If domain error, visualize the void */}
            {currentScen.domainError && (
                <g>
                    <rect x={padding} y={padding} width={toPxX(0) - padding} height={height - 2*padding} fill="#fee2e2" opacity="0.3" />
                    <text x={toPxX(-1)} y={toPxY(2)} fill="#ef4444" textAnchor="middle" className="font-bold text-sm">UNDEFINED REGION</text>
                </g>
            )}

            {/* Special Points logic */}
            {/* Scenario 2 & 3 have specific point vs limit logic */}
            {(scenario === 2 || scenario === 3) && (
                <>
                    {/* The Limit Hole */}
                    <circle cx={toPxX(0)} cy={toPxY(currentScen.limitY || 0)} r="6" fill="white" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2,2"/>
                    
                    {/* The Actual Point */}
                    <circle cx={toPxX(0)} cy={toPxY(currentScen.pointY || 0)} r="6" fill="#10b981" stroke="white" strokeWidth="2"/>
                    <text x={toPxX(0) + 15} y={toPxY(currentScen.pointY || 0)} className="fill-emerald-600 font-bold text-xs">f(a)</text>
                </>
            )}

            {/* Scenario 1: Jump points */}
            {scenario === 1 && (
                <>
                   <circle cx={toPxX(0)} cy={toPxY(0.5)} r="6" fill="white" stroke="#6366f1" strokeWidth="2" />
                   <circle cx={toPxX(0)} cy={toPxY(2.5)} r="6" fill="#ec4899" stroke="white" strokeWidth="2" />
                </>
            )}

            {/* Scenario 0: Limit point */}
            {scenario === 0 && (
                <circle cx={toPxX(0)} cy={toPxY(0)} r="6" fill="#ec4899" stroke="white" strokeWidth="2" />
            )}

        </>
    );
  };

  const renderKidInfograph = () => {
      switch(scenario) {
          case 0: // Cliff
             return (
                 <svg viewBox="0 0 200 120" className="w-full bg-sky-50 rounded-xl border border-sky-100">
                     <path d="M 100 80 L 190 80" stroke="#ec4899" strokeWidth="4" />
                     <path d="M 0 120 L 100 120 L 100 80 L 200 80 L 200 120 Z" fill="#cbd5e1" />
                     <text x="50" y="100" textAnchor="middle" fontSize="10" fill="#94a3b8">NO GROUND!</text>
                     <text x="150" y="70" textAnchor="middle" fontSize="20">🚗</text>
                 </svg>
             );
          case 1: // Jump
             return (
                <svg viewBox="0 0 200 120" className="w-full bg-sky-50 rounded-xl border border-sky-100">
                    <path d="M 0 100 L 90 100" stroke="#6366f1" strokeWidth="4" />
                    <path d="M 110 40 L 200 40" stroke="#ec4899" strokeWidth="4" />
                    <text x="100" y="70" textAnchor="middle" fontSize="30">🤷‍♂️</text>
                    <text x="40" y="90" fontSize="20">👷</text>
                    <text x="160" y="30" fontSize="20">👷‍♀️</text>
                </svg>
             );
          case 2: // Floating House
             return (
                <svg viewBox="0 0 200 120" className="w-full bg-sky-50 rounded-xl border border-sky-100">
                    <path d="M 0 90 Q 100 90 200 90" stroke="#64748b" strokeWidth="4" />
                    {/* Hole */}
                    <circle cx="100" cy="90" r="6" fill="white" stroke="#64748b" strokeWidth="2"/>
                    {/* House High Up */}
                    <rect x="90" y="20" width="20" height="20" fill="#10b981" />
                    <path d="M 90 20 L 100 10 L 110 20 Z" fill="#10b981" />
                    <line x1="100" y1="40" x2="100" y2="82" stroke="#94a3b8" strokeDasharray="2,2" />
                    <text x="130" y="30" fontSize="10" fill="#10b981">Moved!</text>
                </svg>
             );
          case 3: // Hidden Basement
             return (
                <svg viewBox="0 0 200 120" className="w-full bg-sky-50 rounded-xl border border-sky-100">
                     <path d="M 100 50 L 190 50" stroke="#ec4899" strokeWidth="4" />
                     {/* House Low */}
                     <rect x="90" y="90" width="20" height="20" fill="#10b981" />
                     <path d="M 90 90 L 100 80 L 110 90 Z" fill="#10b981" />
                     <text x="150" y="40" fontSize="20">🚗</text>
                     <text x="60" y="105" fontSize="10" fill="#10b981" textAnchor="end">House is here</text>
                </svg>
             );
      }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in pb-20">
      
      {/* LEFT: Scenario Selection */}
      <div className="lg:w-1/3 flex flex-col gap-4">
         <h2 className="text-xl font-bold text-slate-800">Logic Traps</h2>
         
         <div className="grid grid-cols-1 gap-3">
             {SCENARIOS.map((s) => (
                 <button
                    key={s.id}
                    onClick={() => setScenario(s.id as Scenario)}
                    className={`p-4 rounded-xl border text-left transition-all group
                        ${scenario === s.id 
                            ? 'bg-slate-800 text-white border-slate-900 shadow-lg' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                        }
                    `}
                 >
                     <div className="font-bold text-sm mb-1">{s.title}</div>
                     <div className={`text-xs ${scenario === s.id ? 'text-slate-400' : 'text-slate-500'}`}>{s.question}</div>
                 </button>
             ))}
         </div>

         <div className="mt-4 bg-white rounded-2xl border-2 border-indigo-100 p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-4">
                 <span className="text-xl">👶</span>
                 <h3 className="font-bold text-indigo-900">{currentScen.kidTitle}</h3>
             </div>
             <div className="mb-4">
                 {renderKidInfograph()}
             </div>
             <p className="text-sm text-slate-600 leading-relaxed">
                 {currentScen.kidDesc}
             </p>
         </div>
      </div>

      {/* RIGHT: Simulator */}
      <div className="lg:w-2/3 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
          
          <div className="px-6 py-4 bg-black/20 border-b border-white/10 flex justify-between items-center">
              <div>
                  <h3 className="text-white font-bold text-lg">Counter-Example Simulation</h3>
                  <p className="text-slate-400 text-xs font-mono">Disproving the "MUST"</p>
              </div>
              <div className="bg-red-500/20 px-3 py-1 rounded text-red-400 font-bold text-sm border border-red-500/30">
                  ANSWER: {currentScen.answer}
              </div>
          </div>

          <div className="relative flex-grow min-h-[400px] bg-[#0f172a]">
              <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
                  <defs>
                      <pattern id="grid-q8" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1"/>
                      </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-q8)" />
                  
                  {/* Axes */}
                  <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#475569" strokeWidth="2" />
                  <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#475569" strokeWidth="2" />
                  <text x={toPxX(0)+10} y={padding+10} className="fill-slate-500 text-xs font-mono">y</text>
                  <text x={width-padding-20} y={toPxY(0)+20} className="fill-slate-500 text-xs font-mono">x</text>

                  {renderCurve()}
              </svg>

              <div className="absolute bottom-6 right-6 max-w-xs bg-slate-800/90 backdrop-blur p-4 rounded-xl border border-white/10 shadow-xl">
                  <div className="text-[10px] uppercase font-bold text-indigo-400 mb-2 tracking-wider">PhD Explanation</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                      {currentScen.phdDesc}
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
};
