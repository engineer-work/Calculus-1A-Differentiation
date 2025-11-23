import React, { useState, useEffect } from 'react';

export const OneSidedLimits: React.FC = () => {
  const [mode, setMode] = useState<'left' | 'right' | 'both'>('both');
  const [hoverX, setHoverX] = useState<number | null>(null);

  // The function: f(x) = sqrt(3 - 5x + x^2 + x^3) / (x - 1)
  // Simplifies to: -sqrt(x+3) for x < 1, and +sqrt(x+3) for x > 1
  const calculateF = (x: number) => {
    if (Math.abs(x - 1) < 0.000001) return NaN;
    const inner = 3 - 5 * x + Math.pow(x, 2) + Math.pow(x, 3);
    if (inner < 0) return NaN;
    return Math.sqrt(inner) / (x - 1);
  };

  // --- Graph Constants ---
  const width = 600;
  const height = 350;
  const padding = 50;
  const xMin = -1;
  const xMax = 3;
  const yMin = -3.5;
  const yMax = 3.5;

  const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  // Generate Path Data
  const renderCurve = () => {
    // Left side: -1 to 0.99
    let dLeft = `M ${toPxX(-1)} ${toPxY(calculateF(-1))}`;
    for (let x = -1; x <= 0.99; x += 0.05) {
        const y = calculateF(x);
        if (!isNaN(y)) dLeft += ` L ${toPxX(x)} ${toPxY(y)}`;
    }

    // Right side: 1.01 to 3
    let dRight = `M ${toPxX(1.01)} ${toPxY(calculateF(1.01))}`;
    for (let x = 1.05; x <= 3; x += 0.05) {
        const y = calculateF(x);
        if (!isNaN(y)) dRight += ` L ${toPxX(x)} ${toPxY(y)}`;
    }

    return (
        <>
            <path d={dLeft} stroke="#6366f1" strokeWidth="3" fill="none" opacity={mode === 'right' ? 0.3 : 1} />
            <path d={dRight} stroke="#ec4899" strokeWidth="3" fill="none" opacity={mode === 'left' ? 0.3 : 1} />
        </>
    );
  };

  // Infographic: The Broken Bridge (5yo style)
  const renderBrokenBridge = () => (
    <svg viewBox="0 0 300 160" className="w-full h-auto rounded-xl bg-gradient-to-b from-sky-100 to-sky-50 border border-sky-200 overflow-hidden">
        {/* Sky & Ground */}
        <path d="M 0 120 L 130 120 L 130 160 L 0 160 Z" fill="#cbd5e1" /> {/* Left Ground */}
        <path d="M 170 120 L 300 120 L 300 160 L 170 160 Z" fill="#cbd5e1" /> {/* Right Ground (same level visually, but bridge is high) */}
        
        {/* The Gap */}
        <rect x="130" y="120" width="40" height="40" fill="#3b82f6" opacity="0.2" />
        <text x="150" y="145" textAnchor="middle" fontSize="8" fill="#3b82f6" fontWeight="bold">RIVER ONE</text>

        {/* Left Tunnel (Low) */}
        <path d="M 0 135 L 130 135" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" />
        <circle cx="130" cy="135" r="4" fill="white" stroke="#4f46e5" strokeWidth="2" />
        
        {/* Left Worker */}
        <g transform="translate(110, 125)">
            <circle cx="0" cy="0" r="4" fill="#4f46e5" />
            <rect x="-2" y="4" width="4" height="6" fill="#4f46e5" />
            <text x="-10" y="-6" fontSize="7" fill="#4f46e5" fontWeight="bold">Low Road (-2)</text>
        </g>

        {/* Right Bridge (High) */}
        <path d="M 300 65 L 170 65" stroke="#ec4899" strokeWidth="6" strokeLinecap="round" />
        <circle cx="170" cy="65" r="4" fill="white" stroke="#ec4899" strokeWidth="2" />
        
        {/* Right Worker */}
        <g transform="translate(190, 55)">
            <circle cx="0" cy="0" r="4" fill="#ec4899" />
            <rect x="-2" y="4" width="4" height="6" fill="#ec4899" />
            <text x="-5" y="-6" fontSize="7" fill="#ec4899" fontWeight="bold">High Road (+2)</text>
        </g>

        {/* Disconnection highlight */}
        <line x1="150" y1="65" x2="150" y2="135" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#arrow)" markerStart="url(#arrow)"/>
        <rect x="135" y="90" width="30" height="14" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="0.5" />
        <text x="150" y="100" textAnchor="middle" fontSize="7" fill="#b91c1c" fontWeight="bold">JUMP!</text>
    </svg>
  );

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 animate-fade-in pb-20">
      
      {/* --- LEFT PANEL: Concept & Vocabulary (Kid Friendly) --- */}
      <div className="lg:w-1/3 flex flex-col gap-6">
        
        {/* Infographic Card */}
        <div className="bg-white border-2 border-indigo-100 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-full text-xl">🚧</div>
                <div>
                    <h3 className="text-lg font-bold text-indigo-900">The Broken Bridge</h3>
                    <p className="text-xs text-indigo-600 font-medium">Visualizing the Discontinuity</p>
                </div>
            </div>
            
            <div className="mb-4">
                {renderBrokenBridge()}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
                The <strong>Left Team</strong> built a tunnel down low (-2). The <strong>Right Team</strong> built a bridge up high (+2). They missed each other at the river! This is why the limit <em>does not exist</em>.
            </p>
        </div>

        {/* Vocabulary Section */}
        <div className="flex-1">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Vocabulary</h4>
            <div className="space-y-3">
                
                {/* Left Limit Card */}
                <div className={`bg-white p-4 rounded-xl border-l-4 shadow-sm transition-all ${mode === 'left' ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-indigo-400 hover:shadow-md'}`}>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Left Hand Limit</div>
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="font-mono text-lg font-bold text-slate-800">lim x→1⁻</span>
                        <span className="font-mono text-xl font-bold text-indigo-600">= -2</span>
                    </div>
                    <p className="text-xs text-slate-500 italic">"Approaching from the negative side"</p>
                </div>

                {/* Right Limit Card */}
                <div className={`bg-white p-4 rounded-xl border-l-4 shadow-sm transition-all ${mode === 'right' ? 'border-pink-600 ring-2 ring-pink-100' : 'border-pink-400 hover:shadow-md'}`}>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Right Hand Limit</div>
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="font-mono text-lg font-bold text-slate-800">lim x→1⁺</span>
                        <span className="font-mono text-xl font-bold text-pink-600">= +2</span>
                    </div>
                    <p className="text-xs text-slate-500 italic">"Approaching from the positive side"</p>
                </div>

            </div>
        </div>
      </div>


      {/* --- RIGHT PANEL: Simulator (Masters Level) --- */}
      <div className="lg:w-2/3 flex flex-col bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-800">
         
         {/* Header Controls */}
         <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
            <div className="font-mono text-sm text-indigo-400 hidden sm:block">
                f(x) = <span className="text-slate-300">sqrt(3-5x+x²+x³) / (x-1)</span>
            </div>
            
            <div className="flex bg-slate-800 rounded-lg p-1 gap-1">
                <button 
                    onClick={() => setMode('left')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'left' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                    Left Limit
                </button>
                <button 
                    onClick={() => setMode('both')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'both' ? 'bg-slate-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                    Overview
                </button>
                <button 
                    onClick={() => setMode('right')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'right' ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                    Right Limit
                </button>
            </div>
         </div>

         {/* Interactive Graph */}
         <div className="relative flex-grow bg-[#0f172a] cursor-crosshair"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = xMin + ((e.clientX - rect.left - padding) / (width - 2 * padding)) * (xMax - xMin);
                setHoverX(Math.max(xMin, Math.min(xMax, x)));
            }}
            onMouseLeave={() => setHoverX(null)}
         >
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 pointer-events-none">
                <defs>
                    <pattern id="grid-dark-2" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-dark-2)" />

                {/* Axes */}
                <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#475569" strokeWidth="2" />
                <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#475569" strokeWidth="2" />
                
                {/* Limit Line */}
                <line x1={toPxX(1)} y1={padding} x2={toPxX(1)} y2={height-padding} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4" />
                <text x={toPxX(1)} y={padding - 10} textAnchor="middle" fill="#f59e0b" className="text-xs font-mono font-bold">x=1</text>

                {/* Curve */}
                {renderCurve()}

                {/* Limit Points (Open Circles) */}
                {(mode === 'left' || mode === 'both') && (
                    <g>
                        <circle cx={toPxX(1)} cy={toPxY(-2)} r="5" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                        <text x={toPxX(1)-15} y={toPxY(-2)} fill="#818cf8" textAnchor="end" className="text-xs font-mono font-bold">-2</text>
                    </g>
                )}
                {(mode === 'right' || mode === 'both') && (
                    <g>
                        <circle cx={toPxX(1)} cy={toPxY(2)} r="5" fill="#0f172a" stroke="#ec4899" strokeWidth="2.5" />
                        <text x={toPxX(1)-15} y={toPxY(2)} fill="#f472b6" textAnchor="end" className="text-xs font-mono font-bold">+2</text>
                    </g>
                )}

                {/* Hover Interactions */}
                {hoverX !== null && (
                    <>
                        <line x1={toPxX(hoverX)} y1={padding} x2={toPxX(hoverX)} y2={height-padding} stroke="#94a3b8" strokeWidth="1" opacity="0.5"/>
                        {!isNaN(calculateF(hoverX)) && (
                            <circle cx={toPxX(hoverX)} cy={toPxY(calculateF(hoverX))} r="4" fill="white" />
                        )}
                    </>
                )}

            </svg>

            {/* HUD Overlay */}
            <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur border border-slate-700 p-3 rounded-lg shadow-xl w-40">
                <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-wider border-b border-slate-700 pb-1">Coordinate Inspector</div>
                <div className="font-mono text-sm space-y-1">
                    <div className="flex justify-between">
                        <span className="text-slate-400">x:</span>
                        <span className="text-white">{hoverX ? hoverX.toFixed(3) : '---'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">f(x):</span>
                        <span className={`font-bold ${hoverX && hoverX < 1 ? 'text-indigo-400' : 'text-pink-400'}`}>
                            {hoverX ? (isNaN(calculateF(hoverX)) ? 'UNDEF' : calculateF(hoverX).toFixed(3)) : '---'}
                        </span>
                    </div>
                </div>
            </div>
         </div>

         {/* Footer Legend */}
         <div className="bg-slate-950 p-4 border-t border-slate-800 text-xs text-slate-500 flex justify-center gap-6">
             <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full border-2 border-indigo-500"></div>
                 <span>Approaching Left</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full border-2 border-pink-500"></div>
                 <span>Approaching Right</span>
             </div>
         </div>

      </div>
    </div>
  );
};
