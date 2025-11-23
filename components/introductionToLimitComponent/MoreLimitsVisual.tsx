
import React, { useState, useEffect } from 'react';

export const MoreLimitsVisual: React.FC = () => {
  const [funcId, setFuncId] = useState<0 | 1 | 2>(0);
  const [zoom, setZoom] = useState(1);

  // --- Constants & Config ---
  const FUNCTIONS = [
    {
      id: 0,
      name: "The Sneaky Bridge",
      math: "g(x) = \\frac{x}{\\tan(2x)}",
      code: "x / Math.tan(2*x)",
      limit: 0.5,
      descKid: "This road looks like it has a hole, but if you put on magic glasses, it connects perfectly at 0.5!",
      descPhD: "Indeterminate form 0/0. Using L'Hôpital's rule or Taylor series (tan(u) ≈ u), we find the limit is 1/2."
    },
    {
      id: 1,
      name: "The Rocket Ramp",
      math: "h(x) = \\frac{|x| + \\sin(x)}{x^2}",
      code: "(Math.abs(x) + Math.sin(x)) / (x*x)",
      limit: null,
      descKid: "One side is a flat playground. The other side is a rocket ship going to space forever!",
      descPhD: "One-sided limits disagree. Left limit -> 0. Right limit -> +∞. Thus, the two-sided limit DNE."
    },
    {
      id: 2,
      name: "The Wiggle Monster",
      math: "j(x) = \\sin(13/x)",
      code: "Math.sin(13/x)",
      limit: null,
      descKid: "This spring shakes so fast near the middle that we can't tell where it is!",
      descPhD: "Essential singularity. The function oscillates infinitely many times as x -> 0. Limit DNE."
    }
  ];

  const currentFunc = FUNCTIONS[funcId];

  // --- Graphing Logic ---
  const width = 600;
  const height = 350;
  const padding = 50;

  const renderGraph = () => {
    // Dynamic range based on zoom
    const xRange = (funcId === 2 ? 0.5 : 2) / zoom;
    const xMin = -xRange;
    const xMax = xRange;
    
    // Y-Range customization
    let yMin = -2;
    let yMax = 2;
    if (funcId === 1) { yMin = -1; yMax = 10; } // Show infinity better

    const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

    // Path Generation with Singularity handling
    const generatePath = () => {
      let d = "";
      const steps = 1000; // High res for oscillations
      const dx = (xMax - xMin) / steps;

      for (let i = 0; i <= steps; i++) {
        const x = xMin + i * dx;
        
        // Avoid division by zero issues slightly
        if (Math.abs(x) < 0.000001) continue;

        let y = 0;
        if (funcId === 0) y = x / Math.tan(2 * x);
        else if (funcId === 1) y = (Math.abs(x) + Math.sin(x)) / (x * x);
        else if (funcId === 2) y = Math.sin(13 / x);

        // Clip huge values
        if (y > yMax * 10) y = yMax * 10;
        if (y < yMin * 10) y = yMin * 10;

        const px = toPxX(x);
        const py = toPxY(y);

        // Break path if jump is too big (vertical asymptote detection)
        if (i === 0) {
            d = `M ${px} ${py}`;
        } else {
            const prevX = xMin + (i - 1) * dx;
            let prevY = 0;
            if (funcId === 0) prevY = prevX / Math.tan(2 * prevX);
            else if (funcId === 1) prevY = (Math.abs(prevX) + Math.sin(prevX)) / (prevX * prevX);
            else if (funcId === 2) prevY = Math.sin(13 / prevX);

            if (prevY > yMax * 10) prevY = yMax * 10;
            if (prevY < yMin * 10) prevY = yMin * 10;

            const prevPy = toPxY(prevY);
            
            // Discontinuity check: if pixel jump is too large, move (M) instead of line (L)
            if (Math.abs(py - prevPy) > height / 2) {
                d += ` M ${px} ${py}`;
            } else {
                d += ` L ${px} ${py}`;
            }
        }
      }
      return d;
    };

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
            <defs>
                <clipPath id="graph-area">
                    <rect x={padding} y={padding} width={width - 2*padding} height={height - 2*padding} />
                </clipPath>
                <pattern id="grid-v" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-v)" />

            {/* Axes */}
            <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#475569" strokeWidth="2" />
            <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#475569" strokeWidth="2" />

            {/* Function Plot */}
            <g clipPath="url(#graph-area)">
                <path d={generatePath()} stroke="#38bdf8" strokeWidth="2" fill="none" />
                
                {/* Specific Highlights */}
                {funcId === 0 && (
                    <circle cx={toPxX(0)} cy={toPxY(0.5)} r="4" fill="#fbbf24" stroke="white" />
                )}
            </g>

            {/* Labels */}
            <text x={toPxX(0) + 10} y={padding + 10} fill="#94a3b8" className="font-mono text-xs">y-axis</text>
            <text x={width - padding - 30} y={toPxY(0) + 20} fill="#94a3b8" className="font-mono text-xs">x-axis</text>
        </svg>
    );
  };

  // --- Kid Infographic Renderers ---
  const renderKidGraphic = () => {
     if (funcId === 0) { // Bridge
         return (
             <svg viewBox="0 0 200 120" className="w-full h-auto bg-sky-50 rounded-lg border border-sky-100">
                 <path d="M 0 100 Q 50 100 100 100 T 200 100" stroke="#cbd5e1" strokeWidth="4" fill="none" />
                 {/* The Gap filled */}
                 <circle cx="100" cy="100" r="15" fill="#fcd34d" opacity="0.3" />
                 <text x="100" y="80" textAnchor="middle" fontSize="30">🌉</text>
                 <text x="100" y="115" textAnchor="middle" fontSize="6" fill="#0f172a">Safe to Cross!</text>
             </svg>
         );
     } else if (funcId === 1) { // Rocket
         return (
             <svg viewBox="0 0 200 120" className="w-full h-auto bg-slate-900 rounded-lg border border-slate-800">
                 {/* Left side flat */}
                 <line x1="0" y1="100" x2="100" y2="100" stroke="#94a3b8" strokeWidth="2" />
                 {/* Right side rocket */}
                 <path d="M 105 100 Q 150 100 180 10" stroke="#f472b6" strokeWidth="2" fill="none" strokeDasharray="4,4" />
                 <text x="50" y="90" textAnchor="middle" fontSize="20">🚶</text>
                 <text x="180" y="20" textAnchor="middle" fontSize="20">🚀</text>
                 <text x="100" y="115" textAnchor="middle" fontSize="6" fill="#94a3b8">To Infinity!</text>
             </svg>
         );
     } else { // Wiggle
         return (
             <svg viewBox="0 0 200 120" className="w-full h-auto bg-indigo-50 rounded-lg border border-indigo-100">
                 <path d="M 10 60 Q 30 20 50 60 T 90 60 T 100 10 T 110 60 T 150 60 T 190 60" stroke="#6366f1" strokeWidth="2" fill="none" />
                 <text x="100" y="50" textAnchor="middle" fontSize="30">😵‍💫</text>
                 <text x="100" y="115" textAnchor="middle" fontSize="6" fill="#4338ca">Too Dizzy!</text>
             </svg>
         );
     }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 animate-fade-in pb-20">
      
      {/* --- LEFT PANEL: Kid Logic --- */}
      <div className="xl:w-1/3 flex flex-col gap-6">
         <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-4">
                 <span className="text-2xl">🧸</span>
                 <h3 className="font-bold text-indigo-900">Calculus for Kids</h3>
             </div>
             
             <div className="mb-4">
                 {renderKidGraphic()}
             </div>

             <div className="bg-indigo-50 p-4 rounded-xl">
                 <p className="text-indigo-900 font-medium text-sm leading-relaxed">
                     {currentFunc.descKid}
                 </p>
             </div>
         </div>

         {/* Selection Menu */}
         <div className="flex flex-col gap-2">
             {FUNCTIONS.map((f) => (
                 <button 
                    key={f.id}
                    onClick={() => { setFuncId(f.id as any); setZoom(1); }}
                    className={`p-4 rounded-xl text-left border transition-all ${
                        funcId === f.id 
                        ? 'bg-slate-800 text-white border-slate-900 shadow-lg scale-105' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                 >
                     <div className="font-bold text-sm">{f.name}</div>
                     <div className="font-mono text-[10px] opacity-70">$$ {f.math} $$</div>
                 </button>
             ))}
         </div>
      </div>

      {/* --- RIGHT PANEL: PhD Simulator --- */}
      <div className="xl:w-2/3 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
          
          <div className="px-6 py-4 bg-black/20 border-b border-white/10 flex justify-between items-center">
              <div>
                  <h2 className="text-white font-bold text-lg">Function Analysis</h2>
                  <p className="text-slate-400 text-xs font-mono">Exploring limit behavior near x=0</p>
              </div>
              <div className="text-right">
                  <div className="text-emerald-400 font-mono font-bold">
                      {funcId === 0 ? "Lim = 0.5" : "Lim = DNE"}
                  </div>
              </div>
          </div>

          <div className="relative flex-grow min-h-[400px] bg-[#0f172a]">
              {renderGraph()}
              
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur p-3 rounded-lg border border-white/10 w-48">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">PhD Notes</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                      {currentFunc.descPhD}
                  </p>
              </div>
          </div>

          <div className="p-4 bg-slate-800 border-t border-slate-700 flex items-center gap-4">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Zoom Level</span>
              <input 
                 type="range" min="0.5" max="5" step="0.1"
                 value={zoom}
                 onChange={(e) => setZoom(parseFloat(e.target.value))}
                 className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <span className="text-white font-mono text-xs w-12 text-right">{zoom.toFixed(1)}x</span>
          </div>

      </div>

    </div>
  );
};
