
import React from 'react';

export const LimitLawsAdvancedCodeLab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">💻 Error Term Analysis</h3>
          <p className="text-slate-700">
              Let's write a Python script to verify the formula: 
              <code> f(x)g(x) = LM + (ε₁M + ε₂L + ε₁ε₂) </code>
              We will see how quickly the error terms vanish compared to the main limit.
          </p>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 font-mono text-sm">error_propagation.py</span>
            <span className="text-xs text-emerald-400 uppercase font-bold tracking-wider">Proof Verification</span>
        </div>
        
        <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
<code>
<span className="text-purple-400">def</span> <span className="text-yellow-200">analyze_product_limit</span>(epsilon):{"\n"}
    <span className="text-slate-500"># Let's define our known limits</span>{"\n"}
    L = <span className="text-orange-400">10.0</span>{"\n"}
    M = <span className="text-orange-400">5.0</span>{"\n\n"}

    <span className="text-slate-500"># Assume f(x) is close to L by epsilon, g(x) close to M by epsilon</span>{"\n"}
    e1 = epsilon{"\n"}
    e2 = epsilon{"\n\n"}

    <span className="text-slate-500"># 1. The "Pure" Limit part</span>{"\n"}
    pure_limit = L * M{"\n\n"}

    <span className="text-slate-500"># 2. The Error Terms from our formula</span>{"\n"}
    term_1 = e1 * M      <span className="text-slate-500"># First rectangular strip</span>{"\n"}
    term_2 = e2 * L      <span className="text-slate-500"># Second rectangular strip</span>{"\n"}
    term_3 = e1 * e2     <span className="text-slate-500"># The tiny corner piece</span>{"\n"}
    
    total_error = term_1 + term_2 + term_3{"\n"}
    
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"--- Epsilon = </span><span className="text-blue-300">{'{epsilon:.4f}'}</span><span className="text-green-300"> ---"</span>){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"Ideal Limit (LM):   </span><span className="text-blue-300">{'{pure_limit:.4f}'}</span><span className="text-green-300">"</span>){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"Error Terms Sum:    </span><span className="text-blue-300">{'{total_error:.6f}'}</span><span className="text-green-300">"</span>){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"  -{'>'} e1*M: </span><span className="text-blue-300">{'{term_1:.6f}'}</span><span className="text-green-300">"</span>){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"  -{'>'} e2*L: </span><span className="text-blue-300">{'{term_2:.6f}'}</span><span className="text-green-300">"</span>){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">f"  -{'>'} e1*e2: </span><span className="text-blue-300">{'{term_3:.8f}'}</span><span className="text-green-300">  (Tiny!)"</span>){"\n"}
    <span className="text-purple-400">print</span>(<span className="text-green-300">""</span>){"\n\n"}

<span className="text-slate-500"># Shrink the error...</span>{"\n"}
analyze_product_limit(<span className="text-orange-400">0.1</span>){"\n"}
analyze_product_limit(<span className="text-orange-400">0.01</span>){"\n"}
analyze_product_limit(<span className="text-orange-400">0.001</span>){"\n"}
</code>
            </pre>
        </div>

        <div className="bg-black p-4 font-mono text-xs border-t border-slate-700 text-slate-300">
            <div className="text-indigo-400 mb-1">➜ python error_propagation.py</div>
            <div className="pl-2 border-l-2 border-slate-800 opacity-80">
                --- Epsilon = 0.1000 ---<br/>
                Ideal Limit (LM):   50.0000<br/>
                Error Terms Sum:    1.510000<br/>
                  -{'>'} e1*M: 0.500000<br/>
                  -{'>'} e2*L: 1.000000<br/>
                  -{'>'} e1*e2: 0.01000000  (Tiny!)<br/>
                <br/>
                --- Epsilon = 0.0100 ---<br/>
                Ideal Limit (LM):   50.0000<br/>
                Error Terms Sum:    0.150100<br/>
                  -{'>'} e1*M: 0.050000<br/>
                  -{'>'} e2*L: 0.100000<br/>
                  -{'>'} e1*e2: 0.00010000  (Tiny!)<br/>
                <br/>
                --- Epsilon = 0.0010 ---<br/>
                Ideal Limit (LM):   50.0000<br/>
                Error Terms Sum:    0.015001<br/>
                  -{'>'} e1*M: 0.005000<br/>
                  -{'>'} e2*L: 0.010000<br/>
                  -{'>'} e1*e2: 0.00000100  (Tiny!)<br/>
            </div>
        </div>
      </div>

    </div>
  );
};
