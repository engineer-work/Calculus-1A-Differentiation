

import React, { useState, useEffect } from 'react';

export const LimitDefinitions: React.FC = () => {
  const [t, setT] = useState(0.5); // Slider value 0 to 1
  const [isHovering, setIsHovering] = useState(false);

  // --- MATH CONSTANTS ---
  // We map t (0..1) to x (-2..2). a is at 0.
  // x range: -2 to 2.
  // a = 0.
  const a = 0;
  
  // Map slider 0..1 to x -2..+2
  // We add a tiny gap around 0.5 to prevent exact x=0
  const getX = (val: number) => {
    let rawX = (val * 4) - 2;
    if (Math.abs(rawX) < 0.05) rawX = rawX < 0 ? -0.05 : 0.05;
    return rawX;
  };

  const currentX = getX(t);
  const isLeft = currentX < 0;

  // Functions matching the visual style of the image
  // Left (Orange): Approaches L=3. Downward slope then curl up.
  // Let's model: y = 0.2(x+2)^2 + 1. But we need it to end at 3 at x=0.
  // Try cubic: y = (x+2) * 0.5 + 2 ... needs to be curvier.
  // Let's use: f(x) = x^3 + x^2 + 3 (for x < 0) -> at 0 it is 3.
  const fLeft = (x: number) => Math.pow(x + 1.5, 2) * 0.4 + 2.1; 
  // Actually let's manually tune to match image: High start, dip, then up to L.
  // Image: Starts high, dips, goes up to L.
  const funcL = (x: number) => 0.5 * Math.pow(x + 1, 3) + 3.5; 

  // Right (Blue): Approaches R=1.5. Starts low, goes up, then down.
  // Image: Starts at R, goes up, then down.
  const funcR = (x: number) => -0.8 * Math.pow(x - 1, 2) + 2.3;

  const L = 3.5;
  const R = 1.5;

  const currentY = isLeft ? funcL(currentX) : funcR(currentX);

  // --- SVG RENDERING HELPERS ---
  const width = 500;
  const height = 300;
  const padding = 60;
  const xMin = -2.5; 
  const xMax = 2.5;
  const yMin = 0; 
  const yMax = 5;

  const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  const generatePath = (fn: (x:number)=>number, start: number, end: number) => {
    let d = `M ${toPxX(start)} ${toPxY(fn(start))}`;
    for (let i = start; i <= end; i += 0.05) {
      d += ` L ${toPxX(i)} ${toPxY(fn(i))}`;
    }
    return d;
  };

  // Trigger MathJax update
  useEffect(() => {
    if ((window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [isLeft]);

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in pb-20">
      
      {/* --- LEFT PANEL: 5-Year-Old Explanation --- */}
      <div className="xl:w-1/3 flex flex-col gap-6">
        
        <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-xl shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🚂</span>
            <h3 className="text-xl font-bold text-orange-900 font-serif">The Orange Train</h3>
          </div>
          <p className="text-orange-900 leading-relaxed mb-4">
            Imagine a train coming from the <strong>Left</strong>. It drives on the orange track. 
            It is trying to reach the station in the middle.
          </p>
          <div className="bg-white p-4 rounded-lg border border-orange-200 shadow-inner">
            <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Math Note</p>
            <p className="text-orange-700 font-medium">
              We say the train approaches the height <span className="font-bold text-xl">L</span>.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🚙</span>
            <h3 className="text-xl font-bold text-blue-900 font-serif">The Blue Car</h3>
          </div>
          <p className="text-blue-900 leading-relaxed mb-4">
            Now imagine a car coming from the <strong>Right</strong> side. It drives on the blue road.
            It starts at the station and drives away.
          </p>
          <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-inner">
            <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Math Note</p>
            <p className="text-blue-700 font-medium">
              We say the car starts at height <span className="font-bold text-xl">R</span>.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
           <h3 className="text-lg font-bold text-slate-800 mb-2">The Big Gap!</h3>
           <p className="text-slate-600 text-sm">
             Look at the middle! The Orange Train station is high up (<span className="text-orange-600 font-bold">L</span>). 
             The Blue Car station is low down (<span className="text-blue-600 font-bold">R</span>).
             Because they don't meet, we say the track is <strong>broken</strong> (or discontinuous).
           </p>
        </div>

      </div>

      {/* --- RIGHT PANEL: PhD Level Simulator --- */}
      <div className="xl:w-2/3">
        <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
          
          {/* Scientific Header */}
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <div>
               <h2 className="text-lg font-serif font-bold text-slate-800">Limit Definition Analysis</h2>
               <p className="text-xs font-mono text-slate-500">f(x) discontinuity at x = a</p>
            </div>
            <div className="text-right">
               <div className={`text-2xl font-serif font-bold ${isLeft ? 'text-orange-600' : 'text-blue-600'}`}>
                 {isLeft ? 'Left-Hand Limit' : 'Right-Hand Limit'}
               </div>
               <div className="text-xs text-slate-400 font-mono">Current Mode</div>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="relative h-[400px] bg-white cursor-ew-resize" onMouseEnter={()=>setIsHovering(true)} onMouseLeave={()=>setIsHovering(false)}>
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="absolute inset-0">
               {/* Grid */}
               <defs>
                  <pattern id="grid-def" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
                  </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#grid-def)" />
               
               {/* Axes */}
               <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#334155" strokeWidth="2" />
               <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#334155" strokeWidth="2" />
               <text x={toPxX(xMax)} y={toPxY(0) + 20} className="font-serif text-lg italic fill-slate-700">{'x'}</text>
               <text x={toPxX(0) - 20} y={padding} className="font-serif text-lg italic fill-slate-700">{'f(x)'}</text>
               <text x={toPxX(0)} y={toPxY(0) + 25} textAnchor="middle" className="font-serif text-xl font-bold fill-slate-800">a</text>

               {/* --- ORANGE CURVE (LEFT) --- */}
               <path d={generatePath(funcL, -2.2, -0.05)} stroke="#ea580c" strokeWidth="4" fill="none" strokeLinecap="round" />
               {/* L point (Open Circle) */}
               <circle cx={toPxX(0)} cy={toPxY(L)} r="6" fill="white" stroke="#ea580c" strokeWidth="3" />
               <text x={toPxX(0) + 15} y={toPxY(L)} className="font-serif text-3xl font-bold fill-orange-600">L</text>

               {/* --- BLUE CURVE (RIGHT) --- */}
               <path d={generatePath(funcR, 0.05, 2.2)} stroke="#2563eb" strokeWidth="4" fill="none" strokeLinecap="round" />
               {/* R point (Open Circle) */}
               <circle cx={toPxX(0)} cy={toPxY(R)} r="6" fill="white" stroke="#2563eb" strokeWidth="3" />
               <text x={toPxX(0) - 30} y={toPxY(R)} className="font-serif text-3xl font-bold fill-blue-600">R</text>

               {/* --- DYNAMIC ELEMENTS --- */}
               
               {/* The "Point" Moving */}
               <circle cx={toPxX(currentX)} cy={toPxY(currentY)} r="8" fill={isLeft ? '#ea580c' : '#2563eb'} stroke="white" strokeWidth="2" />
               
               {/* Dashed Projectors */}
               <line x1={toPxX(currentX)} y1={toPxY(currentY)} x2={toPxX(currentX)} y2={toPxY(0)} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6,4" />
               
               {/* Arrow indicating approach */}
               {isLeft ? (
                 <path d={`M ${toPxX(currentX)} ${toPxY(currentY) - 20} L ${toPxX(-0.2)} ${toPxY(L) - 20}`} stroke="#ea580c" strokeWidth="2" markerEnd="url(#arrow-orange)" strokeDasharray="2,2"/>
               ) : (
                 <path d={`M ${toPxX(currentX)} ${toPxY(currentY) - 20} L ${toPxX(0.2)} ${toPxY(R) - 20}`} stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow-blue)" strokeDasharray="2,2"/>
               )}

               <defs>
                 <marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                   <path d="M0,0 L0,6 L9,3 z" fill="#ea580c" />
                 </marker>
                 <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                   <path d="M0,0 L0,6 L9,3 z" fill="#2563eb" />
                 </marker>
               </defs>

            </svg>
            
            {/* Magnifier / Callout */}
            <div className={`absolute top-10 left-10 bg-white/90 backdrop-blur p-4 rounded-lg shadow-xl border ${isLeft ? 'border-orange-200' : 'border-blue-200'} transition-colors duration-500`}>
               <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Formal Definition</div>
               <div className="text-lg font-serif text-slate-800">
                  {isLeft ? (
                     <span>$$ \lim_{'{'}x \to a^-{'}'} f(x) = L $$</span>
                  ) : (
                     <span>$$ \lim_{'{'}x \to a^+{'}'} f(x) = R $$</span>
                  )}
               </div>
               <div className="mt-2 text-xs font-mono text-slate-500">
                  Current {'x'}: <span className="text-black font-bold">{currentX > 0 ? '+' : ''}{currentX.toFixed(2)}</span>
               </div>
            </div>

          </div>

          {/* Interactive Footer */}
          <div className="bg-slate-100 p-6 border-t border-slate-200">
             <div className="flex items-center gap-6">
                <span className="font-bold text-slate-400 text-xs uppercase tracking-widest">Approach Control</span>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.001" 
                  value={t} 
                  onChange={(e) => setT(parseFloat(e.target.value))}
                  className="flex-1 h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-slate-800 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
                />
             </div>
             <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
                <span>Left Side ({'x'} &lt; a)</span>
                <span>Right Side ({'x'} &gt; a)</span>
             </div>
          </div>

        </div>

        {/* Bottom Text Explanation matching the textbook image text */}
        <div className="mt-8 space-y-8 max-w-3xl mx-auto">
           <div className="flex gap-4">
              <div className="w-1 bg-orange-500 rounded-full"></div>
              <div>
                 <p className="text-slate-800 mb-2 font-serif text-lg">
                    Suppose <span className="italic font-bold">f(x)</span> gets really close to <span className="text-orange-600 font-bold">L</span> for values of <span className="italic">x</span> that get really close to (but are not equal to) <span className="italic">a</span> from the left.
                 </p>
                 <p className="text-slate-600">
                    We write: <span className="bg-slate-100 px-2 py-1 rounded font-mono text-sm mx-1">$$ \lim_{'{'}x \to a^-{'}'} f(x) = L $$</span>
                 </p>
              </div>
           </div>

           <div className="flex gap-4">
              <div className="w-1 bg-blue-600 rounded-full"></div>
              <div>
                 <p className="text-slate-800 mb-2 font-serif text-lg">
                    Suppose <span className="italic font-bold">f(x)</span> gets really close to <span className="text-blue-600 font-bold">R</span> for values of <span className="italic">x</span> that get really close to (but are not equal to) <span className="italic">a</span> from the right.
                 </p>
                 <p className="text-slate-600">
                    We write: <span className="bg-slate-100 px-2 py-1 rounded font-mono text-sm mx-1">$$ \lim_{'{'}x \to a^+{'}'} f(x) = R $$</span>
                 </p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
