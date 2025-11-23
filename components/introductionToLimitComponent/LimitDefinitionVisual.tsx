
import React, { useState, useEffect } from 'react';

export const LimitDefinitionVisual: React.FC = () => {
  // Simulator State
  const [epsilon, setEpsilon] = useState(1.0);
  const [isHovering, setIsHovering] = useState(false);

  // --- MATH CONFIG ---
  // Function: f(x) = 0.5 * (x-2)^3 + 3
  // Limit at x=2 is L=3.
  const a = 2;
  const L = 3;
  
  const func = (x: number) => 0.5 * Math.pow(x - 2, 3) + 3;
  
  // Inverse to calculate max delta for a given epsilon
  // y = 0.5(x-2)^3 + 3  =>  (y-3)*2 = (x-2)^3  => x = cbrt(2(y-3)) + 2
  const funcInverse = (y: number) => Math.cbrt(2 * (y - 3)) + 2;

  // Calculate Delta based on Epsilon
  // We need to ensure f(x) stays within [L-eps, L+eps]
  // x_low = funcInverse(L - eps)
  // x_high = funcInverse(L + eps)
  // delta = min(|x_low - a|, |x_high - a|)
  const xLow = funcInverse(L - epsilon);
  const xHigh = funcInverse(L + epsilon);
  const delta = Math.min(Math.abs(xLow - a), Math.abs(xHigh - a));

  // --- GRAPH RENDERING ---
  const width = 600;
  const height = 400;
  const padding = 60;
  const xMin = 0;
  const xMax = 4;
  const yMin = 0;
  const yMax = 6;

  const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  const renderCurve = () => {
    let d = "";
    for(let x = xMin; x <= xMax; x += 0.05) {
      const y = func(x);
      const px = toPxX(x);
      const py = toPxY(y);
      d += (x === xMin ? `M ${px} ${py}` : ` L ${px} ${py}`);
    }
    return d;
  };

  // Trigger MathJax typeset on render
  useEffect(() => {
    if ((window as any).MathJax && (window as any).MathJax.typesetPromise) {
        (window as any).MathJax.typesetPromise().catch(() => {});
    }
  }, [epsilon]);

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in pb-20">
      
      {/* --- LEFT PANEL: 5-Year-Old Explanation --- */}
      <div className="xl:w-1/3 flex flex-col gap-6">
        
        {/* Story Card */}
        <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🏹</span>
                <div>
                    <h3 className="font-bold text-indigo-900 text-lg">The Archery Challenge</h3>
                    <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider">The "Game" of Limits</p>
                </div>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                    Imagine you are a world-class archer (The Function).
                    A grumpy judge comes to you with a challenge.
                </p>
                
                <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
                    <span className="font-bold text-rose-800 block mb-1">👺 The Judge (Epsilon ε)</span>
                    <p>"I bet you can't hit the target! I'm going to make the bullseye <span className="font-bold">tiny</span>."</p>
                </div>

                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                    <span className="font-bold text-emerald-800 block mb-1">😎 You (Delta δ)</span>
                    <p>"Ha! No matter how small you make the bullseye, I can just stand <span className="font-bold">closer</span> (Delta) and I will never miss!"</p>
                </div>
                
                <p className="font-medium text-slate-800">
                    If you can ALWAYS find a place to stand to hit the bullseye, the Limit Exists!
                </p>
            </div>
        </div>

        {/* Visual Legend */}
        <div className="bg-slate-800 text-slate-300 p-6 rounded-xl shadow-lg border border-slate-700">
             <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                 <span>🔍</span> Decoder Ring
             </h4>
             <ul className="space-y-4 text-sm">
                 <li className="flex items-start gap-3">
                     <div className="bg-rose-500/20 text-rose-400 font-mono font-bold px-2 py-0.5 rounded border border-rose-500/50">ε (Epsilon)</div>
                     <div>
                         <span className="block font-bold text-white">The Error Margin</span>
                         <span className="text-xs opacity-70">How far away from L you are allowed to be (y-axis).</span>
                     </div>
                 </li>
                 <li className="flex items-start gap-3">
                     <div className="bg-emerald-500/20 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/50">δ (Delta)</div>
                     <div>
                         <span className="block font-bold text-white">The Tolerance</span>
                         <span className="text-xs opacity-70">How close to 'a' you need to be (x-axis) to stay safe.</span>
                     </div>
                 </li>
             </ul>
        </div>
      </div>

      {/* --- RIGHT PANEL: PhD Simulator --- */}
      <div className="xl:w-2/3 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
          
          {/* Scientific Header */}
          <div className="px-6 py-4 bg-black/20 border-b border-white/10 flex justify-between items-center">
              <div>
                  <h2 className="text-white font-bold text-lg font-serif">Formal Definition (ε-δ)</h2>
                  <p className="text-slate-400 text-xs font-mono">Visualize the logical implication</p>
              </div>
              <div className="text-right font-mono text-xs">
                  <div className="text-rose-400">ε (Input) = {epsilon.toFixed(3)}</div>
                  <div className="text-emerald-400">δ (Output) = {delta.toFixed(3)}</div>
              </div>
          </div>

          {/* Graph Area */}
          <div className="relative flex-grow min-h-[450px] bg-[#0f172a]" onMouseEnter={()=>setIsHovering(true)} onMouseLeave={()=>setIsHovering(false)}>
              <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
                  <defs>
                      <pattern id="grid-formal" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1"/>
                      </pattern>
                      {/* Clip path for the safe zone intersection */}
                      <clipPath id="safe-zone">
                          <rect x={toPxX(a - delta)} y={0} width={toPxX(a+delta) - toPxX(a-delta)} height={height} />
                      </clipPath>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-formal)" />

                  {/* Epsilon Tube (Target Zone) */}
                  <rect 
                    x={padding} 
                    y={toPxY(L + epsilon)} 
                    width={width - 2*padding} 
                    height={toPxY(L - epsilon) - toPxY(L + epsilon)} 
                    fill="#f43f5e" 
                    fillOpacity="0.1" 
                    stroke="#f43f5e" 
                    strokeWidth="1" 
                    strokeDasharray="4,4"
                  />
                  <text x={width-padding+5} y={toPxY(L + epsilon)} fill="#f43f5e" className="text-xs font-mono">L+ε</text>
                  <text x={width-padding+5} y={toPxY(L - epsilon)} fill="#f43f5e" className="text-xs font-mono">L-ε</text>

                  {/* Delta Tube (Safe Input Zone) */}
                  <rect 
                    x={toPxX(a - delta)} 
                    y={padding} 
                    width={toPxX(a + delta) - toPxX(a - delta)} 
                    height={height - 2*padding} 
                    fill="#10b981" 
                    fillOpacity="0.1" 
                    stroke="#10b981" 
                    strokeWidth="1" 
                    strokeDasharray="4,4"
                  />
                  
                  {/* Intersection Highlight (Safe Box) */}
                  <rect 
                     x={toPxX(a - delta)}
                     y={toPxY(L + epsilon)}
                     width={toPxX(a + delta) - toPxX(a - delta)} 
                     height={toPxY(L - epsilon) - toPxY(L + epsilon)} 
                     fill="#10b981"
                     fillOpacity="0.2"
                     stroke="none"
                  />

                  {/* Axes */}
                  <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#475569" strokeWidth="2" />
                  <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#475569" strokeWidth="2" />

                  {/* Function Curve */}
                  <path d={renderCurve()} stroke="#cbd5e1" strokeWidth="2" fill="none" />
                  {/* Curve inside Safe Zone (Highlighted) */}
                  <g clipPath="url(#safe-zone)">
                     <path d={renderCurve()} stroke="#10b981" strokeWidth="4" fill="none" />
                  </g>

                  {/* Center Point */}
                  <circle cx={toPxX(a)} cy={toPxY(L)} r="4" fill="white" />
                  <text x={toPxX(a)} y={toPxY(L) - 10} textAnchor="middle" fill="white" className="font-bold font-serif italic">L</text>
                  
                  {/* Delta Arrows */}
                  <line x1={toPxX(a)} y1={toPxY(0) + 10} x2={toPxX(a+delta)} y2={toPxY(0) + 10} stroke="#10b981" markerEnd="url(#arrow-green)" />
                  <text x={toPxX(a + delta/2)} y={toPxY(0) + 25} fill="#10b981" textAnchor="middle" className="text-xs font-mono">δ</text>

                  <defs>
                    <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                    </marker>
                  </defs>

              </svg>

              {/* Math Overlay */}
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-white/10 shadow-2xl max-w-sm">
                   <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">The Definition</div>
                   <div className="text-white text-sm leading-relaxed font-serif">
                       <div dangerouslySetInnerHTML={{__html: `$$ \\forall \\epsilon > 0, \\exists \\delta > 0 \\text{ s.t. } $$`}} />
                       <div dangerouslySetInnerHTML={{__html: `$$ 0 < |x - a| < \\delta \\implies |f(x) - L| < \\epsilon $$`}} />
                   </div>
              </div>
          </div>

          {/* Controls */}
          <div className="p-6 bg-slate-800 border-t border-slate-700">
              <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-rose-400">Judge's Challenge (Shrink Epsilon)</span>
                      <span className="text-white">{epsilon.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="2.0" step="0.05"
                    value={epsilon}
                    onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                    className="w-full h-3 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                      <span>Harder Challenge (0.1)</span>
                      <span>Easier Challenge (2.0)</span>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
