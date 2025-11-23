
import React from 'react';

export const MovingCloserCodeLab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      
      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
            <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-slate-400 font-mono text-sm">lab_exercise.py</span>
            <div className="flex-1"></div>
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Python</span>
        </div>
        
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">import</span> math{"\n\n"}

<span className="text-purple-400">def</span> <span className="text-yellow-200">f</span>(x):{"\n"}
    <span className="text-slate-500"># f(x) = sqrt(3 - 5x + x^2 + x^3) / (x - 1)</span>{"\n"}
    numerator = math.sqrt(<span className="text-orange-400">3</span> - <span className="text-orange-400">5</span>*x + x**<span className="text-orange-400">2</span> + x**<span className="text-orange-400">3</span>){"\n"}
    denominator = x - <span className="text-orange-400">1</span>{"\n"}
    <span className="text-purple-400">return</span> numerator / denominator{"\n\n"}

<span className="text-slate-500"># Task: Investigate behavior as x approaches 1 from the right</span>{"\n"}
<span className="text-slate-500"># Suggested values: 1.1, 1.01, 1.001</span>{"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">"--- Lab Results: Approaching 1 from the Right ---"</span>){"\n\n"}

test_values = [<span className="text-orange-400">1.1</span>, <span className="text-orange-400">1.01</span>, <span className="text-orange-400">1.001</span>, <span className="text-orange-400">1.0001</span>]{"\n\n"}

<span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> test_values:{"\n"}
    <span className="text-purple-400">try</span>:{"\n"}
        y = f(x){"\n"}
        <span className="text-purple-400">print</span>(<span className="text-green-300">f"x = </span><span className="text-blue-300">{'{x:<span className="text-orange-400">8</span>}'}</span><span className="text-green-300"> | f(x) = </span><span className="text-blue-300">{'{y:<span className="text-orange-400">.5</span>f}'}</span><span className="text-green-300">"</span>){"\n"}
    <span className="text-purple-400">except</span> <span className="text-yellow-200">ValueError</span>:{"\n"}
        <span className="text-purple-400">print</span>(<span className="text-green-300">f"x = </span><span className="text-blue-300">{'{x}'}</span><span className="text-green-300"> | Error: Undefined"</span>){"\n\n"}

<span className="text-slate-500"># Check the limit value?</span>{"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">"\nDoes it look like it's approaching 2?"</span>){"\n"}
</code>
            </pre>
        </div>

        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="mb-1 text-green-500 font-bold">➜  python lab_exercise.py</div>
            <div className="opacity-90 pl-2 border-l-2 border-slate-800">
                --- Lab Results: Approaching 1 from the Right ---<br/>
                x = 1.1      | f(x) = 1.98617<br/>
                x = 1.01     | f(x) = 1.99862<br/>
                x = 1.001    | f(x) = 1.99986<br/>
                x = 1.0001   | f(x) = 1.99999<br/>
                <br/>
                Does it look like it's approaching 2?<br/>
            </div>
        </div>
      </div>
    </div>
  );
};
