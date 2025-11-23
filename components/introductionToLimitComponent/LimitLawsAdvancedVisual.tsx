
import React, { useState } from 'react';

export const LimitLawsAdvancedVisual: React.FC = () => {
  const [epsilon1, setEpsilon1] = useState(0.2);
  const [epsilon2, setEpsilon2] = useState(0.2);
  
  const L = 3;
  const M = 2;

  // --- Geometric Calculations ---
  // We visualize (L + e1) * (M + e2) as a large rectangle composed of smaller ones
  const scale = 60; // px per unit
  const margin = 50;
  
  // Dimensions
  const wL = L * scale;
  const wE1 = epsilon1 * scale;
  const hM = M * scale;
  const hE2 = epsilon2 * scale;

  // Totals
  const totalWidth = wL + wE1;
  const totalHeight = hM + hE2;

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in pb-20">
      
      {/* --- LEFT PANEL: Kid Metaphor --- */}
      <div className="xl:w-1/3 flex flex-col gap-6">
        
        <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🧸</span>
                <h3 className="font-bold text-indigo-900 text-lg">The Muddy Hug</h3>
            </div>
            
            <div className="mb-4">
                <svg viewBox="0 0 200 160" className="w-full bg-sky-50 rounded-xl border border-sky-100">
                    {/* Person A (L) */}
                    <g transform="translate(60, 80)">
                        <circle cx="0" cy="-20" r="15" fill="#f43f5e" />
                        <rect x="-10" y="-5" width="20" height="30" fill="#f43f5e" rx="5"/>
                        <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">L</text>
                        
                        {/* Mud A */}
                        <circle cx="12" cy="10" r="5" fill="#78350f" opacity={epsilon1 > 0.05 ? 1 : 0} />
                        <text x="25" y="12" fontSize="8" fill="#78350f" opacity={epsilon1 > 0.05 ? 1 : 0}>ε₁</text>
                    </g>

                    {/* Person B (M) */}
                    <g transform="translate(140, 80)">
                        <circle cx="0" cy="-20" r="15" fill="#3b82f6" />
                        <rect x="-10" y="-5" width="20" height="30" fill="#3b82f6" rx="5"/>
                        <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">M</text>

                        {/* Mud B */}
                        <circle cx="-12" cy="10" r="5" fill="#78350f" opacity={epsilon2 > 0.05 ? 1 : 0} />
                        <text x="-25" y="12" fontSize="8" fill="#78350f" opacity={epsilon2 > 0.05 ? 1 : 0}>ε₂</text>
                    </g>

                    {/* Hugging (Multiplication) */}
                    <text x="100" y="40" textAnchor="middle" fontSize="20">×</text>
                    
                    {/* Result Text */}
                    <text x="100" y="140" textAnchor="middle" fontSize="10" fill="#0f172a" fontWeight="bold">
                        {epsilon1 < 0.01 && epsilon2 < 0.01 
                            ? "Clean Hug! (Pure Limit)" 
                            : "Messy Hug! (Errors Mix)"}
                    </text>
                </svg>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
                When <span className="font-bold text-rose-500">L</span> and <span className="font-bold text-blue-500">M</span> hug (multiply), their little bits of "mud" (<span className="font-mono text-xs">ε</span>) get everywhere!
                <br/><br/>
                But if the mud spots are microscopic (approaching zero), the mess disappears, and we just get a perfect hug: <span className="font-bold">L × M</span>.
            </p>
        </div>

      </div>

      {/* --- RIGHT PANEL: PhD Simulator --- */}
      <div className="xl:w-2/3 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
          
          {/* Scientific Header */}
          <div className="px-6 py-4 bg-black/20 border-b border-white/10 flex justify-between items-center">
              <div>
                  <h2 className="text-white font-bold text-lg">Geometric Proof of Product Law</h2>
                  <p className="text-slate-400 text-xs font-mono">f(x)g(x) = (L + ε₁)(M + ε₂)</p>
              </div>
              <div className="text-right font-mono text-xs text-emerald-400">
                  Target Area: {L*M}
              </div>
          </div>

          {/* Interactive Graph Area */}
          <div className="relative flex-grow min-h-[400px] bg-[#0f172a] flex items-center justify-center overflow-hidden">
              
              <svg width="100%" height="100%" viewBox={`0 0 500 400`}>
                  <defs>
                      <pattern id="grid-adv" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="1"/>
                      </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-adv)" />

                  <g transform={`translate(100, 100)`}>
                      {/* Main Area LM */}
                      <rect x="0" y="0" width={wL} height={hM} fill="#10b981" opacity="0.8" stroke="#059669" strokeWidth="2" />
                      <text x={wL/2} y={hM/2} textAnchor="middle" dominantBaseline="middle" fill="white" fontWeight="bold" fontSize="20">LM</text>

                      {/* Top Strip: e1 * M */}
                      <rect x={wL} y="0" width={wE1} height={hM} fill="#f59e0b" opacity="0.6" stroke="#d97706" strokeWidth="1" />
                      {epsilon1 > 0.05 && (
                          <text x={wL + wE1/2} y={hM/2} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12" fontWeight="bold">ε₁M</text>
                      )}

                      {/* Bottom Strip: e2 * L */}
                      <rect x="0" y={hM} width={wL} height={hE2} fill="#3b82f6" opacity="0.6" stroke="#2563eb" strokeWidth="1" />
                      {epsilon2 > 0.05 && (
                          <text x={wL/2} y={hM + hE2/2} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12" fontWeight="bold">ε₂L</text>
                      )}

                      {/* Corner: e1 * e2 */}
                      <rect x={wL} y={hM} width={wE1} height={hE2} fill="#ef4444" opacity="0.8" stroke="#dc2626" strokeWidth="1" />
                      {epsilon1 > 0.05 && epsilon2 > 0.05 && (
                          <text x={wL + wE1/2} y={hM + hE2/2} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="8">ε₁ε₂</text>
                      )}

                      {/* Brackets/Labels */}
                      <text x={wL/2} y="-10" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">L</text>
                      <text x={wL + wE1/2} y="-10" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">ε₁</text>
                      
                      <text x="-15" y={hM/2} textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">M</text>
                      <text x="-15" y={hM + hE2/2} textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">ε₂</text>
                  </g>
              </svg>

              {/* Math Overlay */}
              <div className="absolute bottom-4 right-4 bg-slate-800/90 p-4 rounded-xl border border-slate-700 shadow-xl backdrop-blur">
                  <div className="text-xs text-slate-400 font-mono mb-2 uppercase tracking-wider">Expansion</div>
                  <div className="text-white font-mono text-sm">
                      (L+ε₁)(M+ε₂) = 
                      <span className="text-emerald-400 font-bold"> LM</span> + 
                      <span className="text-amber-400"> ε₁M</span> + 
                      <span className="text-blue-400"> ε₂L</span> + 
                      <span className="text-red-400"> ε₁ε₂</span>
                  </div>
              </div>

          </div>

          {/* Controls */}
          <div className="p-6 bg-slate-800 border-t border-slate-700 flex flex-col gap-4">
              <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                      <span className="text-amber-400">Error 1 (ε₁)</span>
                      <span className="text-white font-mono">{epsilon1.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="1.5" step="0.01"
                    value={epsilon1}
                    onChange={(e) => setEpsilon1(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
              </div>
              <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                      <span className="text-blue-400">Error 2 (ε₂)</span>
                      <span className="text-white font-mono">{epsilon2.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="1.5" step="0.01"
                    value={epsilon2}
                    onChange={(e) => setEpsilon2(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
              </div>
              <div className="text-center mt-2">
                  <button 
                    onClick={() => { setEpsilon1(0); setEpsilon2(0); }}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                      Snap to Limit (ε → 0)
                  </button>
              </div>
          </div>

      </div>

    </div>
  );
};
