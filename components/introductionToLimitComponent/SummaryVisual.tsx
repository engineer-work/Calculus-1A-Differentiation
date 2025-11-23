
import React, { useState, useEffect, useRef } from 'react';

type Mode = 'unity' | 'jump' | 'infinite' | 'laws';

export const SummaryVisual: React.FC = () => {
  const [mode, setMode] = useState<Mode>('jump');
  const mathRef = useRef<HTMLDivElement>(null);

  // Trigger MathJax when mode changes
  useEffect(() => {
    if ((window as any).MathJax && mathRef.current) {
        // Use a small timeout to allow React to flush the DOM update first
        setTimeout(() => {
            (window as any).MathJax.typesetPromise([mathRef.current]).catch((err: any) => console.log(err));
        }, 10);
    }
  }, [mode]);

  // --- Graph Logic ---
  const width = 600;
  const height = 350;
  const padding = 50;
  const xMin = -2;
  const xMax = 2;
  const yMin = 0;
  const yMax = 5;

  const toPxX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const toPxY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  const renderGraph = () => {
    if (mode === 'laws') {
        // Visualizing f(x) + g(x)
        return (
            <>
               <path d={`M ${toPxX(-2)} ${toPxY(1.5)} L ${toPxX(2)} ${toPxY(1.5)}`} stroke="#f43f5e" strokeWidth="3" strokeDasharray="4,4"/>
               <text x={toPxX(-1.8)} y={toPxY(1.6)} fill="#f43f5e" fontSize="12" fontWeight="bold">f(x) → L</text>
               
               <path d={`M ${toPxX(-2)} ${toPxY(1)} L ${toPxX(2)} ${toPxY(1)}`} stroke="#3b82f6" strokeWidth="3" strokeDasharray="4,4"/>
               <text x={toPxX(-1.8)} y={toPxY(1.1)} fill="#3b82f6" fontSize="12" fontWeight="bold">g(x) → M</text>

               <path d={`M ${toPxX(-2)} ${toPxY(2.5)} L ${toPxX(2)} ${toPxY(2.5)}`} stroke="#10b981" strokeWidth="4"/>
               <text x={toPxX(0)} y={toPxY(2.6)} fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Limit = L + M</text>
            </>
        );
    }

    let leftPath = "";
    let rightPath = "";
    let leftY = 0; 
    let rightY = 0;

    if (mode === 'unity') {
        leftY = 2.5; rightY = 2.5;
        // Smooth quadratic meeting
        leftPath = `M ${toPxX(-2)} ${toPxY(1)} Q ${toPxX(-1)} ${toPxY(2.5)} ${toPxX(0)} ${toPxY(2.5)}`;
        rightPath = `M ${toPxX(2)} ${toPxY(4)} Q ${toPxX(1)} ${toPxY(2.5)} ${toPxX(0)} ${toPxY(2.5)}`;
    } else if (mode === 'jump') {
        leftY = 3.5; rightY = 1.5;
        // Disconnected
        leftPath = `M ${toPxX(-2)} ${toPxY(2)} Q ${toPxX(-1)} ${toPxY(3.5)} ${toPxX(0)} ${toPxY(3.5)}`;
        rightPath = `M ${toPxX(2)} ${toPxY(1)} Q ${toPxX(1)} ${toPxY(1.5)} ${toPxX(0)} ${toPxY(1.5)}`;
    } else if (mode === 'infinite') {
        // Asymptote
        // Left: 1/(x^2) shift
        leftPath = "";
        for(let i=0; i<=50; i++) {
            const x = -2 + (i/50)*1.9;
            const y = 1 / ((x)*(x)) * 0.1 + 1;
            leftPath += (i===0 ? `M ` : ` L `) + `${toPxX(x)} ${toPxY(Math.min(y, 6))}`;
        }
        rightPath = "";
        for(let i=0; i<=50; i++) {
            const x = 2 - (i/50)*1.9;
            const y = 1 / ((x)*(x)) * 0.1 + 1;
            rightPath += (i===0 ? `M ` : ` L `) + `${toPxX(x)} ${toPxY(Math.min(y, 6))}`;
        }
    }

    return (
        <>
            <path d={leftPath} stroke="#ea580c" strokeWidth="4" fill="none" markerEnd={mode === 'infinite' ? "url(#arrow-org)" : ""} />
            <path d={rightPath} stroke="#2563eb" strokeWidth="4" fill="none" markerEnd={mode === 'infinite' ? "url(#arrow-blue)" : ""} />
            
            {mode !== 'infinite' && (
                <>
                    <circle cx={toPxX(0)} cy={toPxY(leftY)} r="6" fill="white" stroke="#ea580c" strokeWidth="3"/>
                    <text x={toPxX(0)-15} y={toPxY(leftY)} textAnchor="end" fill="#ea580c" fontWeight="bold" fontSize="12">L</text>
                    
                    <circle cx={toPxX(0)} cy={toPxY(rightY)} r="6" fill="white" stroke="#2563eb" strokeWidth="3"/>
                    <text x={toPxX(0)+15} y={toPxY(rightY)} textAnchor="start" fill="#2563eb" fontWeight="bold" fontSize="12">R</text>
                </>
            )}
            
            {mode === 'infinite' && (
                <line x1={toPxX(0)} y1={padding} x2={toPxX(0)} y2={height-padding} stroke="#94a3b8" strokeDasharray="4,4"/>
            )}
        </>
    );
  };

  const getKidConfig = () => {
      switch(mode) {
          case 'unity': return { emoji: "🤝", title: "The Unity Bridge", desc: "The Left Road and Right Road meet perfectly! The car can drive across safely. The Limit Exists." };
          case 'jump': return { emoji: "🚧", title: "The Great Divide", desc: "Oh no! The Left Road is high up, but the Right Road is low down. The car would crash! No Limit here." };
          case 'infinite': return { emoji: "🚀", title: "Space Mountain", desc: "The roads turn into walls going up to space! You can't park your car on a wall. No Limit." };
          case 'laws': return { emoji: "🛠️", title: "The Tool Shed", desc: "We can build new limits by adding old ones! If Red is 2 blocks tall and Blue is 3 blocks tall, together they are 5!" };
      }
  };

  const kid = getKidConfig();

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in pb-20">
      
      {/* LEFT: Kid Map */}
      <div className="xl:w-1/3 flex flex-col gap-6">
          <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{kid.emoji}</span>
                  <div>
                      <h3 className="text-xl font-bold text-indigo-900">{kid.title}</h3>
                      <p className="text-xs text-indigo-500 font-bold uppercase">Review Mode</p>
                  </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm">{kid.desc}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-1">
              <button onClick={() => setMode('unity')} className={`w-full p-3 text-left rounded-lg mb-1 transition ${mode === 'unity' ? 'bg-indigo-600 text-white' : 'hover:bg-white/10 text-slate-300'}`}>
                  <span className="font-bold">1. Limit Exists</span>
                  <span className="block text-xs opacity-70">Left = Right</span>
              </button>
              <button onClick={() => setMode('jump')} className={`w-full p-3 text-left rounded-lg mb-1 transition ${mode === 'jump' ? 'bg-indigo-600 text-white' : 'hover:bg-white/10 text-slate-300'}`}>
                  <span className="font-bold">2. Jump (DNE)</span>
                  <span className="block text-xs opacity-70">Left ≠ Right</span>
              </button>
              <button onClick={() => setMode('infinite')} className={`w-full p-3 text-left rounded-lg mb-1 transition ${mode === 'infinite' ? 'bg-indigo-600 text-white' : 'hover:bg-white/10 text-slate-300'}`}>
                  <span className="font-bold">3. Infinite (DNE)</span>
                  <span className="block text-xs opacity-70">Unbounded</span>
              </button>
              <button onClick={() => setMode('laws')} className={`w-full p-3 text-left rounded-lg transition ${mode === 'laws' ? 'bg-indigo-600 text-white' : 'hover:bg-white/10 text-slate-300'}`}>
                  <span className="font-bold">4. Limit Laws</span>
                  <span className="block text-xs opacity-70">Arithmetic</span>
              </button>
          </div>
      </div>

      {/* RIGHT: PhD Console */}
      <div className="xl:w-2/3 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          
          {/* Math Header */}
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <div className="text-white font-serif text-lg" ref={mathRef}>
                  {mode === 'unity' && <span>{'$$ \\lim_{x \\to a^-} f(x) = L = \\lim_{x \\to a^+} f(x) $$'}</span>}
                  {mode === 'jump' && <span>{'$$ \\lim_{x \\to a^-} f(x) \\neq \\lim_{x \\to a^+} f(x) $$'}</span>}
                  {mode === 'infinite' && <span>{'$$ \\lim_{x \\to a} f(x) = \\infty $$'}</span>}
                  {mode === 'laws' && <span>{'$$ \\lim (f+g) = \\lim f + \\lim g $$'}</span>}
              </div>
              <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${mode === 'unity' || mode === 'laws' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {(mode === 'unity' || mode === 'laws') ? "LIMIT EXISTS" : "LIMIT DNE"}
              </div>
          </div>

          {/* Graph */}
          <div className="relative flex-grow min-h-[350px] bg-slate-50">
              <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
                  <defs>
                      <pattern id="grid-sum" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                      </pattern>
                      <marker id="arrow-org" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                          <path d="M0,0 L0,6 L9,3 z" fill="#ea580c" />
                      </marker>
                      <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                          <path d="M0,0 L0,6 L9,3 z" fill="#2563eb" />
                      </marker>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-sum)" />
                  
                  <line x1={padding} y1={toPxY(0)} x2={width-padding} y2={toPxY(0)} stroke="#64748b" strokeWidth="2"/>
                  <line x1={toPxX(0)} y1={height-padding} x2={toPxX(0)} y2={padding} stroke="#64748b" strokeWidth="2"/>

                  {renderGraph()}
              </svg>
          </div>

          {/* Definition Text */}
          <div className="p-6 bg-white border-t border-slate-200 text-sm text-slate-600">
              {mode === 'unity' && "Definition: The limit exists if and only if the left-hand limit and right-hand limit approach the same finite value L."}
              {mode === 'jump' && "Behavior: Jump Discontinuity. The function approaches two different values. The two-sided limit does not exist."}
              {mode === 'infinite' && "Behavior: Unbounded Growth. The function values get arbitrarily large. We write = ∞, but technically the limit does not exist as a real number."}
              {mode === 'laws' && "Theorem: Limit Laws. If limits for f and g exist, the limit of a combination (sum, product, etc.) is the combination of the limits."}
          </div>

      </div>

    </div>
  );
};
