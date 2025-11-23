
import React from 'react';

export const LimitLawsCodeLab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">🐍 Python Prover</h3>
          <p className="text-slate-700">
              Can we prove the Limit Laws numerically? Let's write a script to calculate limits of combined functions and compare them to the combination of limits.
          </p>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm">prove_laws.py</span>
            <span className="text-xs text-indigo-400 uppercase font-bold tracking-wider">Numerical Proof</span>
        </div>
        
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">def</span> <span className="text-yellow-200">f</span>(x):{"\n"}
    <span className="text-purple-400">return</span> <span className="text-orange-400">2</span>*x + <span className="text-orange-400">1</span>  <span className="text-slate-500"># Limit at x=3 is 7</span>{"\n\n"}

<span className="text-purple-400">def</span> <span className="text-yellow-200">g</span>(x):{"\n"}
    <span className="text-purple-400">return</span> x**<span className="text-orange-400">2</span>      <span className="text-slate-500"># Limit at x=3 is 9</span>{"\n\n"}

<span className="text-purple-400">def</span> <span className="text-yellow-200">check_limit_law</span>(operation, func_combined, expected_val, x_target=<span className="text-orange-400">3</span>):{"\n"}
    <span className="text-slate-500"># Approach from right</span>{"\n"}
    x_approx = x_target + <span className="text-orange-400">0.00001</span>{"\n"}
    
    val_combined = func_combined(x_approx){"\n"}
    
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"--- </span><span className="text-blue-300">{'{operation}'}</span><span className="text-green-300"> Law ---"</span>){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"Calculated Limit: </span><span className="text-blue-300">{'{val_combined:.5f}'}</span><span className="text-green-300">"</span>){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"Expected Limit:   </span><span className="text-blue-300">{'{expected_val:.5f}'}</span><span className="text-green-300">"</span>){"\n"}
    
    diff = <span className="text-purple-400">abs</span>(val_combined - expected_val){"\n"}
    <span className="text-purple-400">if</span> diff &lt; <span className="text-orange-400">0.001</span>:{"\n"}
        <span className="text-purple-400">print</span>(<span className="text-green-300">"✅ Law Holds!"</span>){"\n"}
    <span className="text-purple-400">else</span>:{"\n"}
        <span className="text-purple-400">print</span>(<span className="text-green-300">"❌ Something is wrong."</span>){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">""</span>){"\n\n"}

<span className="text-slate-500"># Known Limits</span>{"\n"}
L = <span className="text-orange-400">7</span>{"\n"}
M = <span className="text-orange-400">9</span>{"\n\n"}

<span className="text-slate-500"># 1. Addition Law</span>{"\n"}
check_limit_law(<span className="text-green-300">"ADDITION"</span>, <span className="text-purple-400">lambda</span> x: f(x) + g(x), L + M){"\n\n"}

<span className="text-slate-500"># 2. Multiplication Law</span>{"\n"}
check_limit_law(<span className="text-green-300">"MULTIPLICATION"</span>, <span className="text-purple-400">lambda</span> x: f(x) * g(x), L * M){"\n\n"}

<span className="text-slate-500"># 3. Division Law</span>{"\n"}
check_limit_law(<span className="text-green-300">"DIVISION"</span>, <span className="text-purple-400">lambda</span> x: f(x) / g(x), L / M){"\n"}
</code>
            </pre>
        </div>

        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="text-indigo-400 mb-1">➜ python prove_laws.py</div>
            <div className="pl-2 border-l-2 border-slate-800 opacity-80">
                --- ADDITION Law ---<br/>
                Calculated Limit: 16.00008<br/>
                Expected Limit:   16.00000<br/>
                ✅ Law Holds!<br/>
                <br/>
                --- MULTIPLICATION Law ---<br/>
                Calculated Limit: 63.00055<br/>
                Expected Limit:   63.00000<br/>
                ✅ Law Holds!<br/>
                <br/>
                --- DIVISION Law ---<br/>
                Calculated Limit: 0.77777<br/>
                Expected Limit:   0.77778<br/>
                ✅ Law Holds!<br/>
            </div>
        </div>
      </div>

    </div>
  );
};
