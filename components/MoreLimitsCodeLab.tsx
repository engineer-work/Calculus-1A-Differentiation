
import React from 'react';

export const MoreLimitsCodeLab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">🧪 Experimental Lab</h3>
          <p className="text-slate-700">
              When functions get complicated (like having trig and algebra mixed), simple plugging in fails. 
              We use Python to "probe" the function closer and closer to the limit point.
          </p>
      </div>

      {/* Code Block 1: g(x) */}
      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm">investigate_g.py</span>
            <span className="text-xs text-green-400 uppercase font-bold tracking-wider">Left Limit of g(x)</span>
        </div>
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">import</span> math{"\n\n"}
<span className="text-purple-400">def</span> <span className="text-yellow-200">g</span>(x):{"\n"}
    <span className="text-purple-400">return</span> x / math.tan(<span className="text-orange-400">2</span> * x){"\n\n"}

<span className="text-purple-400">print</span>(<span className="text-green-300">"--- Approaching 0 from LEFT (x -{'>'} 0-) ---"</span>){"\n"}
<span className="text-slate-500"># Start at -1.0 and get closer to 0</span>{"\n"}
values = [<span className="text-orange-400">-1.0</span>, <span className="text-orange-400">-0.5</span>, <span className="text-orange-400">-0.1</span>, <span className="text-orange-400">-0.01</span>, <span className="text-orange-400">-0.001</span>]{"\n\n"}
<span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> values:{"\n"}
    y = g(x){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"x = </span><span className="text-blue-300">{'{x:<span className="text-orange-400">8</span>}'}</span><span className="text-green-300"> | g(x) = </span><span className="text-blue-300">{'{y:.5f}'}</span><span className="text-green-300">"</span>){"\n"}
</code>
            </pre>
        </div>
        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="text-indigo-400 mb-1">➜ python investigate_g.py</div>
            <div className="pl-2 border-l-2 border-slate-800 opacity-80">
                --- Approaching 0 from LEFT (x -{'>'} 0-) ---<br/>
                x = -1.0     | g(x) = -0.45766<br/>
                x = -0.5     | g(x) = 0.32132<br/>
                x = -0.1     | g(x) = 0.49340<br/>
                x = -0.01    | g(x) = 0.49993<br/>
                x = -0.001   | g(x) = 0.49999<br/>
            </div>
            <div className="mt-2 text-yellow-500 font-bold">Observation: It is approaching 0.5</div>
        </div>
      </div>

      {/* Code Block 2: h(x) */}
      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm">investigate_h.py</span>
            <span className="text-xs text-pink-400 uppercase font-bold tracking-wider">Right Limit of h(x)</span>
        </div>
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">def</span> <span className="text-yellow-200">h</span>(x):{"\n"}
    <span className="text-purple-400">return</span> (<span className="text-purple-400">abs</span>(x) + math.sin(x)) / (x**<span className="text-orange-400">2</span>){"\n\n"}

<span className="text-purple-400">print</span>(<span className="text-green-300">"--- Approaching 0 from RIGHT (x -{'>'} 0+) ---"</span>){"\n"}
values = [<span className="text-orange-400">1.0</span>, <span className="text-orange-400">0.1</span>, <span className="text-orange-400">0.01</span>, <span className="text-orange-400">0.001</span>]{"\n\n"}
<span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> values:{"\n"}
    y = h(x){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"x = </span><span className="text-blue-300">{'{x:<span className="text-orange-400">8</span>}'}</span><span className="text-green-300"> | h(x) = </span><span className="text-blue-300">{'{y:.2f}'}</span><span className="text-green-300">"</span>){"\n"}
</code>
            </pre>
        </div>
        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="text-indigo-400 mb-1">➜ python investigate_h.py</div>
            <div className="pl-2 border-l-2 border-slate-800 opacity-80">
                --- Approaching 0 from RIGHT (x -{'>'} 0+) ---<br/>
                x = 1.0      | h(x) = 1.84<br/>
                x = 0.1      | h(x) = 19.98<br/>
                x = 0.01     | h(x) = 199.99<br/>
                x = 0.001    | h(x) = 2000.00<br/>
            </div>
            <div className="mt-2 text-yellow-500 font-bold">Observation: It is growing infinitely large (+∞)</div>
        </div>
      </div>

    </div>
  );
};
