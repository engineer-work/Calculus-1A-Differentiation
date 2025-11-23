
import React from 'react';

export const PossibleLimitBehaviorsCodeLab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">💻 Python Lab: Simulating Discontinuities</h3>
          <p className="text-slate-700">
              Computers hate infinity and division by zero. See how Python handles our 4 limit behaviors.
          </p>
      </div>

      {/* Code Block: Infinite */}
      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm">infinity_check.py</span>
            <span className="text-xs text-amber-400 uppercase font-bold tracking-wider">Simulating Infinity</span>
        </div>
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">def</span> <span className="text-yellow-200">check_limit</span>(x):{"\n"}
    <span className="text-slate-500"># f(x) = 1 / x^2</span>{"\n"}
    <span className="text-purple-400">try</span>:{"\n"}
        <span className="text-purple-400">return</span> <span className="text-orange-400">1</span> / (x**<span className="text-orange-400">2</span>){"\n"}
    <span className="text-purple-400">except</span> <span className="text-yellow-200">ZeroDivisionError</span>:{"\n"}
        <span className="text-purple-400">return</span> <span className="text-green-300">"UNDEFINED"</span>{"\n\n"}

<span className="text-purple-400">print</span>(<span className="text-green-300">"--- Approaching 0 ---"</span>){"\n"}
values = [<span className="text-orange-400">1</span>, <span className="text-orange-400">0.1</span>, <span className="text-orange-400">0.01</span>, <span className="text-orange-400">0.0001</span>, <span className="text-orange-400">0.0</span>]{"\n\n"}

<span className="text-purple-400">for</span> val <span className="text-purple-400">in</span> values:{"\n"}
    result = check_limit(val){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"x = </span><span className="text-blue-300">{'{val}'}</span><span className="text-green-300"> | f(x) = </span><span className="text-blue-300">{'{result}'}</span><span className="text-green-300">"</span>){"\n"}
</code>
            </pre>
        </div>
        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="text-indigo-400 mb-1">➜ python infinity_check.py</div>
            <div className="pl-2 border-l-2 border-slate-800 opacity-80">
                --- Approaching 0 ---<br/>
                x = 1 | f(x) = 1.0<br/>
                x = 0.1 | f(x) = 99.99999999999999<br/>
                x = 0.01 | f(x) = 10000.0<br/>
                x = 0.0001 | f(x) = 100000000.0<br/>
                x = 0.0 | f(x) = UNDEFINED<br/>
            </div>
            <div className="mt-2 text-yellow-500 font-bold">Note: The numbers just keep getting bigger!</div>
        </div>
      </div>

    </div>
  );
};
