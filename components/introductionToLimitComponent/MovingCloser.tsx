
import React, { useState, useEffect } from 'react';

export const MovingCloser: React.FC = () => {
  const [xVal, setXVal] = useState(0.0);
  const [mode, setMode] = useState<'left' | 'right'>('left');
  const [history, setHistory] = useState<{ x: number; y: number }[]>([]);

  // The complex function from the transcript
  // f(x) = sqrt(3 - 5x + x^2 + x^3) / (x - 1)
  const calculateF = (x: number) => {
    if (Math.abs(x - 1) < 0.0000001) return NaN; // Undefined at x=1
    
    const inner = 3 - 5 * x + Math.pow(x, 2) + Math.pow(x, 3);
    if (inner < 0) return NaN; // Real domain check
    
    const num = Math.sqrt(inner);
    const den = x - 1;
    return num / den;
  };

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setXVal(val);
    
    const y = calculateF(val);
    if (!isNaN(y)) {
      setHistory(prev => {
        const newEntry = { x: val, y };
        // Keep last 5 unique entries
        const filtered = prev.filter(p => Math.abs(p.x - val) > 0.001);
        return [newEntry, ...filtered].slice(0, 5);
      });
    }
  };

  // Set up initial values when mode changes
  useEffect(() => {
    setHistory([]);
    if (mode === 'left') setXVal(0.0);
    else setXVal(2.0);
  }, [mode]);

  // --- Graph Rendering ---
  const width = 500;
  const height = 300;
  const padding = 40;
  
  const xMin = -0.5, xMax = 2.5;
  const yMin = -3, yMax = 3;

  const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  const renderPath = () => {
    let dLeft = `M ${toPxX(-0.5)} ${toPxY(calculateF(-0.5))}`;
    // Plot left side: -0.5 to 0.99
    for (let x = -0.4; x <= 0.99; x += 0.05) {
      const y = calculateF(x);
      if (!isNaN(y)) dLeft += ` L ${toPxX(x)} ${toPxY(y)}`;
    }
    
    let dRight = `M ${toPxX(1.01)} ${toPxY(calculateF(1.01))}`;
    // Plot right side: 1.01 to 2.5
    for (let x = 1.05; x <= 2.5; x += 0.05) {
        const y = calculateF(x);
        if (!isNaN(y)) dRight += ` L ${toPxX(x)} ${toPxY(y)}`;
    }

    return (
        <>
            <path d={dLeft} stroke="#4f46e5" strokeWidth="3" fill="none" />
            <path d={dRight} stroke="#ec4899" strokeWidth="3" fill="none" />
        </>
    );
  };

  const currentY = calculateF(xVal);

  // Infographic: Robot Visualization for Kids
  const renderRobotInfographic = () => {
      return (
        <svg viewBox="0 0 200 120" className="w-full h-auto my-4 select-none">
            <rect width="200" height="120" fill="#f8fafc" rx="8" />
            
            {/* The Path (Ground) */}
            <path d="M 10 90 Q 50 90 100 90 T 190 90" stroke="#cbd5e1" strokeWidth="4" fill="none" strokeLinecap="round"/>
            
            {/* The "Hole" at 1 (Center) */}
            <ellipse cx="100" cy="90" rx="8" ry="4" fill="#1e293b" />
            <text x="100" y="110" textAnchor="middle" fontSize="8" fill="#ef4444" fontWeight="bold" fontFamily="sans-serif">THE HOLE</text>
            
            {/* The Robot (at xVal) */}
            {/* Map xVal from -0.5...2.5 to SVG range 10...190 */}
            <g transform={`translate(${10 + ((xVal - (-0.5)) / 3) * 180}, 70)`}>
                {/* Body */}
                <rect x="-12" y="-24" width="24" height="24" rx="6" fill={mode === 'left' ? '#6366f1' : '#ec4899'} stroke="#1e1b4b" strokeWidth="1"/>
                {/* Screen/Face */}
                <rect x="-8" y="-20" width="16" height="14" rx="2" fill="#e0f2fe" />
                {/* Eyes */}
                <circle cx="-3" cy="-14" r="2" fill="#0f172a" />
                <circle cx="3" cy="-14" r="2" fill="#0f172a" />
                {/* Mouth */}
                <path d="M -3 -10 Q 0 -8 3 -10" stroke="#0f172a" strokeWidth="1" fill="none" />
                
                {/* Antennas */}
                <line x1="-4" y1="-24" x2="-8" y2="-32" stroke="#64748b" strokeWidth="2" />
                <circle cx="-8" cy="-32" r="2" fill="#f59e0b" />
                
                {/* Wheels */}
                <circle cx="-8" cy="2" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1"/>
                <circle cx="8" cy="2" r="5" fill="#334155" stroke="#1e293b" strokeWidth="1"/>
            </g>
            
            {/* Value Bubble */}
            <g transform="translate(140, 25)">
               <rect x="0" y="0" width="50" height="35" rx="8" fill="white" stroke="#94a3b8" strokeWidth="1" />
               <path d="M 0 30 L -5 35 L 5 35 Z" fill="white" stroke="#94a3b8" strokeWidth="1" transform="translate(10,0)"/>
               <text x="25" y="12" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="sans-serif">SCORE</text>
               <text x="25" y="26" textAnchor="middle" fontSize="10" fontWeight="bold" fill={isNaN(currentY) ? '#ef4444' : '#0f172a'}>
                   {isNaN(currentY) ? 'OOPS!' : currentY.toFixed(2)}
               </text>
            </g>
            
        </svg>
      );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in pb-12">
      
      {/* --- Left Panel: Kid Friendly Explanation (Infograph) --- */}
      <div className="lg:w-1/3 flex flex-col gap-6 shrink-0">
        <div className="bg-indigo-50 border-2 border-indigo-100 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-white p-2 rounded-full shadow-sm text-2xl">🤖</div>
                <h3 className="text-xl font-bold text-indigo-900 font-serif">Robo's Journey</h3>
            </div>
            
            <div className="bg-white rounded-xl border border-indigo-100 shadow-inner p-2">
                {renderRobotInfographic()}
            </div>

            <div className="mt-4 space-y-3">
                <p className="text-indigo-900 font-medium text-sm">
                    Meet <span className="font-bold text-indigo-600">Robo</span>! He loves walking on the Number Path.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Every step Robo takes creates a special number called a <strong>Score</strong> (that's <i>f(x)</i>).
                </p>
                <div className="bg-white p-3 rounded-lg border border-indigo-100 flex gap-3 items-start">
                    <span className="text-xl">🕳️</span>
                    <p className="text-xs text-slate-600">
                        <strong>The Mission:</strong> Get as close to the <span className="text-red-500 font-bold">Big Hole</span> (Step #1) as possible without falling in! Watch the Score change.
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                <span>📝</span> Robo's Notebook
            </h4>
            
            {history.length === 0 ? (
                <div className="text-center text-slate-400 py-8 italic text-xs">
                    Move the slider to help Robo walk...
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-slate-200">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px]">
                            <tr>
                                <th className="px-3 py-2">Step (x)</th>
                                <th className="px-3 py-2">Score f(x)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {history.map((pt, i) => (
                                <tr key={i} className={i === 0 ? "bg-yellow-50 font-bold transition-colors" : "bg-white"}>
                                    <td className="px-3 py-2 font-mono text-slate-700 text-xs">{pt.x.toFixed(5)}</td>
                                    <td className="px-3 py-2 font-mono text-indigo-600 text-xs">{pt.y.toFixed(5)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>


      {/* --- Right Panel: Masters/PhD Level Simulator --- */}
      <div className="lg:w-2/3 flex flex-col bg-slate-900 rounded-xl shadow-2xl overflow-hidden text-slate-300 border border-slate-800">
         
         {/* Header */}
         <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="font-mono text-sm text-indigo-400">
                f(x) = <span className="text-white">sqrt(3-5x+x²+x³) / (x-1)</span>
            </div>
            <div className="flex bg-slate-800 rounded-lg p-1">
                <button 
                    onClick={() => setMode('left')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition ${mode === 'left' ? 'bg-indigo-500 text-white' : 'hover:text-white'}`}
                >
                    Left Limit (x → 1⁻)
                </button>
                <button 
                    onClick={() => setMode('right')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition ${mode === 'right' ? 'bg-pink-500 text-white' : 'hover:text-white'}`}
                >
                    Right Limit (x → 1⁺)
                </button>
            </div>
         </div>

         {/* Graph Area */}
         <div className="relative flex-grow min-h-[350px] bg-[#0f172a]">
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="absolute inset-0">
                <defs>
                    <pattern id="grid-dark" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-dark)" />
                
                {/* Axes */}
                <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#475569" strokeWidth="2" />
                <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#475569" strokeWidth="2" />
                
                {/* Asymptote/Limit Line at x=1 */}
                <line x1={toPxX(1)} y1={padding} x2={toPxX(1)} y2={height-padding} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4" />
                <text x={toPxX(1)} y={padding - 10} textAnchor="middle" fill="#f59e0b" className="text-xs font-mono">x=1</text>

                {/* The Function */}
                {renderPath()}

                {/* Current Point */}
                {!isNaN(currentY) && (
                    <>
                        <circle cx={toPxX(xVal)} cy={toPxY(currentY)} r="6" fill={mode === 'left' ? '#6366f1' : '#ec4899'} stroke="white" strokeWidth="2" />
                        {/* Projection lines */}
                        <line x1={toPxX(xVal)} y1={toPxY(currentY)} x2={toPxX(xVal)} y2={toPxY(0)} stroke="#94a3b8" strokeDasharray="2,2" opacity="0.5" />
                        <line x1={toPxX(xVal)} y1={toPxY(currentY)} x2={toPxX(0)} y2={toPxY(currentY)} stroke="#94a3b8" strokeDasharray="2,2" opacity="0.5" />
                    </>
                )}
            </svg>

            {/* Floating Data Overlay */}
            <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur border border-slate-700 p-3 rounded-lg font-mono text-xs shadow-xl">
                <div className="flex justify-between gap-4 mb-1">
                    <span className="text-slate-400">x:</span>
                    <span className="text-white font-bold">{xVal.toFixed(6)}</span>
                </div>
                <div className="flex justify-between gap-4">
                    <span className="text-slate-400">f(x):</span>
                    <span className={`${mode === 'left' ? 'text-indigo-400' : 'text-pink-400'} font-bold`}>
                        {isNaN(currentY) ? 'UNDEFINED' : currentY.toFixed(6)}
                    </span>
                </div>
            </div>
         </div>

         {/* Controls */}
         <div className="p-6 bg-slate-950 border-t border-slate-800">
            <div className="flex justify-between mb-2 text-xs uppercase tracking-wider font-bold text-slate-500">
                <span>{mode === 'left' ? 'Safe Zone' : 'Danger Zone'}</span>
                <span>The Wall (x=1)</span>
            </div>
            <input 
                type="range"
                min={mode === 'left' ? 0 : 1.001}
                max={mode === 'left' ? 0.999 : 2}
                step="0.001"
                value={xVal}
                onChange={handleSliderChange}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${mode === 'left' ? 'bg-indigo-900 accent-indigo-500' : 'bg-pink-900 accent-pink-500'}`}
            />
            <div className="mt-4 text-center">
                <p className="text-sm text-slate-400">
                    Approaching from: <span className="text-white font-bold">{mode === 'left' ? 'Left' : 'Right'}</span>
                </p>
                <p className="text-lg font-bold mt-1 text-white">
                    Limit ≈ {mode === 'left' ? '-2.00' : '+2.00'}
                </p>
            </div>
         </div>

      </div>
    </div>
  );
};
