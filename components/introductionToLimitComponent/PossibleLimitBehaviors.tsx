
import React, { useState } from 'react';

type BehaviorType = 'jump' | 'agree' | 'infinite' | 'oscillate';

export const PossibleLimitBehaviors: React.FC = () => {
  const [behavior, setBehavior] = useState<BehaviorType>('agree'); // Default to Agree
  const [zoom, setZoom] = useState(1);

  // --- Functions ---
  // Jump: f(x) = -1 for x<0, 1 for x>0
  // Agree: f(x) = x^2 + 1 (hole at 0)
  // Infinite: f(x) = 1/x^2
  // Oscillate: f(x) = sin(1/x)

  const getLabel = () => {
    switch (behavior) {
      case 'jump': return "Jump Discontinuity";
      case 'agree': return "Equality (Removable)";
      case 'infinite': return "Infinite Limit";
      case 'oscillate': return "Oscillation";
    }
  };

  const getDescription = () => {
    switch (behavior) {
      case 'agree': return "The right-hand and left-hand limits may both exist and be equal.";
      case 'jump': return "The right-hand and left-hand limits may both exist, but may fail to be equal.";
      case 'infinite': return "A right- and/or left-hand limit could fail to exist due to blowing up to ±∞. (Example: Consider the function 1/x near x=0.) In this case, we either say the limit blows up to infinity. We also say that the limit does not exist because ∞ is not a real number!";
      case 'oscillate': return "A right- and/or left-hand limit could fail to exist because it oscillates between many values and never settles down. In this case we say the limit does not exist.";
    }
  };

  // --- Render Graph (PhD Level) ---
  const renderGraph = () => {
    const width = 600;
    const height = 350;
    const padding = 50;

    // Zoom handling
    const scale = behavior === 'oscillate' ? 0.5 : (behavior === 'infinite' ? 4 : 2);
    const xRange = scale / zoom;
    const xMin = -xRange;
    const xMax = xRange;

    // Y Range
    let yMin = -2;
    let yMax = 2;
    if (behavior === 'infinite') { yMin = -1; yMax = 10; }
    if (behavior === 'agree') { yMin = 0; yMax = 3; }

    const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

    const generatePath = () => {
      let d = "";
      const steps = 600;
      const dx = (xMax - xMin) / steps;

      for (let i = 0; i <= steps; i++) {
        const x = xMin + i * dx;
        if (Math.abs(x) < 0.0001) continue; // Skip singularity

        let y = 0;
        if (behavior === 'jump') {
           y = x < 0 ? -1 : 1;
        } else if (behavior === 'agree') {
           y = x * x + 1; 
        } else if (behavior === 'infinite') {
           y = 1 / (x*x);
        } else if (behavior === 'oscillate') {
           y = Math.sin(1/x);
        }

        // Clamp
        if (y > yMax * 2) y = yMax * 2;
        if (y < yMin * 2) y = yMin * 2;

        const px = toPxX(x);
        const py = toPxY(y);

        if (i === 0) {
            d = `M ${px} ${py}`;
        } else {
            const prevX = xMin + (i-1)*dx;
            
            // Discontinuity detection
            let jump = false;
            if (behavior === 'jump' && prevX < 0 && x > 0) jump = true;
            if (behavior === 'infinite' && Math.abs(py - toPxY(y)) > height) jump = true;
            
            if (jump) d += ` M ${px} ${py}`;
            else d += ` L ${px} ${py}`;
        }
      }
      return d;
    };

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
         <defs>
             <clipPath id="behav-clip">
                 <rect x={padding} y={padding} width={width - 2*padding} height={height - 2*padding} />
             </clipPath>
             <pattern id="grid-b" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1"/>
             </pattern>
         </defs>
         <rect width="100%" height="100%" fill="url(#grid-b)" />
         
         {/* Axes */}
         <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#475569" strokeWidth="2" />
         <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#475569" strokeWidth="2" />

         <g clipPath="url(#behav-clip)">
             <path d={generatePath()} stroke={getStrokeColor(behavior)} strokeWidth="2" fill="none" />
             
             {/* Special Markers */}
             {behavior === 'jump' && (
                 <>
                   <circle cx={toPxX(0)} cy={toPxY(-1)} r="4" fill="white" stroke={getStrokeColor(behavior)} strokeWidth="2"/>
                   <circle cx={toPxX(0)} cy={toPxY(1)} r="4" fill="white" stroke={getStrokeColor(behavior)} strokeWidth="2"/>
                 </>
             )}
             {behavior === 'agree' && (
                 <circle cx={toPxX(0)} cy={toPxY(1)} r="4" fill="white" stroke={getStrokeColor(behavior)} strokeWidth="2"/>
             )}
         </g>
      </svg>
    );
  };

  const getStrokeColor = (b: BehaviorType) => {
      switch(b) {
          case 'jump': return '#ef4444'; // Red
          case 'agree': return '#10b981'; // Green
          case 'infinite': return '#f59e0b'; // Amber
          case 'oscillate': return '#8b5cf6'; // Violet
          default: return '#fff';
      }
  };

  // --- Kid Infographics ---
  const renderKidGraphic = () => {
    switch (behavior) {
      case 'jump':
        return (
          <svg viewBox="0 0 200 120" className="w-full bg-red-50 rounded-xl border border-red-100">
             {/* Left Track Low */}
             <path d="M 0 90 L 90 90" stroke="#ef4444" strokeWidth="4" strokeDasharray="6,4" />
             <text x="20" y="80" fontSize="20">🚂</text>
             {/* Right Track High */}
             <path d="M 110 30 L 200 30" stroke="#ef4444" strokeWidth="4" strokeDasharray="6,4" />
             <text x="160" y="20" fontSize="20">🚋</text>
             {/* The Break */}
             <text x="100" y="70" textAnchor="middle" fontSize="30">💔</text>
             <text x="100" y="110" textAnchor="middle" fontSize="8" fill="#991b1b">Broken Track (Jump)</text>
          </svg>
        );
      case 'agree':
        return (
          <svg viewBox="0 0 200 120" className="w-full bg-green-50 rounded-xl border border-green-100">
             {/* Tracks Meeting */}
             <path d="M 0 60 L 90 60" stroke="#10b981" strokeWidth="4" strokeDasharray="6,4" />
             <path d="M 110 60 L 200 60" stroke="#10b981" strokeWidth="4" strokeDasharray="6,4" />
             <text x="30" y="50" fontSize="20">🚂</text>
             <text x="150" y="50" fontSize="20" transform="scale(-1, 1) translate(-320, 0)">🚂</text>
             {/* Ghost Station */}
             <circle cx="100" cy="60" r="8" fill="white" stroke="#10b981" strokeWidth="2" strokeDasharray="2,2"/>
             <text x="100" y="62" textAnchor="middle" fontSize="10">👻</text>
             <text x="100" y="110" textAnchor="middle" fontSize="8" fill="#065f46">Ghost Station (Hole)</text>
          </svg>
        );
      case 'infinite':
        return (
          <svg viewBox="0 0 200 120" className="w-full bg-amber-50 rounded-xl border border-amber-100">
             {/* Vertical Track */}
             <path d="M 100 120 Q 100 60 100 10" stroke="#f59e0b" strokeWidth="4" strokeDasharray="6,4" />
             <text x="100" y="60" textAnchor="middle" fontSize="20">🚀</text>
             <text x="100" y="20" textAnchor="middle" fontSize="10">✨</text>
             <text x="100" y="110" textAnchor="middle" fontSize="8" fill="#92400e">To Space! (Infinity)</text>
          </svg>
        );
      case 'oscillate':
        return (
          <svg viewBox="0 0 200 120" className="w-full bg-violet-50 rounded-xl border border-violet-100">
             {/* Wiggle Track */}
             <path d="M 10 60 L 30 20 L 50 100 L 70 20 L 90 100 L 100 60 L 110 100 L 130 20 L 150 100 L 170 20 L 190 60" stroke="#8b5cf6" strokeWidth="2" fill="none" />
             <text x="100" y="50" textAnchor="middle" fontSize="30">🐝</text>
             <text x="100" y="110" textAnchor="middle" fontSize="8" fill="#5b21b6">Crazy Bee (Oscillation)</text>
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 animate-fade-in pb-20">
      
      {/* Left Panel: Menu & Kids */}
      <div className="xl:w-1/3 flex flex-col gap-6">
          
          <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setBehavior('agree')} className={`p-3 rounded-lg border text-left transition-all ${behavior === 'agree' ? 'bg-green-100 border-green-400 ring-2 ring-green-200' : 'bg-white border-slate-200 hover:border-green-300'}`}>
                  <div className="text-xl">👻</div>
                  <div className="font-bold text-sm text-slate-700">Equality</div>
              </button>
              <button onClick={() => setBehavior('jump')} className={`p-3 rounded-lg border text-left transition-all ${behavior === 'jump' ? 'bg-red-100 border-red-400 ring-2 ring-red-200' : 'bg-white border-slate-200 hover:border-red-300'}`}>
                  <div className="text-xl">💔</div>
                  <div className="font-bold text-sm text-slate-700">Jump</div>
              </button>
              <button onClick={() => setBehavior('infinite')} className={`p-3 rounded-lg border text-left transition-all ${behavior === 'infinite' ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-200' : 'bg-white border-slate-200 hover:border-amber-300'}`}>
                  <div className="text-xl">🚀</div>
                  <div className="font-bold text-sm text-slate-700">Infinity</div>
              </button>
              <button onClick={() => setBehavior('oscillate')} className={`p-3 rounded-lg border text-left transition-all ${behavior === 'oscillate' ? 'bg-violet-100 border-violet-400 ring-2 ring-violet-200' : 'bg-white border-slate-200 hover:border-violet-300'}`}>
                  <div className="text-xl">🐝</div>
                  <div className="font-bold text-sm text-slate-700">Oscillate</div>
              </button>
          </div>

          <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🧸</span>
                  <h3 className="font-bold text-slate-700">Logic for 5-Year-Olds</h3>
              </div>
              <div className="mb-4">
                  {renderKidGraphic()}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                  {behavior === 'jump' && "The two trains are on different floors! They can never meet because one is downstairs and one is upstairs. No meeting = No Limit!"}
                  {behavior === 'agree' && "The two trains meet perfectly! Even if the station bench is broken (the hole), they still arrive at the same spot."}
                  {behavior === 'infinite' && "The rocket goes up, up, and away! It never lands on a number. Since 'Space' isn't a train station, we say there is no limit."}
                  {behavior === 'oscillate' && "The bee is buzzing so fast back and forth that we can't tell where it is. It never settles down, so there is no limit!"}
              </p>
          </div>

      </div>

      {/* Right Panel: PhD Simulator */}
      <div className="xl:w-2/3 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
          
          <div className="px-6 py-4 bg-black/20 border-b border-white/10 flex justify-between items-center">
             <div>
                <h2 className="text-white font-bold">{getLabel()}</h2>
                <p className="text-slate-400 text-xs font-mono max-w-sm mt-1 leading-snug">{getDescription()}</p>
             </div>
             <div className="text-right">
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
                    ${behavior === 'agree' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}
                `}>
                    Limit: {behavior === 'agree' ? 'EXISTS' : 'DNE'}
                </span>
             </div>
          </div>

          <div className="relative flex-grow min-h-[400px] bg-[#0f172a]">
             {renderGraph()}
          </div>
          
          <div className="p-4 bg-slate-800 border-t border-slate-700 flex items-center gap-4">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Zoom</span>
              <input 
                 type="range" min="0.5" max="5" step="0.1"
                 value={zoom}
                 onChange={(e) => setZoom(parseFloat(e.target.value))}
                 className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
          </div>

      </div>

    </div>
  );
};
