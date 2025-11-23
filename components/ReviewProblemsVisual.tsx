
import React, { useState } from 'react';

export const ReviewProblemsVisual: React.FC = () => {
  const [activeConcept, setActiveConcept] = useState<0 | 1 | 2>(2); // Default to Floor function as it is the most complex
  const [floorX, setFloorX] = useState(2.0); // For Floor function visual

  // --- CONCEPTS DATA ---
  const CONCEPTS = [
    {
      id: 0,
      title: "Function vs Limit",
      descKid: "Just because a house exists at an address, doesn't mean the road leads there!",
      descPhD: "The existence of f(a) implies nothing about lim x→a f(x). The point could be a removable discontinuity (displaced point)."
    },
    {
      id: 1,
      title: "Double-Sided Logic",
      descKid: "If the Left Path and Right Path both meet at height 3, then the Limit IS 3. It's that simple!",
      descPhD: "Theorem: lim x→a f(x) = L if and only if lim x→a⁻ f(x) = L AND lim x→a⁺ f(x) = L."
    },
    {
      id: 2,
      title: "The Floor Function",
      descKid: "The Staircase! You stay on one step until you reach the very edge, then PLOP! You fall to the next step.",
      descPhD: "f(x) = ⌊x⌋. Greatest integer less than or equal to x. Left-continuous, but discontinuous at integers."
    }
  ];

  // --- FLOOR FUNCTION HELPERS ---
  const floorFunc = (x: number) => Math.floor(x);
  
  // --- GRAPH RENDERING ---
  const width = 600;
  const height = 350;
  const padding = 50;

  const renderFloorGraph = () => {
    const xMin = 0;
    const xMax = 4;
    const yMin = 0;
    const yMax = 4;

    const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

    // Draw steps
    const steps = [];
    for (let i = 0; i < 4; i++) {
        // Line from i to i+1 at height i
        steps.push(
            <line key={`line-${i}`} x1={toPxX(i)} y1={toPxY(i)} x2={toPxX(i+1)} y2={toPxY(i)} stroke="#4f46e5" strokeWidth="4" />
        );
        // Solid dot at left (i, i)
        steps.push(
            <circle key={`dot-${i}`} cx={toPxX(i)} cy={toPxY(i)} r="5" fill="#4f46e5" />
        );
        // Open circle at right (i+1, i)
        steps.push(
            <circle key={`open-${i}`} cx={toPxX(i+1)} cy={toPxY(i)} r="5" fill="white" stroke="#4f46e5" strokeWidth="2" />
        );
        // Dashed drop line
        steps.push(
            <line key={`dash-${i}`} x1={toPxX(i+1)} y1={toPxY(i)} x2={toPxX(i+1)} y2={toPxY(i+1)} stroke="#cbd5e1" strokeDasharray="4,4" />
        );
    }

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
            <defs>
                <pattern id="grid-floor" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-floor)" />
            
            {/* Axes */}
            <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#64748b" strokeWidth="2" />
            <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#64748b" strokeWidth="2" />

            {/* Labels */}
            {[1, 2, 3].map(n => (
                <text key={`x-${n}`} x={toPxX(n)} y={toPxY(0)+20} textAnchor="middle" className="font-mono text-xs fill-slate-500">{n}</text>
            ))}
            {[1, 2, 3].map(n => (
                <text key={`y-${n}`} x={toPxX(0)-15} y={toPxY(n)+5} textAnchor="end" className="font-mono text-xs fill-slate-500">{n}</text>
            ))}

            {/* Steps */}
            {steps}

            {/* Interactive Point */}
            <circle 
                cx={toPxX(floorX)} 
                cy={toPxY(Math.floor(floorX))} 
                r="8" 
                fill="#ec4899" 
                stroke="white" 
                strokeWidth="2" 
                className="transition-all duration-75"
            />
            
            {/* Projection Lines */}
            <line x1={toPxX(floorX)} y1={toPxY(Math.floor(floorX))} x2={toPxX(floorX)} y2={toPxY(0)} stroke="#ec4899" strokeDasharray="2,2" opacity="0.5" />
            <line x1={toPxX(floorX)} y1={toPxY(Math.floor(floorX))} x2={toPxX(0)} y2={toPxY(Math.floor(floorX))} stroke="#ec4899" strokeDasharray="2,2" opacity="0.5" />

        </svg>
    );
  };

  const renderLogicGraph = (type: 'exist' | 'double') => {
      // Reusing simple SVGs for logic concepts
      return (
          <svg width="100%" height="100%" viewBox="0 0 600 350">
             <rect width="600" height="350" fill="#f8fafc" />
             {type === 'exist' ? (
                 <>
                    {/* Road leads to hole, House is elsewhere */}
                    <path d="M 50 250 Q 300 250 550 250" stroke="#94a3b8" strokeWidth="4" fill="none" />
                    <circle cx="300" cy="250" r="10" fill="white" stroke="#94a3b8" strokeWidth="3" />
                    <text x="300" y="280" textAnchor="middle" className="text-sm fill-slate-500">Limit (Hole)</text>

                    <rect x="290" y="100" width="20" height="20" fill="#10b981" />
                    <path d="M 290 100 L 300 85 L 310 100 Z" fill="#10b981" />
                    <text x="330" y="115" className="text-sm fill-emerald-600 font-bold">f(a)</text>
                    <line x1="300" y1="130" x2="300" y2="240" stroke="#10b981" strokeDasharray="4,4" />
                 </>
             ) : (
                 <>
                    {/* Left and Right meet */}
                    <path d="M 50 200 L 300 150" stroke="#f59e0b" strokeWidth="4" />
                    <path d="M 550 200 L 300 150" stroke="#3b82f6" strokeWidth="4" />
                    <circle cx="300" cy="150" r="8" fill="#1e293b" />
                    <text x="300" y="130" textAnchor="middle" className="text-lg font-bold fill-slate-800">3</text>
                    <text x="100" y="180" className="fill-amber-600 font-bold">Left → 3</text>
                    <text x="450" y="180" className="fill-blue-600 font-bold">Right → 3</text>
                 </>
             )}
          </svg>
      );
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in pb-20">
      
      {/* Left Panel: Concept Selector & Kid Logic */}
      <div className="xl:w-1/3 flex flex-col gap-6">
          <div className="space-y-2">
              <h3 className="font-bold text-slate-800 mb-2">Select Review Topic</h3>
              {CONCEPTS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveConcept(c.id as any)}
                    className={`w-full p-4 rounded-xl text-left border transition-all ${
                        activeConcept === c.id 
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                      <div className="font-bold">{c.title}</div>
                  </button>
              ))}
          </div>

          <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🧸</span>
                  <h3 className="font-bold text-indigo-900">For 5-Year-Olds</h3>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                  {CONCEPTS[activeConcept].descKid}
              </p>
          </div>
      </div>

      {/* Right Panel: Simulator */}
      <div className="xl:w-2/3 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          
          <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
              <div>
                  <h2 className="font-bold text-lg">{CONCEPTS[activeConcept].title}</h2>
                  <p className="text-slate-400 text-xs">Interactive Review</p>
              </div>
          </div>

          <div className="relative flex-grow min-h-[400px] bg-slate-50">
              {activeConcept === 2 ? renderFloorGraph() : renderLogicGraph(activeConcept === 0 ? 'exist' : 'double')}
          </div>

          {/* Controls for Floor Function */}
          {activeConcept === 2 && (
              <div className="p-6 bg-slate-100 border-t border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider w-20">Walk x</span>
                      <input 
                        type="range" min="0" max="3.99" step="0.01"
                        value={floorX}
                        onChange={(e) => setFloorX(parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <span className="font-mono font-bold w-12 text-right">{floorX.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-200">
                      <div className="text-center">
                          <div className="text-xs text-slate-400 uppercase font-bold">Current Step</div>
                          <div className="text-2xl font-mono text-indigo-600 font-bold">⌊{Math.floor(floorX)}⌋</div>
                      </div>
                      <div className="text-center border-l pl-6">
                           <div className="text-xs text-slate-400 uppercase font-bold">Approaching Integer?</div>
                           <div className={`text-sm font-bold ${Math.abs(floorX - Math.round(floorX)) < 0.1 ? 'text-red-500' : 'text-slate-400'}`}>
                               {Math.abs(floorX - Math.round(floorX)) < 0.1 ? "⚠️ WATCH OUT FOR DROP!" : "Safe Zone"}
                           </div>
                      </div>
                  </div>
              </div>
          )}

          {/* Context for Logic */}
          {activeConcept !== 2 && (
              <div className="p-6 bg-slate-800 text-slate-300 text-sm">
                  <span className="font-bold text-white uppercase tracking-wider text-xs block mb-1">PhD Definition</span>
                  {CONCEPTS[activeConcept].descPhD}
              </div>
          )}

      </div>

    </div>
  );
};
