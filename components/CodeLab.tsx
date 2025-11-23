import React from 'react';

export const CodeLab: React.FC = () => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto animate-fade-in">
      
      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
            <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-slate-400 font-mono text-sm">derivative.py</span>
            <div className="flex-1"></div>
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Python</span>
        </div>
        
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">def</span> <span className="text-yellow-200">f</span>(x):{"\n"}
    <span className="text-slate-500"># The function from our simulator: 0.1x^3 ...</span>{"\n"}
    <span className="text-purple-400">return</span> <span className="text-orange-400">0.1</span> * x**<span className="text-orange-400">3</span> - <span className="text-orange-400">0.2</span> * x**<span className="text-orange-400">2</span> - <span className="text-orange-400">0.5</span> * x + <span className="text-orange-400">2.5</span>{"\n\n"}

<span className="text-purple-400">def</span> <span className="text-yellow-200">difference_quotient</span>(f, x, h):{"\n"}
    <span className="text-slate-500"># Slope of Secant Line (Rise / Run)</span>{"\n"}
    <span className="text-purple-400">return</span> (f(x + h) - f(x)) / h{"\n\n"}

<span className="text-slate-500"># Calculate slope as h approaches 0 (Limit)</span>{"\n"}
x_point = <span className="text-orange-400">1.0</span>{"\n"}
<span className="text-purple-400">print</span>(<span className="text-green-300">f"Approximating derivative at x=</span><span className="text-blue-300">{'{x_point}'}</span><span className="text-green-300">"</span>){"\n\n"}

<span className="text-purple-400">for</span> h <span className="text-purple-400">in</span> [<span className="text-orange-400">1.0</span>, <span className="text-orange-400">0.1</span>, <span className="text-orange-400">0.01</span>, <span className="text-orange-400">0.0001</span>]:{"\n"}
    slope = difference_quotient(f, x_point, h){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"h=</span><span className="text-blue-300">{'{h:'}<span className="text-orange-400">.4</span>f{'}'}</span><span className="text-green-300"> | Slope = </span><span className="text-blue-300">{'{slope:'}<span className="text-orange-400">.5</span>f{'}'}</span><span className="text-green-300">"</span>){"\n"}
</code>
            </pre>
        </div>

        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="mb-1 text-green-500 font-bold">➜  Running python derivative.py</div>
            <div className="opacity-90 pl-2 border-l-2 border-slate-800">
                Approximating derivative at x=1.0<br/>
                h=1.0000 | Slope = -0.10000<br/>
                h=0.1000 | Slope = -0.57900<br/>
                h=0.0100 | Slope = -0.59799<br/>
                h=0.0001 | Slope = -0.60000<br/>
            </div>
            <div className="mt-3 text-blue-400 italic"># Conclusion: The derivative is -0.6</div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
            <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-slate-400 font-mono text-sm">integral.py</span>
            <div className="flex-1"></div>
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Python</span>
        </div>
        
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">import</span> numpy <span className="text-purple-400">as</span> np{"\n\n"}

<span className="text-purple-400">def</span> <span className="text-yellow-200">riemann_sum</span>(f, a, b, n):{"\n"}
    <span className="text-slate-500"># Width of each rectangle</span>{"\n"}
    dx = (b - a) / n{"\n"}
    {"\n"}
    <span className="text-slate-500"># Generate x-coordinates for left corners</span>{"\n"}
    x = np.linspace(a, b - dx, n){"\n"}
    {"\n"}
    <span className="text-slate-500"># Sum of areas (height * width)</span>{"\n"}
    total_area = np.sum(f(x) * dx){"\n"}
    <span className="text-purple-400">return</span> total_area{"\n\n"}

<span className="text-slate-500"># Calculate area under sin(x)+2 from 0 to 5</span>{"\n"}
<span className="text-purple-400">def</span> <span className="text-yellow-200">g</span>(x):{"\n"}
    <span className="text-purple-400">return</span> np.sin(x * <span className="text-orange-400">0.8</span>) + <span className="text-orange-400">1.5</span>{"\n\n"}

<span className="text-purple-400">print</span>(<span className="text-green-300">"Approximating Integral (Area)..."</span>){"\n"}
<span className="text-purple-400">for</span> n <span className="text-purple-400">in</span> [<span className="text-orange-400">4</span>, <span className="text-orange-400">10</span>, <span className="text-orange-400">100</span>, <span className="text-orange-400">10000</span>]:{"\n"}
    area = riemann_sum(g, <span className="text-orange-400">0</span>, <span className="text-orange-400">5</span>, n){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"Rectangles: </span><span className="text-blue-300">{'{n}'}</span><span className="text-green-300"> | Approx Area: </span><span className="text-blue-300">{'{area:'}<span className="text-orange-400">.5</span>f{'}'}</span><span className="text-green-300">"</span>){"\n"}
</code>
            </pre>
        </div>

        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="mb-1 text-green-500 font-bold">➜  Running python integral.py</div>
            <div className="opacity-90 pl-2 border-l-2 border-slate-800">
                Approximating Integral (Area)...<br/>
                Rectangles: 4 | Approx Area: 8.75599<br/>
                Rectangles: 10 | Approx Area: 9.35232<br/>
                Rectangles: 100 | Approx Area: 9.59093<br/>
                Rectangles: 10000 | Approx Area: 9.60928<br/>
            </div>
        </div>
      </div>

    </div>
  );
};