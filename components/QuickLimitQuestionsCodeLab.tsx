
import React from 'react';

export const QuickLimitQuestionsCodeLab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">🐍 Python Logic Checker</h3>
          <p className="text-slate-700">
              In Math, "MUST" is a very strong word. To disprove a "Must", we only need one counter-example.
              Let's write Python functions that break the rules!
          </p>
      </div>

      {/* Counter-Example 1 */}
      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm">counter_example_1.py</span>
            <span className="text-xs text-red-400 uppercase font-bold tracking-wider">Disproving "Sides Must Match"</span>
        </div>
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">def</span> <span className="text-yellow-200">broken_bridge</span>(x):{"\n"}
    <span className="text-purple-400">if</span> x &lt; <span className="text-orange-400">0</span>:{"\n"}
        <span className="text-purple-400">return</span> <span className="text-orange-400">0</span>  <span className="text-slate-500"># Left side height</span>{"\n"}
    <span className="text-purple-400">else</span>:{"\n"}
        <span className="text-purple-400">return</span> <span className="text-orange-400">10</span> <span className="text-slate-500"># Right side height</span>{"\n\n"}

<span className="text-purple-400">print</span>(<span className="text-green-300">"--- Checking Limit at x=0 ---"</span>){"\n"}
<span className="text-slate-500"># Check Left Limit</span>{"\n"}
left_val = broken_bridge(<span className="text-orange-400">-0.0001</span>){"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">f"Left Limit (approx): </span><span className="text-blue-300">{'{left_val}'}</span><span className="text-green-300">"</span>){"\n"}

<span className="text-slate-500"># Check Right Limit</span>{"\n"}
right_val = broken_bridge(<span className="text-orange-400">0.0001</span>){"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">f"Right Limit (approx): </span><span className="text-blue-300">{'{right_val}'}</span><span className="text-green-300">"</span>){"\n"}

<span className="text-purple-400">if</span> left_val != right_val:{"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">"CONCLUSION: Left != Right. Limit does not exist."</span>){"\n"}
</code>
            </pre>
        </div>
        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="text-indigo-400 mb-1">➜ python counter_example_1.py</div>
            <div className="pl-2 border-l-2 border-slate-800 opacity-80">
                --- Checking Limit at x=0 ---<br/>
                Left Limit (approx): 0<br/>
                Right Limit (approx): 10<br/>
                CONCLUSION: Left != Right. Limit does not exist.
            </div>
        </div>
      </div>

      {/* Counter-Example 2 */}
      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm">counter_example_2.py</span>
            <span className="text-xs text-yellow-400 uppercase font-bold tracking-wider">Disproving "Limit = Function Value"</span>
        </div>
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">def</span> <span className="text-yellow-200">moved_house</span>(x):{"\n"}
    <span className="text-purple-400">if</span> x == <span className="text-orange-400">2</span>:{"\n"}
        <span className="text-purple-400">return</span> <span className="text-orange-400">100</span> <span className="text-slate-500"># The Point is way up high!</span>{"\n"}
    <span className="text-purple-400">else</span>:{"\n"}
        <span className="text-purple-400">return</span> x * x <span className="text-slate-500"># The Curve (parabola)</span>{"\n\n"}

<span className="text-purple-400">print</span>(<span className="text-green-300">"--- Checking x=2 ---"</span>){"\n"}

<span className="text-slate-500"># 1. The Limit (Walk close to 2)</span>{"\n"}
limit_val = moved_house(<span className="text-orange-400">2.0001</span>){"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">f"Limit approaches: </span><span className="text-blue-300">{'{limit_val:.4f}'}</span><span className="text-green-300">"</span>){"\n"}

<span className="text-slate-500"># 2. The Function Value (Stand exactly at 2)</span>{"\n"}
exact_val = moved_house(<span className="text-orange-400">2</span>){"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">f"Function Value is: </span><span className="text-blue-300">{'{exact_val}'}</span><span className="text-green-300">"</span>){"\n"}

<span className="text-purple-400">if</span> limit_val != exact_val:{"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">"CONCLUSION: Limit != Value."</span>){"\n"}
</code>
            </pre>
        </div>
        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="text-indigo-400 mb-1">➜ python counter_example_2.py</div>
            <div className="pl-2 border-l-2 border-slate-800 opacity-80">
                --- Checking x=2 ---<br/>
                Limit approaches: 4.0004<br/>
                Function Value is: 100<br/>
                CONCLUSION: Limit != Value.
            </div>
        </div>
      </div>

    </div>
  );
};
