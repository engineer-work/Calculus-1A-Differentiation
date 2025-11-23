
import React from 'react';

export const SummaryCodeLab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">🤖 Capstone Project: The Auto-Limit Analyzer</h3>
          <p className="text-slate-700">
              Write a Python class that takes any function and automatically determines if the limit exists by checking the left and right approaches.
          </p>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm">limit_analyzer.py</span>
            <span className="text-xs text-emerald-400 uppercase font-bold tracking-wider">Capstone</span>
        </div>
        
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">class</span> <span className="text-yellow-200">LimitAnalyzer</span>:{"\n"}
    <span className="text-purple-400">def</span> <span className="text-blue-300">__init__</span>(self, func):{"\n"}
        self.func = func{"\n\n"}

    <span className="text-purple-400">def</span> <span className="text-blue-300">evaluate</span>(self, a):{"\n"}
        <span className="text-slate-500"># Define small step</span>{"\n"}
        h = <span className="text-orange-400">0.00001</span>{"\n"}
        
        <span className="text-slate-500"># Calculate Left and Right Limits</span>{"\n"}
        left_val = self.func(a - h){"\n"}
        right_val = self.func(a + h){"\n"}
        
        <span className="text-purple-400">print</span>(<span className="text-green-300">f"Analyzing at x = </span><span className="text-blue-300">{'{a}'}</span><span className="text-green-300">..."</span>){"\n"}
        <span className="text-purple-400">print</span>(<span className="text-green-300">f"  Left Limit  (x -{'>'} a-): </span><span className="text-blue-300">{'{left_val:.4f}'}</span><span className="text-green-300">"</span>){"\n"}
        <span className="text-purple-400">print</span>(<span className="text-green-300">f"  Right Limit (x -{'>'} a+): </span><span className="text-blue-300">{'{right_val:.4f}'}</span><span className="text-green-300">"</span>){"\n\n"}
        
        <span className="text-slate-500"># Logic Check</span>{"\n"}
        <span className="text-purple-400">if</span> <span className="text-purple-400">abs</span>(left_val) {'>'} <span className="text-orange-400">1000</span> <span className="text-purple-400">or</span> <span className="text-purple-400">abs</span>(right_val) {'>'} <span className="text-orange-400">1000</span>:{"\n"}
             <span className="text-purple-400">print</span>(<span className="text-green-300">"  RESULT: Limit DNE (Infinite/Unbounded)"</span>){"\n"}
        <span className="text-purple-400">elif</span> <span className="text-purple-400">abs</span>(left_val - right_val) &lt; <span className="text-orange-400">0.001</span>:{"\n"}
             <span className="text-purple-400">print</span>(<span className="text-green-300">f"  RESULT: Limit Exists! L = </span><span className="text-blue-300">{'{left_val:.4f}'}</span><span className="text-green-300">"</span>){"\n"}
        <span className="text-purple-400">else</span>:{"\n"}
             <span className="text-purple-400">print</span>(<span className="text-green-300">"  RESULT: Limit DNE (Jump Discontinuity)"</span>){"\n"}
        <span className="text-purple-400">print</span>(<span className="text-green-300">"-"</span>*<span className="text-orange-400">30</span>){"\n\n"}

<span className="text-slate-500"># --- TEST CASES ---</span>{"\n\n"}

<span className="text-slate-500"># 1. Smooth Function: f(x) = x^2</span>{"\n"}
analyzer = LimitAnalyzer(<span className="text-purple-400">lambda</span> x: x**<span className="text-orange-400">2</span>){"\n"}
analyzer.evaluate(<span className="text-orange-400">2</span>){"\n\n"}

<span className="text-slate-500"># 2. Jump Function (Step)</span>{"\n"}
<span className="text-purple-400">def</span> <span className="text-yellow-200">step_func</span>(x):{"\n"}
    <span className="text-purple-400">return</span> <span className="text-orange-400">0</span> <span className="text-purple-400">if</span> x &lt; <span className="text-orange-400">0</span> <span className="text-purple-400">else</span> <span className="text-orange-400">1</span>{"\n"}
analyzer2 = LimitAnalyzer(step_func){"\n"}
analyzer2.evaluate(<span className="text-orange-400">0</span>){"\n\n"}

<span className="text-slate-500"># 3. Infinite Function: f(x) = 1/x^2</span>{"\n"}
analyzer3 = LimitAnalyzer(<span className="text-purple-400">lambda</span> x: <span className="text-orange-400">1</span>/(x**<span className="text-orange-400">2</span>)){"\n"}
analyzer3.evaluate(<span className="text-orange-400">0</span>){"\n"}
</code>
            </pre>
        </div>

        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="text-indigo-400 mb-1">➜ python limit_analyzer.py</div>
            <div className="pl-2 border-l-2 border-slate-800 opacity-80">
                Analyzing at x = 2...<br/>
                  Left Limit  (x -{'>'} a-): 3.9999<br/>
                  Right Limit (x -{'>'} a+): 4.0000<br/>
                  RESULT: Limit Exists! L = 4.0000<br/>
                ------------------------------<br/>
                <br/>
                Analyzing at x = 0...<br/>
                  Left Limit  (x -{'>'} a-): 0.0000<br/>
                  Right Limit (x -{'>'} a+): 1.0000<br/>
                  RESULT: Limit DNE (Jump Discontinuity)<br/>
                ------------------------------<br/>
                <br/>
                Analyzing at x = 0...<br/>
                  Left Limit  (x -{'>'} a-): 10000000000.0000<br/>
                  Right Limit (x -{'>'} a+): 10000000000.0000<br/>
                  RESULT: Limit DNE (Infinite/Unbounded)<br/>
                ------------------------------<br/>
            </div>
        </div>
      </div>

    </div>
  );
};
