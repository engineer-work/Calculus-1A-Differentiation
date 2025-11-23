
import React from 'react';

export const LimitsFromGraphsCodeLab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">🐍 Modeling Piecewise Functions</h3>
          <p className="text-slate-700">
              In Python, we use <code>if/elif/else</code> statements to define functions that behave differently in different regions (Piecewise).
              Let's build the function from the graph!
          </p>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm">piecewise_limits.py</span>
            <span className="text-xs text-indigo-400 uppercase font-bold tracking-wider">Complex Logic</span>
        </div>
        
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">def</span> <span className="text-yellow-200">f</span>(x):{"\n"}
    <span className="text-slate-500"># 1. Left Region (x &lt; -2)</span>{"\n"}
    <span className="text-purple-400">if</span> x &lt; <span className="text-orange-400">-2</span>:{"\n"}
        <span className="text-purple-400">return</span> <span className="text-orange-400">3.0</span> - (x + <span className="text-orange-400">2</span>)**<span className="text-orange-400">2</span>  <span className="text-slate-500"># Curve approaching 3</span>{"\n\n"}
    
    <span className="text-slate-500"># The Point at x = -2</span>{"\n"}
    <span className="text-purple-400">if</span> x == <span className="text-orange-400">-2</span>:{"\n"}
        <span className="text-purple-400">return</span> <span className="text-orange-400">2.0</span>{"\n\n"}

    <span className="text-slate-500"># 2. Middle Region (-2 &lt; x &lt; 3)</span>{"\n"}
    <span className="text-purple-400">if</span> x &lt; <span className="text-orange-400">3</span>:{"\n"}
        <span className="text-purple-400">if</span> <span className="text-purple-400">abs</span>(x - <span className="text-orange-400">1</span>) &lt; <span className="text-orange-400">0.0000001</span>:{"\n"}
            <span className="text-purple-400">return</span> <span className="text-green-300">"DNE"</span> <span className="text-slate-500"># Hole at x=1</span>{"\n"}
        <span className="text-slate-500"># Approximate curve</span>{"\n"}
        <span className="text-purple-400">return</span> <span className="text-orange-400">1.0</span> + (x + <span className="text-orange-400">2</span>)*<span className="text-orange-400">0.5</span> + (x**<span className="text-orange-400">3</span>)*<span className="text-orange-400">0.05</span> + <span className="text-orange-400">0.5</span>/(<span className="text-orange-400">3</span>-x){"\n\n"}

    <span className="text-slate-500"># 3. Right Region (x {'>'}= 3)</span>{"\n"}
    <span className="text-slate-500"># Starts at 1, oscillates</span>{"\n"}
    <span className="text-purple-400">return</span> <span className="text-orange-400">1.0</span> + math.sin((x-<span className="text-orange-400">3</span>)*<span className="text-orange-400">3</span>){"\n\n"}

<span className="text-purple-400">def</span> <span className="text-yellow-200">check_limit</span>(target, side=<span className="text-green-300">'both'</span>):{"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"--- Checking Limit at x -{'>'} </span><span className="text-blue-300">{'{target}'}</span><span className="text-green-300"> ---"</span>){"\n"}
    
    <span className="text-slate-500"># Left approach</span>{"\n"}
    left_val = f(target - <span className="text-orange-400">0.001</span>){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"Left (</span><span className="text-blue-300">{'{target}'}</span><span className="text-green-300">-) ≈ </span><span className="text-blue-300">{'{left_val:.4f}'}</span><span className="text-green-300">"</span>){"\n"}
    
    <span className="text-slate-500"># Right approach</span>{"\n"}
    right_val = f(target + <span className="text-orange-400">0.001</span>){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"Right (</span><span className="text-blue-300">{'{target}'}</span><span className="text-green-300">+) ≈ </span><span className="text-blue-300">{'{right_val:.4f}'}</span><span className="text-green-300">"</span>){"\n\n"}

<span className="text-slate-500"># Run Analysis</span>{"\n"}
check_limit(<span className="text-orange-400">-2</span>){"\n"}
check_limit(<span className="text-orange-400">1</span>){"\n"}
check_limit(<span className="text-orange-400">3</span>){"\n"}
</code>
            </pre>
        </div>

        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="text-indigo-400 mb-1">➜ python piecewise_limits.py</div>
            <div className="pl-2 border-l-2 border-slate-800 opacity-80">
                --- Checking Limit at x -{'>'} -2 ---<br/>
                Left (-2-) ≈ 2.9999<br/>
                Right (-2+) ≈ 1.1000<br/>
                <br/>
                --- Checking Limit at x -{'>'} 1 ---<br/>
                Left (1-) ≈ 1.9999<br/>
                Right (1+) ≈ 2.0001<br/>
                <br/>
                --- Checking Limit at x -{'>'} 3 ---<br/>
                Left (3-) ≈ 503.7499 <span className="text-yellow-500">(Growing huge!)</span><br/>
                Right (3+) ≈ 1.0030<br/>
            </div>
        </div>
      </div>

    </div>
  );
};
