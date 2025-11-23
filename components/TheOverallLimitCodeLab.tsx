
import React from 'react';

export const TheOverallLimitCodeLab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">🐍 Python Limit Judge</h3>
          <p className="text-slate-700">
              We can write a simple Python program to act as a "Judge". It will calculate the Left side, the Right side, and declare if the Limit exists.
          </p>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm">judge_limit.py</span>
            <span className="text-xs text-green-400 uppercase font-bold tracking-wider">Equality Checker</span>
        </div>
        
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">import</span> math{"\n\n"}

<span className="text-purple-400">def</span> <span className="text-yellow-200">f</span>(x):{"\n"}
    <span className="text-slate-500"># Example Function: f(x) = (x^2 - 1) / (x - 1)</span>{"\n"}
    <span className="text-slate-500"># Has a hole at x = 1. But does limit exist?</span>{"\n"}
    <span className="text-purple-400">if</span> x == <span className="text-orange-400">1</span>:{"\n"}
        <span className="text-purple-400">return</span> <span className="text-purple-400">float</span>(<span className="text-green-300">'nan'</span>){"\n"}
    <span className="text-purple-400">return</span> (x**<span className="text-orange-400">2</span> - <span className="text-orange-400">1</span>) / (x - <span className="text-orange-400">1</span>){"\n\n"}

<span className="text-slate-500"># 1. Calculate Left Limit (approach 1 from below)</span>{"\n"}
left_x = <span className="text-orange-400">0.99999</span>{"\n"}
left_limit = f(left_x){"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">f"Left Limit  (x=</span><span className="text-blue-300">{'{left_x}'}</span><span className="text-green-300">) -{'>'} </span><span className="text-blue-300">{'{left_limit:.5f}'}</span><span className="text-green-300">"</span>){"\n\n"}

<span className="text-slate-500"># 2. Calculate Right Limit (approach 1 from above)</span>{"\n"}
right_x = <span className="text-orange-400">1.00001</span>{"\n"}
right_limit = f(right_x){"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">f"Right Limit (x=</span><span className="text-blue-300">{'{right_x}'}</span><span className="text-green-300">) -{'>'} </span><span className="text-blue-300">{'{right_limit:.5f}'}</span><span className="text-green-300">"</span>){"\n\n"}

<span className="text-slate-500"># 3. Judge the Verdict</span>{"\n"}
<span className="text-purple-400">if</span> <span className="text-purple-400">abs</span>(left_limit - right_limit) &lt; <span className="text-orange-400">0.001</span>:{"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">"✅ VERDICT: The Limit Exists!"</span>){"\n"}
<span className="text-purple-400">else</span>:{"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">"❌ VERDICT: Limit Does Not Exist."</span>){"\n"}
</code>
            </pre>
        </div>

        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="text-indigo-400 mb-1">➜ python judge_limit.py</div>
            <div className="pl-2 border-l-2 border-slate-800 opacity-80">
                Left Limit  (x=0.99999) -{'>'} 1.99999<br/>
                Right Limit (x=1.00001) -{'>'} 2.00001<br/>
                ✅ VERDICT: The Limit Exists!
            </div>
        </div>
      </div>
      
      <div className="bg-slate-100 p-4 rounded-lg text-sm text-slate-600 border border-slate-200 text-center">
          Note: Even though f(1) is technically undefined (0/0), the limit is clearly 2.
      </div>

    </div>
  );
};
