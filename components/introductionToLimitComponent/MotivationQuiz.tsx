
import React, { useState } from 'react';

export const MotivationQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const questions = [
    {
      question: "In our 'Magic Slope' simulator, what happens as the Pink Dot (B) gets closer to the Blue Dot (A)?",
      options: [
        "The line disappears completely",
        "The Secant Line becomes the Tangent Line",
        "The line becomes a circle",
        "The slope becomes zero"
      ],
      correct: 1,
      explanation: "Exactly! As the two points merge into one, the 'cutting' line (Secant) becomes the 'touching' line (Tangent). This is the Derivative!"
    },
    {
      question: "Why do we use rectangles to measure the area under a curvy graph?",
      options: [
        "Because curves are impossible to measure directly",
        "Because rectangles are easier to calculate (width × height)",
        "Because rectangles are prettier",
        "We shouldn't use rectangles"
      ],
      correct: 1,
      explanation: "Right! We know how to find the area of a rectangle easily. By using many tiny rectangles, we can approximate the difficult curvy area."
    },
    {
      question: "What is the 'Derivative' really measuring?",
      options: [
        "The total area",
        "The average value",
        "The instantaneous rate of change (steepness)",
        "The length of the curve"
      ],
      correct: 2,
      explanation: "Spot on. The derivative tells us exactly how steep the function is at a single specific moment."
    }
  ];

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // Prevent multiple guesses

    setSelectedOption(index);
    const correct = index === questions[currentQuestion].correct;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  if (showResult) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-10 text-center animate-fade-in">
        <div className="text-6xl mb-4">
            {score === questions.length ? "🏆" : "🎯"}
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
        <p className="text-slate-600 text-lg mb-6">
          You scored <span className="font-bold text-indigo-600">{score}</span> out of {questions.length}
        </p>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-8 text-left max-w-md mx-auto">
            <p className="font-medium text-slate-700 mb-2">Key Takeaways:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                <li>Derivative = Slope of Tangent Line</li>
                <li>Integral = Area under curve (limit of sums)</li>
                <li>Limits connect the two concepts!</li>
            </ul>
        </div>
        <button 
          onClick={restart}
          className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden max-w-3xl mx-auto">
      <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span>⚡</span> Knowledge Check
        </h3>
        <div className="text-sm font-medium bg-indigo-500 px-3 py-1 rounded-full">
          Question {currentQuestion + 1} / {questions.length}
        </div>
      </div>

      <div className="p-8">
        <h4 className="text-xl font-medium text-slate-800 mb-8 leading-relaxed">
          {q.question}
        </h4>

        <div className="grid gap-4">
          {q.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={selectedOption !== null}
              className={`
                w-full text-left p-4 rounded-xl border-2 transition-all duration-200 relative
                ${selectedOption === null 
                  ? 'border-slate-100 bg-slate-50 hover:border-indigo-200 hover:bg-indigo-50' 
                  : selectedOption === index 
                    ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                    : 'border-slate-100 bg-slate-50 opacity-50'
                }
              `}
            >
              <span className={`font-bold mr-3 ${selectedOption === index ? 'text-slate-900' : 'text-slate-400'}`}>
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="text-slate-700 font-medium">{option}</span>
              
              {selectedOption === index && (
                <span className="absolute right-4 top-4 text-xl">
                  {isCorrect ? '✅' : '❌'}
                </span>
              )}
            </button>
          ))}
        </div>

        {selectedOption !== null && (
          <div className={`mt-6 p-4 rounded-lg border ${isCorrect ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'} animate-fade-in`}>
            <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
               {isCorrect ? "Correct!" : "Not quite."}
            </p>
            <p className="text-slate-700 mt-1 text-sm">{q.explanation}</p>
            
            <div className="mt-4 text-right">
                <button 
                    onClick={nextQuestion}
                    className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition"
                >
                    {currentQuestion < questions.length - 1 ? "Next Question →" : "Finish Quiz"}
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
