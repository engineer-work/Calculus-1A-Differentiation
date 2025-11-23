
import React, { useState } from 'react';

export const MotivationSimulators: React.FC = () => {
  // --- Derivative State ---
  const [h, setH] = useState(0.882); // Start with the value from screenshot approx
  
  // --- Integral State ---
  const [n, setN] = useState(4); // Number of rectangles

  // --- Common Math Helpers ---
  // Function for Derivative: f(x) = 0.1x^3 - 0.2x^2 - 0.5x + 2
  const f_deriv = (x: number) => 0.1 * Math.pow(x, 3) - 0.2 * Math.pow(x, 2) - 0.5 * x + 2.5;
  
  // Function for Integral: f(x) = sin(x) + 2 (Simple positive area)
  const f_int = (x: number) => Math.sin(x * 0.8) + 1.5;

  // --- SVG Mapping Constants ---
  const width = 600;
  const height = 350;
  const padding = 40;

  // --- Derivative Render Logic ---
  const renderDerivativeGraph = () => {
    const xMin = -2, xMax = 5;
    const yMin = -1, yMax = 6;
    
    const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

    // Fixed point A at x = 1
    const a = 1;
    const fa = f_deriv(a);
    
    // Moving point B at x = 1 + h
    const b = a + h;
    const fb = f_deriv(b);

    // Tangent Slope (exact derivative at x=1: 0.3(1)^2 - 0.4(1) - 0.5 = -0.6)
    const m_tan = 0.3 * a * a - 0.4 * a - 0.5;
    
    // Secant Slope
    const m_sec = (fb - fa) / (b - a);

    // Generate Curve Path
    let pathD = `M ${toPxX(xMin)} ${toPxY(f_deriv(xMin))}`;
    for (let x = xMin; x <= xMax; x += 0.1) {
      pathD += ` L ${toPxX(x)} ${toPxY(f_deriv(x))}`;
    }

    // Tangent Line (extended to full graph width)
    const tanLine = {
      x1: toPxX(xMin),
      y1: toPxY(fa + m_tan * (xMin - a)),
      x2: toPxX(xMax),
      y2: toPxY(fa + m_tan * (xMax - a)),
    };

    // Secant Line (extended to full graph width)
    // Use the slope intercept form passing through A(a, fa)
    // y - fa = m_sec(x - a) => y = fa + m_sec(x - a)
    const secLine = {
        x1: toPxX(xMin),
        y1: toPxY(fa + m_sec * (xMin - a)),
        x2: toPxX(xMax),
        y2: toPxY(fa + m_sec * (xMax - a)),
    };

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="font-serif text-xs overflow-hidden">
        {/* Grid Background */}
        <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
            </pattern>
            <clipPath id="graphClip">
                <rect x="0" y="0" width={width} height={height} />
            </clipPath>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Axes */}
        <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        
        {/* Function Curve */}
        <g clipPath="url(#graphClip)">
            <path d={pathD} fill="none" stroke="#0f172a" strokeWidth="2" />
            
            {/* Tangent Line (Target) */}
            <line {...tanLine} stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,5" />
            
            {/* Secant Line (Dynamic) */}
            <line {...secLine} stroke="#dc2626" strokeWidth="1.5" />
        </g>

        <text x={toPxX(xMax) - 20} y={toPxY(f_deriv(xMax)) - 10} className="text-sm font-serif italic fill-slate-700">f(x)</text>
        <text x={tanLine.x2 - 60} y={tanLine.y2 - 10} className="fill-slate-400 text-[10px]">Tangent (T)</text>
        <text x={secLine.x2 - 60} y={secLine.y2 - 20} className="fill-red-600 text-[10px] font-bold">Secant (S)</text>

        {/* Projection Lines for h */}
        <line x1={toPxX(a)} y1={toPxY(fa)} x2={toPxX(a)} y2={toPxY(0)} stroke="#cbd5e1" strokeDasharray="2,2" />
        <line x1={toPxX(b)} y1={toPxY(fb)} x2={toPxX(b)} y2={toPxY(0)} stroke="#cbd5e1" strokeDasharray="2,2" />
        
        {/* Labels for Points */}
        <circle cx={toPxX(a)} cy={toPxY(fa)} r="3.5" fill="#2563eb" stroke="white" strokeWidth="1" />
        <text x={toPxX(a)} y={toPxY(fa) - 12} textAnchor="middle" className="font-bold fill-blue-600">A</text>
        
        <circle cx={toPxX(b)} cy={toPxY(fb)} r="3.5" fill="#dc2626" stroke="white" strokeWidth="1" />
        <text x={toPxX(b)} y={toPxY(fb) - 12} textAnchor="middle" className="font-bold fill-red-600">B</text>

        {/* Mathematical Notation on Graph */}
        <text x={toPxX(a)} y={toPxY(0) + 15} textAnchor="middle" className="font-serif italic">x</text>
        <text x={toPxX(b)} y={toPxY(0) + 15} textAnchor="middle" className="font-serif italic">x + h</text>
        
        {/* H indicator */}
        <path d={`M ${toPxX(a)} ${toPxY(0) + 25} L ${toPxX(b)} ${toPxY(0) + 25}`} stroke="#64748b" strokeWidth="1" />
        <line x1={toPxX(a)} y1={toPxY(0) + 22} x2={toPxX(a)} y2={toPxY(0) + 28} stroke="#64748b" strokeWidth="1" />
        <line x1={toPxX(b)} y1={toPxY(0) + 22} x2={toPxX(b)} y2={toPxY(0) + 28} stroke="#64748b" strokeWidth="1" />
        <text x={(toPxX(a) + toPxX(b))/2} y={toPxY(0) + 38} textAnchor="middle" className="font-serif italic text-[10px]">h</text>
      </svg>
    );
  };

  // --- Integral Render Logic ---
  const renderIntegralGraph = () => {
    const xMin = 0, xMax = 6;
    const yMin = -0.5, yMax = 3;
    
    const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

    // Interval [a, b]
    const start = 0.5;
    const end = 5.5;
    const dx = (end - start) / n;

    // Generate Rectangles
    const rects = [];
    for (let i = 0; i < n; i++) {
      const rx = start + i * dx;
      const ry = f_int(rx); // Left Riemann Sum
      rects.push({
        x: toPxX(rx),
        y: toPxY(ry),
        w: toPxX(rx + dx) - toPxX(rx),
        h: toPxY(0) - toPxY(ry)
      });
    }

    // Curve Path
    let pathD = `M ${toPxX(xMin)} ${toPxY(f_int(xMin))}`;
    for (let x = xMin; x <= xMax; x += 0.1) {
      pathD += ` L ${toPxX(x)} ${toPxY(f_int(x))}`;
    }

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="font-serif text-xs overflow-hidden">
        <defs>
            <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
            </pattern>
            <clipPath id="graphClip2">
                <rect x="0" y="0" width={width} height={height} />
            </clipPath>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid2)" />

        {/* Axes */}
        <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#334155" strokeWidth="1.5" />
        <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#334155" strokeWidth="1.5" />

        {/* Riemann Rectangles */}
        <g clipPath="url(#graphClip2)">
            {rects.map((r, i) => (
            <g key={i}>
                <rect 
                    x={r.x} 
                    y={r.y} 
                    width={r.w - 1} 
                    height={r.h} 
                    fill="#fdba74" 
                    fillOpacity="0.4" 
                    stroke="#c2410c" 
                    strokeWidth="0.5" 
                />
                {/* Center dot for function evaluation */}
                <circle cx={r.x} cy={r.y} r="1.5" fill="#c2410c" />
            </g>
            ))}
            
            {/* Function Curve */}
            <path d={pathD} fill="none" stroke="#0f172a" strokeWidth="2" />
        </g>
        
        <text x={toPxX(xMax) - 30} y={toPxY(f_int(xMax))} className="text-sm font-serif italic fill-slate-700">g(x)</text>

        {/* Notation */}
        <text x={toPxX(start)} y={toPxY(0) + 15} textAnchor="middle" className="font-serif italic">a</text>
        <text x={toPxX(end)} y={toPxY(0) + 15} textAnchor="middle" className="font-serif italic">b</text>
        
        {/* Delta X indicator on first rect */}
        {rects.length > 0 && (
            <>
            <line x1={rects[0].x} y1={toPxY(0)+10} x2={rects[0].x + rects[0].w} y2={toPxY(0)+10} stroke="#ea580c" strokeWidth="1"/>
            <text x={rects[0].x + rects[0].w/2} y={toPxY(0)+22} textAnchor="middle" className="font-serif text-[9px] fill-orange-700">Δx</text>
            </>
        )}
      </svg>
    );
  };

  // Inverted slider logic helpers
  const maxH = 2.5;
  const minH = 0.001;
  const toSlider = (val: number) => ((maxH - val) / (maxH - minH)) * 100;
  const fromSlider = (val: number) => maxH - (val / 100) * (maxH - minH);

  return (
    <div className="space-y-16 my-10">
      
      {/* --- Section 1: Derivative --- */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header / Simple Text */}
        <div className="bg-slate-50 p-6 border-b border-slate-200">
          <h3 className="text-2xl font-bold text-slate-800 mb-2 font-serif">1. The Derivative</h3>
          <p className="text-slate-600 max-w-2xl">
            Imagine point <span className="font-bold text-red-600">B</span> sliding down the slide towards point <span className="font-bold text-blue-600">A</span>. 
            As they get super close, the red line becomes the perfect steepness at point A. That's the derivative!
          </p>
        </div>

        {/* Scientific Visualization */}
        <div className="relative bg-slate-50 p-4 flex flex-col lg:flex-row">
          <div className="flex-grow h-[350px] bg-white rounded border border-slate-300 shadow-inner">
            {renderDerivativeGraph()}
          </div>

          {/* Math Context Panel */}
          <div className="lg:w-64 p-4 lg:border-l border-slate-200 flex flex-col justify-center bg-slate-50/50">
            <div className="font-mono text-xs text-slate-500 mb-1 uppercase tracking-wider">Definition</div>
            <div className="text-sm font-serif bg-white p-3 rounded border border-slate-200 shadow-sm mb-6">
              <div className="mb-1 text-center">Slope of Secant:</div>
              <div className="text-center italic text-slate-800">
                 m = <span className="inline-block border-b border-black mx-1 text-center px-1 leading-3">f(x+h) - f(x)</span><br/>
                 <span className="inline-block">h</span>
              </div>
            </div>
            
            <div className="font-mono text-xs text-slate-500 mb-1 uppercase tracking-wider">Current Value</div>
            <div className="text-xl font-serif font-bold text-slate-800 mb-1">
              h = {h.toFixed(3)}
            </div>
            <div className={`text-sm font-medium ${h < 0.1 ? 'text-green-600' : 'text-slate-500'}`}>
              {h < 0.1 ? "Approaching limit!" : "Approximating..."}
            </div>
          </div>
        </div>

        {/* Controls (Kid Friendly) */}
        <div className="p-6 bg-slate-100 border-t border-slate-200 flex items-center gap-4">
           <div className="font-bold text-slate-400 text-xs uppercase tracking-widest">Control</div>
           <span className="text-sm font-medium text-slate-600">Far</span>
           <input 
              type="range" 
              min="0" 
              max="100" 
              step="0.1"
              value={toSlider(h)}
              onChange={(e) => setH(fromSlider(parseFloat(e.target.value)))}
              className="flex-1 h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
           />
           <span className="text-sm font-medium text-slate-600">Close</span>
        </div>
      </div>


      {/* --- Section 2: Integral --- */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header / Simple Text */}
        <div className="bg-slate-50 p-6 border-b border-slate-200">
          <h3 className="text-2xl font-bold text-slate-800 mb-2 font-serif">2. The Integral</h3>
          <p className="text-slate-600 max-w-2xl">
            Measuring curvy shapes is hard. But measuring rectangles is easy! 
            If we use tiny skinny rectangles, we can fill the shape perfectly.
          </p>
        </div>

        {/* Scientific Visualization */}
        <div className="relative bg-slate-50 p-4 flex flex-col lg:flex-row">
          <div className="flex-grow h-[350px] bg-white rounded border border-slate-300 shadow-inner">
            {renderIntegralGraph()}
          </div>

          {/* Math Context Panel */}
          <div className="lg:w-64 p-4 lg:border-l border-slate-200 flex flex-col justify-center bg-slate-50/50">
            <div className="font-mono text-xs text-slate-500 mb-1 uppercase tracking-wider">Riemann Sum</div>
            <div className="text-sm font-serif bg-white p-3 rounded border border-slate-200 shadow-sm mb-6">
              <div className="text-center italic text-slate-800">
                 Area ≈ <span className="text-lg">∑</span> f(x<sub>i</sub>) · Δx
              </div>
            </div>

             <div className="font-mono text-xs text-slate-500 mb-1 uppercase tracking-wider">Parameters</div>
             <div className="flex justify-between items-end mb-2 border-b border-slate-200 pb-2">
                <span className="text-sm text-slate-600 font-serif italic">n (rectangles)</span>
                <span className="font-bold text-slate-800">{n}</span>
             </div>
             <div className="flex justify-between items-end">
                <span className="text-sm text-slate-600 font-serif italic">Δx (width)</span>
                <span className="font-bold text-slate-800">{(5/n).toFixed(2)}</span>
             </div>
          </div>
        </div>

        {/* Controls (Kid Friendly) */}
        <div className="p-6 bg-slate-100 border-t border-slate-200 flex items-center gap-4">
           <div className="font-bold text-slate-400 text-xs uppercase tracking-widest">Control</div>
           <span className="text-sm font-medium text-slate-600">Chunky Blocks</span>
           <input 
              type="range" 
              min="2" 
              max="60" 
              step="1"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
              className="flex-1 h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-orange-600"
           />
           <span className="text-sm font-medium text-slate-600">Skinny Slices</span>
        </div>
      </div>

    </div>
  );
};
