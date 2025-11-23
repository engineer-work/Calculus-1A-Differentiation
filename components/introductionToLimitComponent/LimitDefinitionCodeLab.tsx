
import React from 'react';

export const LimitDefinitionCodeLab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">💻 The Epsilon Hunter</h3>
          <p className="text-slate-700">
              In formal math, proving a limit means finding a formula for $\delta$ in terms of $\epsilon$.
              In this lab, we will write a script that numerically searches for a valid $\delta$ for any given $\epsilon$.
          </p>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm">find_delta.py</span>
            <span className="text-xs text-emerald-400 uppercase font-bold tracking-wider">Numerical Proof</span>
        </div>
        
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">import</span> math{"\n\n"}

<span className="text-purple-400">def</span> <span className="text-yellow-200">f</span>(x):{"\n"}
    <span className="text-slate-500"># f(x) = 2x + 1.  Limit at x=3 is 7.</span>{"\n"}
    <span className="text-purple-400">return</span> <span className="text-orange-400">2</span> * x + <span className="text-orange-400">1</span>{"\n\n"}

<span className="text-purple-400">def</span> <span className="text-yellow-200">check_delta</span>(epsilon, delta, a=<span className="text-orange-400">3</span>, L=<span className="text-orange-400">7</span>):{"\n"}
    <span className="text-slate-500"># Check if all x within (a-delta, a+delta) stay within (L-eps, L+eps)</span>{"\n"}
    <span className="text-slate-500"># We'll test 100 points in the range</span>{"\n"}
    step = (delta * <span className="text-orange-400">2</span>) / <span className="text-orange-400">100</span>{"\n"}
    <span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> <span className="text-purple-400">range</span>(<span className="text-orange-400">101</span>):{"\n"}
        x = (a - delta) + i * step{"\n"}
        <span className="text-purple-400">if</span> x == a: <span className="text-purple-400">continue</span> <span className="text-slate-500"># Definition ignores the point itself</span>{"\n"}
        
        dist_y = <span className="text-purple-400">abs</span>(f(x) - L){"\n"}
        <span className="text-purple-400">if</span> dist_y {'>'}= epsilon:{"\n"}
            <span className="text-purple-400">return</span> <span className="text-orange-400">False</span> <span className="text-slate-500"># FAILED: x was safe, but f(x) was too far!</span>{"\n"}
    <span className="text-purple-400">return</span> <span className="text-orange-400">True</span>{"\n\n"}

<span className="text-slate-500"># The Judge gives us a challenge</span>{"\n"}
epsilon = <span className="text-orange-400">0.01</span>{"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">f"Challenge Epsilon: </span><span className="text-blue-300">{'{epsilon}'}</span><span className="text-green-300">"</span>){"\n\n"}

<span className="text-slate-500"># We try Delta values starting big and shrinking</span>{"\n"}
delta = <span className="text-orange-400">1.0</span>{"\n"}
<span className="text-purple-400">while</span> delta {'>'} <span className="text-orange-400">0.00001</span>:{"\n"}
    is_safe = check_delta(epsilon, delta){"\n"}
    <span className="text-purple-400">if</span> is_safe:{"\n"}
        <span className="text-purple-400">print</span>(<span className="text-green-300">f"SUCCESS! Found valid Delta: </span><span className="text-blue-300">{'{delta}'}</span><span className="text-green-300">"</span>){"\n"}
        <span className="text-purple-400">break</span>{"\n"}
    <span className="text-purple-400">else</span>:{"\n"}
        <span className="text-purple-400">print</span>(<span className="text-green-300">f"Delta </span><span className="text-blue-300">{'{delta}'}</span><span className="text-green-300"> is too big... shrinking."</span>){"\n"}
        delta = delta / <span className="text-orange-400">2</span>{"\n"}
</code>
            </pre>
        </div>

        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="text-indigo-400 mb-1">➜ python find_delta.py</div>
            <div className="pl-2 border-l-2 border-slate-800 opacity-80">
                Challenge Epsilon: 0.01<br/>
                Delta 1.0 is too big... shrinking.<br/>
                Delta 0.5 is too big... shrinking.<br/>
                Delta 0.25 is too big... shrinking.<br/>
                Delta 0.125 is too big... shrinking.<br/>
                Delta 0.0625 is too big... shrinking.<br/>
                Delta 0.03125 is too big... shrinking.<br/>
                Delta 0.015625 is too big... shrinking.<br/>
                Delta 0.0078125 is too big... shrinking.<br/>
                SUCCESS! Found valid Delta: 0.00390625<br/>
            </div>
            <div className="mt-2 text-yellow-500 font-bold">Analysis: For linear f(x)=2x+1, delta must be less than epsilon/2.</div>
        </div>
      </div>

    </div>
  );
};
