
import React, { useState } from 'react';

export const LimitsFromGraphsVisual: React.FC = () => {
  const [focusPoint, setFocusPoint] = useState<number | null>(null); // -2, 1, or 3
  const [hoverX, setHoverX] = useState<number | null>(null);

  // --- Graph Configuration ---
  const width = 800;
  const height = 400;
  const padding = 50;
  const xMin = -3.5;
  const xMax = 5.5;
  const yMin = 0;
  const yMax = 5;

  const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  // --- Path Generation ---
  const renderPaths = () => {
    // Segment 1: x < -2
    // Start arrow around (-3.1, 1.8), goes up to peak (-2.6, 3.3), ends at open circle (-2, 3)
    const path1 = `
        M ${toPxX(-3.1)} ${toPxY(1.8)} 
        C ${toPxX(-3.0)} ${toPxY(4.2)}, ${toPxX(-2.5)} ${toPxY(3.8)}, ${toPxX(-2)} ${toPxY(3)}
    `;

    // Segment 2a: -2 < x < 1
    // Starts open circle (-2, 1) -> Peak (-1, 2) -> Valley (0, 1) -> End open circle (1, 2)
    const path2a = `
        M ${toPxX(-2)} ${toPxY(1)} 
        C ${toPxX(-1.5)} ${toPxY(1.1)}, ${toPxX(-1.5)} ${toPxY(2)}, ${toPxX(-1)} ${toPxY(2)}
        S ${toPxX(-0.5)} ${toPxY(1)}, ${toPxX(0)} ${toPxY(1)}
        S ${toPxX(0.5)} ${toPxY(2)}, ${toPxX(1)} ${toPxY(2)}
    `;

    // Segment 2b: 1 < x < 3
    // Starts open circle (1, 2) -> Dips to (2.2, 1) -> Asymptote at x=3
    const path2b = `
        M ${toPxX(1)} ${toPxY(2)} 
        C ${toPxX(1.5)} ${toPxY(2)}, ${toPxX(1.8)} ${toPxY(1)}, ${toPxX(2.2)} ${toPxY(1)}
        S ${toPxX(2.8)} ${toPxY(2.5)}, ${toPxX(2.92)} ${toPxY(4.8)}
    `;

    // Segment 3: x >= 3
    // Starts solid dot (3, 1) -> Wiggles to right
    const path3 = `
       M ${toPxX(3)} ${toPxY(1)}
       C ${toPxX(3.2)} ${toPxY(1)}, ${toPxX(3.4)} ${toPxY(2)}, ${toPxX(3.6)} ${toPxY(1.6)}
       S ${toPxX(4.2)} ${toPxY(0.5)}, ${toPxX(4.4)} ${toPxY(2.5)}
       S ${toPxX(4.8)} ${toPxY(0.5)}, ${toPxX(4.85)} ${toPxY(1.5)}
    `;

    return (
        <>
            <path d={path1} stroke="#4f46e5" strokeWidth="3" fill="none" markerStart="url(#arrow-start)" />
            <path d={path2a} stroke="#4f46e5" strokeWidth="3" fill="none" />
            <path d={path2b} stroke="#4f46e5" strokeWidth="3" fill="none" markerEnd="url(#arrow-end)" />
            <path d={path3} stroke="#4f46e5" strokeWidth="3" fill="none" markerEnd="url(#arrow-end)" />
        </>
    );
  };

  // --- Kid Explanations ---
  const getKidContent = () => {
      if (focusPoint === -2) {
          return {
              emoji: "🚧",
              title: "The Jump (-2)",
              desc: "Look at the road! The left road ends high up (height 3). The right road starts low down (height 1). You have to JUMP to get across. The roads don't match!"
          };
      }
      if (focusPoint === 1) {
          return {
              emoji: "🕳️",
              title: "The Pothole (1)",
              desc: "Smooth driving here! The car approaches height 2 from both sides. But watch out—there is a hole in the road exactly at x=1. The car can approach, but can't park!"
          };
      }
      if (focusPoint === 3) {
          return {
              emoji: "🚀",
              title: "The Rocket Wall (3)",
              desc: "Whoa! approaching from the left, the road turns into a wall going straight up to space! You can't drive over infinite walls. But on the right side, the road starts at height 1."
          };
      }
      return {
          emoji: "🎢",
          title: "Roller Coaster Limits",
          desc: "This is a crazy track! It has jumps, holes, and infinite walls. Click on the special zones to explore the limits."
      };
  };

  const kidData = getKidContent();

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in pb-20">
      
      {/* Left Panel: Kids */}
      <div className="xl:w-1/3 flex flex-col gap-6">
        <div className="bg-indigo-50 border-2 border-indigo-100 rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                 <span className="text-4xl">{kidData.emoji}</span>
                 <div>
                     <h3 className="font-bold text-indigo-900 text-lg">{kidData.title}</h3>
                     <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Visual Mode</span>
                 </div>
             </div>
             <p className="text-slate-700 leading-relaxed">
                 {kidData.desc}
             </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
             <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
                 <h4 className="text-white font-bold text-sm">Select a Zone</h4>
             </div>
             <div className="divide-y divide-slate-100">
                 <button onClick={() => setFocusPoint(-2)} className={`w-full p-4 text-left hover:bg-slate-50 transition flex justify-between items-center ${focusPoint === -2 ? 'bg-indigo-50' : ''}`}>
                     <span className="font-medium text-slate-700">x = -2 (Jump)</span>
                     <span className="text-indigo-500">➜</span>
                 </button>
                 <button onClick={() => setFocusPoint(1)} className={`w-full p-4 text-left hover:bg-slate-50 transition flex justify-between items-center ${focusPoint === 1 ? 'bg-indigo-50' : ''}`}>
                     <span className="font-medium text-slate-700">x = 1 (Hole)</span>
                     <span className="text-indigo-500">➜</span>
                 </button>
                 <button onClick={() => setFocusPoint(3)} className={`w-full p-4 text-left hover:bg-slate-50 transition flex justify-between items-center ${focusPoint === 3 ? 'bg-indigo-50' : ''}`}>
                     <span className="font-medium text-slate-700">x = 3 (Infinity)</span>
                     <span className="text-indigo-500">➜</span>
                 </button>
             </div>
        </div>
      </div>

      {/* Right Panel: Graph */}
      <div className="xl:w-2/3 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative">
           
           <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h2 className="font-bold text-slate-800">Function Graph f(x)</h2>
               <div className="flex gap-4 text-xs font-mono text-slate-500">
                   <div className="flex items-center gap-1">
                       <div className="w-2 h-2 rounded-full border-2 border-indigo-600 bg-white"></div>
                       <span>Hole (Open)</span>
                   </div>
                   <div className="flex items-center gap-1">
                       <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                       <span>Point (Solid)</span>
                   </div>
               </div>
           </div>

           <div className="relative flex-grow min-h-[400px] bg-slate-50 cursor-crosshair"
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = xMin + ((e.clientX - rect.left - padding) / (width - 2 * padding)) * (xMax - xMin);
                    setHoverX(x);
                }}
                onMouseLeave={() => setHoverX(null)}
           >
               <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
                   <defs>
                       <pattern id="grid-lg" width="50" height="50" patternUnits="userSpaceOnUse">
                           <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#cbd5e1" strokeWidth="0.5"/>
                       </pattern>
                       <marker id="arrow-start" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M9,0 L9,6 L0,3 z" fill="#4f46e5" />
                       </marker>
                       <marker id="arrow-end" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#4f46e5" />
                       </marker>
                   </defs>
                   <rect width="100%" height="100%" fill="url(#grid-lg)" />

                   {/* Axes */}
                   <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#64748b" strokeWidth="2" />
                   <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#64748b" strokeWidth="2" />

                   {/* X Axis Labels */}
                   {[-3, -2, -1, 1, 2, 3, 4, 5].map(x => (
                       <text key={x} x={toPxX(x)} y={toPxY(0) + 20} textAnchor="middle" className="text-xs font-mono fill-slate-500">{x}</text>
                   ))}
                   {/* Y Axis Labels */}
                   {[1, 2, 3, 4, 5].map(y => (
                       <text key={y} x={toPxX(0) - 15} y={toPxY(y) + 4} textAnchor="end" className="text-xs font-mono fill-slate-500">{y}</text>
                   ))}

                   {/* Vertical Guide Lines for Key Points (Subtle) */}
                   <line x1={toPxX(-2)} y1={padding} x2={toPxX(-2)} y2={height-padding} stroke="#e2e8f0" strokeDasharray="4,4" />
                   <line x1={toPxX(1)} y1={padding} x2={toPxX(1)} y2={height-padding} stroke="#e2e8f0" strokeDasharray="4,4" />
                   <line x1={toPxX(3)} y1={padding} x2={toPxX(3)} y2={height-padding} stroke="#94a3b8" strokeDasharray="2,2" />

                   {/* Function Paths */}
                   {renderPaths()}

                   {/* Critical Points - Matching the Image Logic */}
                   
                   {/* x = -2 */}
                   {/* Left Limit: Open Circle at 3 */}
                   <circle cx={toPxX(-2)} cy={toPxY(3)} r="5" fill="white" stroke="#4f46e5" strokeWidth="2" />
                   {/* Right Limit: Open Circle at 1 */}
                   <circle cx={toPxX(-2)} cy={toPxY(1)} r="5" fill="white" stroke="#4f46e5" strokeWidth="2" />
                   {/* Function Value: Solid Point at 2 */}
                   <circle cx={toPxX(-2)} cy={toPxY(2)} r="5" fill="#4f46e5" stroke="white" strokeWidth="2" />

                   {/* x = 1 */}
                   {/* Limit is 2 (Hole): Open Circle at 2 */}
                   <circle cx={toPxX(1)} cy={toPxY(2)} r="5" fill="white" stroke="#4f46e5" strokeWidth="2" />
                   
                   {/* x = 3 */}
                   {/* Right Limit starts at 1: Solid Dot at 1 */}
                   <circle cx={toPxX(3)} cy={toPxY(1)} r="5" fill="#4f46e5" stroke="white" strokeWidth="2" />

                   {/* Interactive Hover Line */}
                   {hoverX !== null && (
                       <line x1={toPxX(hoverX)} y1={padding} x2={toPxX(hoverX)} y2={height-padding} stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" opacity="0.6"/>
                   )}

                   {/* Focus Highlight */}
                   {focusPoint !== null && (
                       <rect 
                         x={toPxX(focusPoint - 0.5)} 
                         y={padding} 
                         width={toPxX(focusPoint + 0.5) - toPxX(focusPoint - 0.5)} 
                         height={height - 2*padding}
                         fill="#6366f1"
                         fillOpacity="0.1"
                         pointerEvents="none"
                       />
                   )}

               </svg>

               {/* PhD Tooltip */}
               {hoverX !== null && (
                   <div className="absolute top-4 right-4 bg-slate-900/90 text-white p-3 rounded-lg shadow-xl font-mono text-xs border border-slate-700 pointer-events-none">
                       <div>x : {hoverX.toFixed(2)}</div>
                       <div className="text-slate-400">Move mouse to inspect</div>
                   </div>
               )}
           </div>
      </div>

    </div>
  );
};
