
import React from 'react';

export const ReviewProblemsCodeLab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">🐍 Python Review Lab</h3>
          <p className="text-slate-700">
              Let's use Python to verify the "Floor Function" behavior and check logical conditions for limits.
          </p>
      </div>

      {/* Floor Function Investigation */}
      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm">floor_limit.py</span>
            <span className="text-xs text-indigo-400 uppercase font-bold tracking-wider">Investigating Jump Discontinuity</span>
        </div>
        
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">import</span> math{"\n\n"}

<span className="text-purple-400">def</span> <span className="text-yellow-200">check_floor_at_2</span>():{"\n"}
    <span className="text-slate-500"># 1. Approach from Left (2-)</span>{"\n"}
    left_x = <span className="text-orange-400">1.9999</span>{"\n"}
    left_val = math.floor(left_x){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"Left (x=</span><span className="text-blue-300">{'{left_x}'}</span><span className="text-green-300">) -{'>'} floor(x) = </span><span className="text-blue-300">{'{left_val}'}</span><span className="text-green-300">"</span>){"\n\n"}

    <span className="text-slate-500"># 2. Approach from Right (2+)</span>{"\n"}
    right_x = <span className="text-orange-400">2.0001</span>{"\n"}
    right_val = math.floor(right_x){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"Right (x=</span><span className="text-blue-300">{'{right_x}'}</span><span className="text-green-300">) -{'>'} floor(x) = </span><span className="text-blue-300">{'{right_val}'}</span><span className="text-green-300">"</span>){"\n\n"}

    <span className="text-slate-500"># 3. Exact Value</span>{"\n"}
    exact_val = math.floor(<span className="text-orange-400">2</span>){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"Exact (x=2)      -{'>'} floor(x) = </span><span className="text-blue-300">{'{exact_val}'}</span><span className="text-green-300">"</span>){"\n\n"}

    <span className="text-slate-500"># Conclusion</span>{"\n"}
    <span className="text-purple-400">if</span> left_val != right_val:{"\n"}
        <span className="text-purple-400">print</span>(<span className="text-green-300">"CONCLUSION: Left != Right. Limit DNE."</span>){"\n"}

check_floor_at_2(){"\n"}
</code>
            </pre>
        </div>

        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="text-indigo-400 mb-1">➜ python floor_limit.py</div>
            <div className="pl-2 border-l-2 border-slate-800 opacity-80">
                Left (x=1.9999) -{'>'} floor(x) = 1<br/>
                Right (x=2.0001) -{'>'} floor(x) = 2<br/>
                Exact (x=2)      -{'>'} floor(x) = 2<br/>
                CONCLUSION: Left != Right. Limit DNE.<br/>
            </div>
        </div>
      </div>

    </div>
  );
};
