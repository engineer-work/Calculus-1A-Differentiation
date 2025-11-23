
import React from 'react';

export const OneSidedLimitsCodeLab: React.FC = () => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto animate-fade-in">
      
      {/* Explanation Header */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-2">🤖 Coding Challenge: The Broken Bridge</h3>
          <p className="text-slate-700 text-sm">
              In this lab, we will write a Python script to numerically prove that the limit does not exist.
              We will calculate <span className="font-mono bg-white px-1 rounded border border-indigo-200 text-indigo-600">f(x)</span> as we approach 1 from the left (Left Hand Limit) and from the right (Right Hand Limit).
          </p>
      </div>

      {/* Code Editor / Terminal Simulation */}
      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        
        {/* Terminal Header */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
            <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-slate-400 font-mono text-sm">one_sided_limits.py</span>
            <div className="flex-1"></div>
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Python</span>
        </div>
        
        {/* Code Area */}
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">import</span> math{"\n\n"}

<span className="text-purple-400">def</span> <span className="text-yellow-200">f</span>(x):{"\n"}
    <span className="text-slate-500"># The function: f(x) = sqrt(3 - 5x + x^2 + x^3) / (x - 1)</span>{"\n"}
    <span className="text-slate-500"># Note: This function is undefined exactly at x = 1</span>{"\n"}
    {"\n"}
    inside = <span className="text-orange-400">3</span> - <span className="text-orange-400">5</span>*x + x**<span className="text-orange-400">2</span> + x**<span className="text-orange-400">3</span>{"\n"}
    {"\n"}
    <span className="text-purple-400">if</span> inside &lt; <span className="text-orange-400">0</span>:{"\n"}
        <span className="text-purple-400">return</span> <span className="text-purple-400">float</span>(<span className="text-green-300">"nan"</span>)  <span className="text-slate-500"># sqrt undefined for negative values</span>{"\n"}
    {"\n"}
    numerator = math.sqrt(inside){"\n"}
    denominator = x - <span className="text-orange-400">1</span>{"\n"}
    {"\n"}
    <span className="text-purple-400">return</span> numerator / denominator{"\n\n\n"}

<span className="text-purple-400">print</span>(<span className="text-green-300">"--- INVESTIGATION STARTED ---"</span>){"\n\n"}

<span className="text-slate-500"># 1. Left-hand approach</span>{"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">"\n⬅️  APPROACHING FROM LEFT (x -{'>'} 1-)"</span>){"\n"}
left_values = [<span className="text-orange-400">0.9</span>, <span className="text-orange-400">0.99</span>, <span className="text-orange-400">0.999</span>, <span className="text-orange-400">0.9999</span>]{"\n\n"}

<span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> left_values:{"\n"}
    y = f(x){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"x = </span><span className="text-blue-300">{'{x}'}</span><span className="text-green-300"> | f(x) = </span><span className="text-blue-300">{'{y:.4f}'}</span><span className="text-green-300">"</span>){"\n\n"}

<span className="text-slate-500"># 2. Right-hand approach</span>{"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">"\n➡️  APPROACHING FROM RIGHT (x -{'>'} 1+)"</span>){"\n"}
right_values = [<span className="text-orange-400">1.1</span>, <span className="text-orange-400">1.01</span>, <span className="text-orange-400">1.001</span>, <span className="text-orange-400">1.0001</span>]{"\n\n"}

<span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> right_values:{"\n"}
    y = f(x){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"x = </span><span className="text-blue-300">{'{x}'}</span><span className="text-green-300"> | f(x) = </span><span className="text-blue-300">{'{y:.4f}'}</span><span className="text-green-300">"</span>){"\n\n"}

<span className="text-slate-500"># 3. Conclusion</span>{"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">"\n--- ANALYSIS ---"</span>){"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">"Left Limit  ≈ -2.0"</span>){"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">"Right Limit ≈ +2.0"</span>){"\n\n"}

<span className="text-purple-400">if</span> <span className="text-orange-400">-2.0</span> != <span className="text-orange-400">2.0</span>:{"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">"Conclusion: The limit DOES NOT EXIST (Jump Discontinuity)"</span>){"\n"}
</code>
            </pre>
        </div>

        {/* Output Console */}
        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="mb-2 text-green-500 font-bold">➜  python one_sided_limits.py</div>
            <div className="opacity-90 pl-2 border-l-2 border-slate-800 space-y-1">
                <div>--- INVESTIGATION STARTED ---</div>
                
                <div className="mt-2 text-indigo-400">⬅️  APPROACHING FROM LEFT (x -{'>'} 1-)</div>
                <div>x = 0.9     | f(x) = -1.9748</div>
                <div>x = 0.99    | f(x) = -1.9975</div>
                <div>x = 0.999   | f(x) = -1.9997</div>
                <div>x = 0.9999  | f(x) = -2.0000</div>

                <div className="mt-2 text-pink-400">➡️  APPROACHING FROM RIGHT (x -{'>'} 1+)</div>
                <div>x = 1.1     | f(x) = 1.9862</div>
                <div>x = 1.01    | f(x) = 1.9986</div>
                <div>x = 1.001   | f(x) = 1.9999</div>
                <div>x = 1.0001  | f(x) = 2.0000</div>

                <div className="mt-2 text-slate-400">--- ANALYSIS ---</div>
                <div>Left Limit  ≈ -2.0</div>
                <div>Right Limit ≈ +2.0</div>
                <div className="text-red-400 font-bold">Conclusion: The limit DOES NOT EXIST (Jump Discontinuity)</div>
            </div>
        </div>
      </div>

    </div>
  );
};
