
import React, { useState, useEffect, useRef } from 'react';

export const TheOverallLimitVisual: React.FC = () => {
  // Simulator State
  const [leftLimit, setLeftLimit] = useState(2.0);
  const [rightLimit, setRightLimit] = useState(2.0);
  const [pointValue, setPointValue] = useState<number | null>(null); // null = hole
  const [showPoint, setShowPoint] = useState(false);

  // References for direct DOM manipulation to avoid React Re-render Flicker
  const leftMathRef = useRef<HTMLDivElement>(null);
  const rightMathRef = useRef<HTMLDivElement>(null);

  // Optimized MathJax Trigger for smooth sliding without jitter
  useEffect(() => {
    const updateMath = (node: HTMLDivElement | null, sign: string, val: number) => {
        if (!node || !(window as any).MathJax) return;
        
        // FIX: Use \makebox to reserve fixed width space (approx 2.5em for "x.xx")
        // This prevents the equation centering from shifting when the digit width changes
        // e.g. "1.11" is narrower than "0.00" in some fonts, causing jitter.
        const latex = `$$ \\lim_{x \\to a^${sign}} f(x) = ${val.toFixed(2)} $$`;
        
        // Direct DOM update prevents React reconciliation flicker
        // We replace the inner HTML with the new LaTeX string
        node.innerHTML = latex;
        
        // Retypeset only this specific node
        (window as any).MathJax.typesetPromise([node]).catch(() => {});
    };

    // Use requestAnimationFrame to sync with display refresh rate
    const animationFrameId = requestAnimationFrame(() => {
        updateMath(leftMathRef.current, '-', leftLimit);
        updateMath(rightMathRef.current, '+', rightLimit);
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, [leftLimit, rightLimit]);

  // --- Math Logic ---
  const limitsMatch = Math.abs(leftLimit - rightLimit) < 0.1;

  // --- Graph Constants ---
  const width = 600;
  const height = 350;
  const padding = 50;
  const xMin = -2; 
  const xMax = 2;
  const yMin = 0; 
  const yMax = 4;

  const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  const renderGraph = () => {
    // Left Curve: Parabola ending at leftLimit
    // f(x) = a(x+2)^2 + b.  At x=-2, y=something? Let's just do a line/curve easing to L.
    // Simple cubic eased curve from (-2, 0.5) to (0, leftLimit)
    const generateLeftPath = () => {
       let d = "";
       for(let x = -2; x <= -0.05; x+=0.05) {
           // Interpolate
           const t = (x - (-2)) / 2; // 0 to 1
           // Ease in out
           const ease = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; 
           const y = 0.5 + (leftLimit - 0.5) * ease;
           
           const px = toPxX(x);
           const py = toPxY(y);
           d += (x===-2 ? `M ${px} ${py}` : ` L ${px} ${py}`);
       }
       return d;
    };

    // Right Curve: Easing from (0, rightLimit) to (2, 3.5)
    const generateRightPath = () => {
        let d = "";
        for(let x = 0.05; x <= 2; x+=0.05) {
            const t = (x - 0) / 2; // 0 to 1
            const ease = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; 
            const y = rightLimit + (3.5 - rightLimit) * ease;
            
            const px = toPxX(x);
            const py = toPxY(y);
            d += (x===0.05 ? `M ${px} ${py}` : ` L ${px} ${py}`);
        }
        return d;
    };

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
            <defs>
                <pattern id="grid-overall" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-overall)" />
            
            {/* Axes */}
            <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#475569" strokeWidth="2" />
            <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#475569" strokeWidth="2" />
            
            {/* Left Function */}
            <path d={generateLeftPath()} stroke="#ea580c" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Left Limit Arrow Head */}
            <circle cx={toPxX(0)} cy={toPxY(leftLimit)} r="6" fill="#0f172a" stroke="#ea580c" strokeWidth="2" />
            
            {/* Right Function */}
            <path d={generateRightPath()} stroke="#2563eb" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Right Limit Arrow Head */}
            <circle cx={toPxX(0)} cy={toPxY(rightLimit)} r="4" fill="#0f172a" stroke="#2563eb" strokeWidth="2" />

            {/* The Point f(a) - Optional */}
            {showPoint && (
                <circle 
                    cx={toPxX(0)} 
                    cy={toPxY(pointValue ?? 0)} 
                    r="6" 
                    fill="#10b981" 
                    stroke="white" 
                    strokeWidth="2" 
                />
            )}

            {/* Visual Connection Line if close */}
            {limitsMatch && (
                <circle cx={toPxX(0)} cy={toPxY((leftLimit+rightLimit)/2)} r="8" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" strokeDasharray="2,2" />
            )}
        </svg>
    );
  };

  // --- Kid Logic ---
  const renderKidGraphic = () => {
      // SVG Bridge
      const leftY = 100 - (leftLimit * 20); // Scale roughly to viewbox
      const rightY = 100 - (rightLimit * 20);
      
      return (
          <svg viewBox="0 0 200 150" className="w-full bg-sky-50 rounded-xl border border-sky-100">
              {/* Water */}
              <rect x="0" y="120" width="200" height="30" fill="#bae6fd" />
              <path d="M 0 120 Q 20 115 40 120 T 80 120 T 120 120 T 160 120 T 200 120" fill="none" stroke="#7dd3fc" strokeWidth="2" />

              {/* Left Cliff */}
              <path d={`M 0 150 L 0 ${leftY} L 90 ${leftY} L 90 150 Z`} fill="#fdba74" />
              <rect x="0" y={leftY} width="90" height="10" fill="#f97316" />
              <text x="20" y={leftY - 10} fontSize="20">👷</text>

              {/* Right Cliff */}
              <path d={`M 200 150 L 200 ${rightY} L 110 ${rightY} L 110 150 Z`} fill="#93c5fd" />
              <rect x="110" y={rightY} width="90" height="10" fill="#3b82f6" />
              <text x="160" y={rightY - 10} fontSize="20">👷‍♀️</text>

              {/* Gap Status */}
              {limitsMatch ? (
                  <g>
                      <rect x="90" y={leftY} width="20" height="5" fill="#22c55e" />
                      <text x="100" y="50" textAnchor="middle" fontSize="30">🤝</text>
                      <text x="100" y="80" textAnchor="middle" fontSize="10" fill="#15803d" fontWeight="bold">CONNECTED!</text>
                  </g>
              ) : (
                  <g>
                      <text x="100" y="80" textAnchor="middle" fontSize="30">💔</text>
                      <text x="100" y="110" textAnchor="middle" fontSize="10" fill="#b91c1c" fontWeight="bold">MISSING!</text>
                  </g>
              )}
          </svg>
      );
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in pb-20">
      
      {/* LEFT PANEL: Kids */}
      <div className="xl:w-1/3 flex flex-col gap-6">
        <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌉</span>
                <h3 className="font-bold text-indigo-900 text-lg">The Bridge Builders</h3>
            </div>
            
            <div className="mb-6">
                {renderKidGraphic()}
            </div>

            <div className={`p-4 rounded-xl border-l-4 ${limitsMatch ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                <h4 className={`font-bold text-sm uppercase tracking-wider mb-1 ${limitsMatch ? 'text-green-700' : 'text-red-700'}`}>
                    {limitsMatch ? "Success!" : "Failure!"}
                </h4>
                <p className="text-sm text-slate-700">
                    {limitsMatch 
                        ? "The Left Team and Right Team built at the same height. The cars can cross! The Limit Exists." 
                        : "Oh no! They built at different heights. The car will crash. No Limit!"}
                </p>
            </div>
        </div>

        {/* Definition Card */}
        <div className="bg-slate-800 text-slate-300 p-6 rounded-xl shadow-lg">
             <h3 className="text-white font-bold mb-3">The Golden Rule</h3>
             <div className="font-serif text-lg leading-relaxed text-center bg-slate-900 p-4 rounded-lg border border-slate-700">
                {/* Static MathJax content - handled by global typeset logic elsewhere if static */}
                <div dangerouslySetInnerHTML={{__html: '$$ \\lim_{x \\to a} f(x) = L $$'}} />
                <span className="text-sm text-slate-400 italic block my-2">only if</span>
                <div dangerouslySetInnerHTML={{__html: '$$ \\text{Left} = \\text{Right} = L $$'}} />
             </div>
        </div>
      </div>


      {/* RIGHT PANEL: PhD Simulator */}
      <div className="xl:w-2/3 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
          
          {/* Scientific Header */}
          <div className="px-6 py-4 bg-black/20 border-b border-white/10 flex justify-between items-center">
              <div>
                  <h2 className="text-white font-bold text-lg">Limit Synthesizer</h2>
                  <p className="text-slate-400 text-xs font-mono">Adjust L⁻ and L⁺ to find consistency</p>
              </div>
              <div className={`px-4 py-2 rounded font-bold font-mono transition-colors duration-300
                  ${limitsMatch ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}
              `}>
                  {limitsMatch ? "LIMIT EXISTS" : "LIMIT DNE"}
              </div>
          </div>

          {/* Graph Area */}
          <div className="relative flex-grow min-h-[400px] bg-[#0f172a]">
              {renderGraph()}

              {/* Math Overlay - Targeted Refs */}
              {/* Added tabular-nums and fixed min-width for better UX */}
              <div className="absolute top-6 left-6 space-y-2 pointer-events-none">
                   {/* Left Limit Box */}
                   <div className="bg-slate-900/80 backdrop-blur border border-orange-500/30 px-3 py-1.5 rounded text-orange-400 font-mono text-sm tabular-nums shadow-lg min-w-[220px] flex justify-center">
                       <div ref={leftMathRef}></div>
                   </div>
                   
                   {/* Right Limit Box */}
                   <div className="bg-slate-900/80 backdrop-blur border border-blue-500/30 px-3 py-1.5 rounded text-blue-400 font-mono text-sm tabular-nums shadow-lg min-w-[220px] flex justify-center">
                       <div ref={rightMathRef}></div>
                   </div>
              </div>
          </div>

          {/* Controls */}
          <div className="p-6 bg-slate-800 border-t border-slate-700 space-y-6">
              
              {/* Left/Right Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                      <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          <span className="text-orange-400">Left Limit (L⁻)</span>
                          <span className="tabular-nums">{leftLimit.toFixed(2)}</span>
                      </div>
                      <input 
                        type="range" min="0" max="4" step="0.1" 
                        value={leftLimit}
                        onChange={(e) => setLeftLimit(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
                      />
                  </div>
                  <div>
                      <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          <span className="text-blue-400">Right Limit (L⁺)</span>
                          <span className="tabular-nums">{rightLimit.toFixed(2)}</span>
                      </div>
                      <input 
                        type="range" min="0" max="4" step="0.1" 
                        value={rightLimit}
                        onChange={(e) => setRightLimit(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                  </div>
              </div>

              {/* Point Toggle (The Dot) */}
              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                  <div className="text-sm text-slate-300">
                      <span className="font-bold text-white">The Point f(a)</span>
                      <p className="text-xs text-slate-500">Does a dot at x=a change the limit?</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={showPoint} 
                            onChange={(e) => setShowPoint(e.target.checked)}
                            className="w-4 h-4 rounded accent-emerald-500" 
                          />
                          <span className="text-sm text-slate-300">Show Point</span>
                      </label>
                      
                      {showPoint && (
                          <input 
                            type="range" min="0" max="4" step="0.5"
                            value={pointValue ?? 0}
                            onChange={(e) => setPointValue(parseFloat(e.target.value))}
                            className="w-32 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                          />
                      )}
                  </div>
              </div>

          </div>
      </div>

    </div>
  );
};
