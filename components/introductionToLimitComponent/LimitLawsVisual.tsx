
import React, { useState, useEffect } from 'react';

type Operation = 'add' | 'sub' | 'mul' | 'div';

export const LimitLawsVisual: React.FC = () => {
  const [op, setOp] = useState<Operation>('add');
  const [xVal, setXVal] = useState(0.5); // x approaching 1

  // Constants
  const a = 1;
  const L = 2; // Limit of f
  const M = 3; // Limit of g
  
  // Functions
  // f(x) = x + 1 => Lim(x->1) = 2
  const f = (x: number) => x + 1;
  
  // g(x) = x^2 + 2 => Lim(x->1) = 3
  const g = (x: number) => x * x + 2;

  // Combined Function
  const combined = (x: number) => {
    switch(op) {
        case 'add': return f(x) + g(x);
        case 'sub': return f(x) - g(x);
        case 'mul': return f(x) * g(x);
        case 'div': return f(x) / g(x);
    }
  };

  const getCombinedLimit = () => {
    switch(op) {
        case 'add': return L + M;
        case 'sub': return L - M;
        case 'mul': return L * M;
        case 'div': return L / M;
    }
  };

  const getOpSymbol = () => {
      switch(op) {
          case 'add': return '+';
          case 'sub': return '-';
          case 'mul': return '×';
          case 'div': return '÷';
      }
  };

  // Error Terms
  const epsilon1 = f(xVal) - L;
  const epsilon2 = g(xVal) - M;

  // Render Logic
  const width = 300;
  const height = 200;
  const padding = 30;

  const renderSmallGraph = (func: (x:number)=>number, color: string, label: string, targetLimit: number) => {
      const xMin = 0; const xMax = 2;
      const yMin = 0; const yMax = 5;
      
      const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
      const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

      let d = "";
      for(let x = xMin; x<=xMax; x+=0.1) {
          const px = toPxX(x);
          const py = toPxY(func(x));
          d += (x===xMin ? `M ${px} ${py}` : ` L ${px} ${py}`);
      }

      return (
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="bg-slate-50 rounded border border-slate-200">
              {/* Axes */}
              <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#cbd5e1" strokeWidth="2" />
              <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#cbd5e1" strokeWidth="2" />
              
              {/* Curve */}
              <path d={d} stroke={color} strokeWidth="3" fill="none" />
              
              {/* Current Point */}
              <circle cx={toPxX(xVal)} cy={toPxY(func(xVal))} r="5" fill={color} stroke="white" strokeWidth="2" />
              
              {/* Limit Point */}
              <circle cx={toPxX(a)} cy={toPxY(targetLimit)} r="4" fill="white" stroke={color} strokeWidth="2" strokeDasharray="2,2"/>
              <text x={toPxX(a)} y={toPxY(targetLimit)-10} textAnchor="middle" className="text-xs font-bold fill-slate-500">{label}={targetLimit}</text>
          </svg>
      );
  };

  const renderLargeGraph = () => {
      const w = 500;
      const h = 300;
      const xMin = 0; const xMax = 2;
      // Adjust y scale based on operation
      let yMin = 0; let yMax = 8;
      if (op === 'sub') { yMin = -2; yMax = 2; }
      if (op === 'mul') { yMin = 0; yMax = 8; }
      if (op === 'div') { yMin = 0; yMax = 2; }

      const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (w - 2 * padding);
      const toPxY = (y: number) => h - padding - ((y - yMin) / (yMax - yMin)) * (h - 2 * padding);

      let d = "";
      for(let x = xMin; x<=xMax; x+=0.05) {
          const px = toPxX(x);
          const py = toPxY(combined(x));
          d += (x===xMin ? `M ${px} ${py}` : ` L ${px} ${py}`);
      }
      
      const resLimit = getCombinedLimit();

      return (
          <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} className="bg-slate-900 rounded-xl shadow-inner border border-slate-700">
              <defs>
                  <pattern id="grid-dark" width="20" height="20" patternUnits="userSpaceOnUse">
                       <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5"/>
                  </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-dark)" />
              
              {/* Axes */}
              <line x1={padding} y1={toPxY(0)} x2={w-padding} y2={toPxY(0)} stroke="#475569" strokeWidth="2" />
              <line x1={toPxX(0)} y1={h-padding} x2={toPxX(0)} y2={padding} stroke="#475569" strokeWidth="2" />

              {/* Curve */}
              <path d={d} stroke="#10b981" strokeWidth="4" fill="none" />

              {/* Current Point */}
              <circle cx={toPxX(xVal)} cy={toPxY(combined(xVal))} r="6" fill="#10b981" stroke="white" strokeWidth="2" />
              
              {/* Limit Point */}
              <circle cx={toPxX(a)} cy={toPxY(resLimit)} r="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3"/>
              
              {/* Error Bars Visualization */}
              <line x1={toPxX(xVal)} y1={toPxY(combined(xVal))} x2={toPxX(a)} y2={toPxY(combined(xVal))} stroke="white" strokeDasharray="2,2" opacity="0.3" />
              <line x1={toPxX(a)} y1={toPxY(combined(xVal))} x2={toPxX(a)} y2={toPxY(resLimit)} stroke="#f43f5e" strokeWidth="2" />
              
              <text x={toPxX(a)+10} y={(toPxY(combined(xVal)) + toPxY(resLimit))/2} fill="#f43f5e" className="text-xs font-mono">Total Error</text>
              <text x={toPxX(a)+10} y={toPxY(resLimit)} fill="#10b981" className="text-sm font-bold">Limit = {resLimit.toFixed(2)}</text>
          </svg>
      );
  };

  // --- Kid Visuals ---
  const renderKidGraphic = () => {
      // SVG Characters
      const redHeight = 50; 
      const blueHeight = 30;
      
      return (
          <svg viewBox="0 0 200 150" className="w-full bg-sky-50 rounded-xl border border-sky-100">
              <path d="M 0 140 L 200 140" stroke="#0ea5e9" strokeWidth="4" />
              
              {/* Red Bot (f) */}
              <g transform="translate(40, 90)">
                  <rect x="0" y="0" width="30" height="50" fill="#f43f5e" rx="4" />
                  <text x="15" y="30" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">f</text>
                  <text x="15" y="65" textAnchor="middle" fontSize="10" fill="#9f1239">Goal: {L}</text>
              </g>

              {/* Blue Bot (g) */}
              <g transform="translate(90, 110)">
                  <rect x="0" y="0" width="30" height="30" fill="#3b82f6" rx="4" />
                  <text x="15" y="20" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">g</text>
                  <text x="15" y="45" textAnchor="middle" fontSize="10" fill="#1e3a8a">Goal: {M}</text>
              </g>
              
              {/* Combined Bot */}
              <g transform="translate(150, 60)">
                  {op === 'add' && (
                      <>
                        <rect x="0" y="30" width="30" height="50" fill="#f43f5e" rx="4" opacity="0.8" />
                        <rect x="0" y="0" width="30" height="30" fill="#3b82f6" rx="4" opacity="0.8" />
                        <text x="15" y="100" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">Goal: {L+M}</text>
                      </>
                  )}
                  {op === 'sub' && (
                      <>
                         <rect x="0" y="50" width="30" height="30" fill="#f43f5e" rx="4" opacity="0.8" />
                         <text x="15" y="100" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">Goal: {L-M}</text>
                         {/* Visualizing subtraction as difference is tricky for kids, showing result height */}
                      </>
                  )}
                  {op === 'mul' && (
                      <>
                         <rect x="0" y="20" width="40" height="60" fill="#8b5cf6" rx="4" />
                         <text x="20" y="55" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">×</text>
                         <text x="20" y="100" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">Goal: {L*M}</text>
                      </>
                  )}
                  {op === 'div' && (
                      <>
                         <rect x="0" y="50" width="30" height="30" fill="#10b981" rx="4" />
                         <text x="15" y="70" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">÷</text>
                         <text x="15" y="100" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">Goal: {(L/M).toFixed(2)}</text>
                      </>
                  )}
              </g>

              {/* Operation Symbol */}
              <text x="130" y="100" textAnchor="middle" fontSize="30" fill="#64748b">{getOpSymbol()}</text>
              <text x="170" y="100" textAnchor="middle" fontSize="30" fill="#64748b">=</text>
          </svg>
      );
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in pb-20">
      
      {/* Left Panel: Kids & Controls */}
      <div className="xl:w-1/3 flex flex-col gap-6">
          <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-4">
                 <span className="text-2xl">🤖</span>
                 <h3 className="font-bold text-indigo-900">The Robot Team</h3>
             </div>
             
             <div className="mb-4">
                 {renderKidGraphic()}
             </div>

             <div className="grid grid-cols-2 gap-2">
                 {(['add', 'sub', 'mul', 'div'] as Operation[]).map((o) => (
                     <button
                        key={o}
                        onClick={() => setOp(o)}
                        className={`py-2 rounded-lg font-bold capitalize transition-all ${op === o ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                     >
                         {o === 'add' ? 'Add (+)' : o === 'sub' ? 'Sub (-)' : o === 'mul' ? 'Mult (×)' : 'Div (÷)'}
                     </button>
                 ))}
             </div>
             
             <p className="mt-4 text-sm text-slate-600">
                 {op === 'add' && "When robots stand on shoulders, their heights ADD up!"}
                 {op === 'sub' && "Comparing heights allows us to find the difference."}
                 {op === 'mul' && "Combining their powers creates a Super Robot (Product)."}
                 {op === 'div' && "Sharing the work divides the effort."}
             </p>
          </div>
      </div>

      {/* Right Panel: PhD Simulator */}
      <div className="xl:w-2/3 flex flex-col gap-6">
          {/* Top Row: Small Graphs */}
          <div className="flex gap-4 h-48">
              <div className="flex-1 flex flex-col">
                   <div className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">f(x) -{'>'} {L}</div>
                   {renderSmallGraph(f, '#f43f5e', 'L', L)}
              </div>
              <div className="flex items-center text-2xl text-slate-400 font-bold">
                  {getOpSymbol()}
              </div>
              <div className="flex-1 flex flex-col">
                   <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">g(x) -{'>'} {M}</div>
                   {renderSmallGraph(g, '#3b82f6', 'M', M)}
              </div>
          </div>

          {/* Large Result Graph */}
          <div className="relative">
              <div className="flex justify-between items-end mb-2">
                  <h3 className="font-bold text-emerald-600">Result: Limit = {getCombinedLimit().toFixed(2)}</h3>
                  <div className="text-xs font-mono text-slate-500">
                      Combined Error -{'>'} 0 as x -{'>'} 1
                  </div>
              </div>
              {renderLargeGraph()}
              
              {/* Slider Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 bg-slate-800/90 backdrop-blur p-4 rounded-xl border border-slate-600 flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                      <span>Approach 1</span>
                      <span className="text-white">x = {xVal.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="2" step="0.01"
                    value={xVal}
                    onChange={(e) => setXVal(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="text-[10px] text-slate-400 font-mono text-center">
                      Combined Error -{'>'} 0 as x -{'>'} 1
                  </div>
              </div>
          </div>
      </div>

    </div>
  );
};
