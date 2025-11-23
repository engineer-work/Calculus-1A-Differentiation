


import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { LessonState } from '../types';
import { MotivationSimulators } from './LimitSimulators';
import { IntroLimitsQuiz } from './QuizGame';
import { MotivationQuiz } from './MotivationQuiz';
import { CodeLab } from './CodeLab';
import { MovingCloser } from './MovingCloser';
import { MovingCloserQuiz } from './MovingCloserQuiz';
import { MovingCloserCodeLab } from './MovingCloserCodeLab';
import { OneSidedLimits } from './OneSidedLimits';
import { OneSidedLimitsQuiz } from './OneSidedLimitsQuiz';
import { OneSidedLimitsCodeLab } from './OneSidedLimitsCodeLab';
import { LimitDefinitions } from './LimitDefinitions';
import { MoreLimitsVisual } from './MoreLimitsVisual';
import { MoreLimitsQuiz } from './MoreLimitsQuiz';
import { MoreLimitsCodeLab } from './MoreLimitsCodeLab';
import { PossibleLimitBehaviors } from './PossibleLimitBehaviors';
import { PossibleLimitBehaviorsQuiz } from './PossibleLimitBehaviorsQuiz';
import { PossibleLimitBehaviorsCodeLab } from './PossibleLimitBehaviorsCodeLab';
import { QuickLimitQuestionsVisual } from './QuickLimitQuestionsVisual';
import { QuickLimitQuestionsQuiz } from './QuickLimitQuestionsQuiz';
import { QuickLimitQuestionsCodeLab } from './QuickLimitQuestionsCodeLab';
import { TheOverallLimitVisual } from './TheOverallLimitVisual';
import { TheOverallLimitQuiz } from './TheOverallLimitQuiz';
import { TheOverallLimitCodeLab } from './TheOverallLimitCodeLab';
import { LimitDefinitionVisual } from './LimitDefinitionVisual';
import { LimitDefinitionQuiz } from './LimitDefinitionQuiz';
import { LimitDefinitionCodeLab } from './LimitDefinitionCodeLab';
import { LimitsFromGraphsVisual } from './LimitsFromGraphsVisual';
import { LimitsFromGraphsQuiz } from './LimitsFromGraphsQuiz';
import { LimitsFromGraphsCodeLab } from './LimitsFromGraphsCodeLab';
import { ReviewProblemsVisual } from './ReviewProblemsVisual';
import { ReviewProblemsQuiz } from './ReviewProblemsQuiz';
import { ReviewProblemsCodeLab } from './ReviewProblemsCodeLab';
import { LimitLawsVisual } from './LimitLawsVisual';
import { LimitLawsQuiz } from './LimitLawsQuiz';
import { LimitLawsCodeLab } from './LimitLawsCodeLab';
import { LimitLawsAdvancedVisual } from './LimitLawsAdvancedVisual';
import { LimitLawsAdvancedQuiz } from './LimitLawsAdvancedQuiz';
import { LimitLawsAdvancedCodeLab } from './LimitLawsAdvancedCodeLab';
import { SummaryVisual } from './SummaryVisual';
import { SummaryQuiz } from './SummaryQuiz';
import { SummaryCodeLab } from './SummaryCodeLab';
import { SelectionReader } from './TextToSpeech';

interface LessonViewProps {
  state: LessonState;
}

export const LessonView: React.FC<LessonViewProps> = ({ state }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz' | 'code'>('learn');

  // Reset tab when topic changes
  useEffect(() => {
    setActiveTab('learn');
  }, [state.topicId]);

  // Global MathJax Typeset Trigger
  useEffect(() => {
    if ((window as any).MathJax && (window as any).MathJax.typesetPromise) {
      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        (window as any).MathJax.typesetPromise().catch((err: any) => console.log('MathJax error:', err));
      }, 50);
    }
  }, [state.topicId, activeTab, state.content]);

  if (!state.topicId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
        <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6 animate-pulse">
           <span className="text-4xl">∫</span>
        </div>
        <h2 className="text-2xl font-semibold text-slate-700 mb-2">Welcome to CalcMaster 1A</h2>
        <p className="text-slate-500 max-w-md text-center">Select a topic from the sidebar to begin your differentiation journey.</p>
      </div>
    );
  }

  // Topics that have interactive tabs
  const interactiveTopics = [
    'limit-1', 'limit-3', 'limit-4', 'limit-6', 'limit-7', 'limit-8', 'limit-9', 
    'limit-10', 'limit-11', 'limit-12', 'limit-13', 'limit-14', 'limit-15'
  ];

  // Helper to render tabs
  const renderTabs = () => (
    <div className="px-8 border-b border-slate-100 bg-slate-50/50 flex gap-4 overflow-x-auto">
        <button 
            onClick={() => setActiveTab('learn')}
            className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'learn' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
            Visual Guide
        </button>
        {interactiveTopics.includes(state.topicId!) && (
            <>
                <button 
                    onClick={() => setActiveTab('quiz')}
                    className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'quiz' 
                        ? 'border-indigo-600 text-indigo-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
                >
                    Quiz Game
                </button>
                <button 
                    onClick={() => setActiveTab('code')}
                    className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'code' 
                        ? 'border-indigo-600 text-indigo-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                >
                    Python Lab
                </button>
            </>
        )}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden relative">
      
      {/* TTS Floating Reader - Global for LessonView */}
      <SelectionReader />

      {/* Header */}
      <header className="px-8 py-6 border-b border-slate-100 bg-white flex justify-between items-center sticky top-0 z-10 shrink-0">
        <div>
            <h2 className="text-3xl font-bold text-slate-800">{state.topicTitle}</h2>
            <p className="text-slate-500 text-sm mt-1">Calculus 1A &gt; Differentiation</p>
        </div>
      </header>

      {/* Render Tabs for specific topics */}
      {interactiveTopics.includes(state.topicId!) && renderTabs()}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 md:px-16 max-w-5xl mx-auto w-full">
        
        {state.imageUrl && activeTab === 'learn' && (
          <div className="mb-8 w-full h-64 rounded-xl overflow-hidden shadow-sm relative shrink-0">
             <img 
              src={state.imageUrl} 
              alt={state.topicTitle} 
              className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        )}

        {state.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {state.error}
            </div>
        )}

        {/* --- Topic 1: Motivation Content Logic --- */}
        {state.topicId === 'limit-1' ? (
          <div className="animate-fade-in">
            {activeTab === 'learn' && (
                <>
                    <MotivationSimulators />
                    {state.content && (
                         <details className="mt-10 border-t border-slate-200 pt-6">
                            <summary className="cursor-pointer text-slate-500 font-medium mb-4 hover:text-indigo-600 transition select-none">
                                Read Full Lecture Transcript
                            </summary>
                            <article className="markdown-body pb-20 text-sm text-slate-600">
                                <ReactMarkdown>{state.content}</ReactMarkdown>
                            </article>
                         </details>
                    )}
                </>
            )}
            {activeTab === 'quiz' && <MotivationQuiz />}
            {activeTab === 'code' && <CodeLab />}
          </div>
        ) : state.topicId === 'limit-3' ? (
            /* --- Topic 3: Moving Closer Logic --- */
            <div className="animate-fade-in">
                {activeTab === 'learn' && (
                    <>
                        <MovingCloser />
                        {state.content && (
                            <details className="mt-10 border-t border-slate-200 pt-6">
                                <summary className="cursor-pointer text-slate-500 font-medium mb-4 hover:text-indigo-600 transition select-none">
                                    Read Full Lecture Transcript
                                </summary>
                                <article className="markdown-body pb-20 text-sm text-slate-600">
                                    <ReactMarkdown>{state.content}</ReactMarkdown>
                                </article>
                            </details>
                        )}
                    </>
                )}
                {activeTab === 'quiz' && <MovingCloserQuiz />}
                {activeTab === 'code' && <MovingCloserCodeLab />}
            </div>
        ) : state.topicId === 'limit-4' ? (
            /* --- Topic 4: One-sided limits Logic --- */
            <div className="animate-fade-in">
                {activeTab === 'learn' && (
                    <>
                        <OneSidedLimits />
                        {state.content && (
                            <details className="mt-10 border-t border-slate-200 pt-6">
                                <summary className="cursor-pointer text-slate-500 font-medium mb-4 hover:text-indigo-600 transition select-none">
                                    Read Full Lecture Transcript
                                </summary>
                                <article className="markdown-body pb-20 text-sm text-slate-600">
                                    <ReactMarkdown>{state.content}</ReactMarkdown>
                                </article>
                            </details>
                        )}
                    </>
                )}
                {activeTab === 'quiz' && <OneSidedLimitsQuiz />}
                {activeTab === 'code' && <OneSidedLimitsCodeLab />}
            </div>
        ) : state.topicId === 'limit-5' ? (
           /* --- Topic 5: Definitions Logic --- */
           <div className="animate-fade-in">
             <LimitDefinitions />
           </div>
        ) : state.topicId === 'limit-6' ? (
           /* --- Topic 6: A few more limits Logic --- */
           <div className="animate-fade-in">
               {activeTab === 'learn' && <MoreLimitsVisual />}
               {activeTab === 'quiz' && <MoreLimitsQuiz />}
               {activeTab === 'code' && <MoreLimitsCodeLab />}
           </div>
        ) : state.topicId === 'limit-7' ? (
           /* --- Topic 7: Possible behaviors Logic --- */
           <div className="animate-fade-in">
               {activeTab === 'learn' && (
                   <>
                       <PossibleLimitBehaviors />
                       {state.content && (
                           <details className="mt-10 border-t border-slate-200 pt-6">
                               <summary className="cursor-pointer text-slate-500 font-medium mb-4 hover:text-indigo-600 transition select-none">
                                   Read Full Lecture Transcript
                               </summary>
                               <article className="markdown-body pb-20 text-sm text-slate-600">
                                   <ReactMarkdown>{state.content}</ReactMarkdown>
                                </article>
                           </details>
                       )}
                   </>
               )}
               {activeTab === 'quiz' && <PossibleLimitBehaviorsQuiz />}
               {activeTab === 'code' && <PossibleLimitBehaviorsCodeLab />}
           </div>
        ) : state.topicId === 'limit-8' ? (
           /* --- Topic 8: Quick Limit Questions Logic --- */
           <div className="animate-fade-in">
               {activeTab === 'learn' && <QuickLimitQuestionsVisual />}
               {activeTab === 'quiz' && <QuickLimitQuestionsQuiz />}
               {activeTab === 'code' && <QuickLimitQuestionsCodeLab />}
           </div>
        ) : state.topicId === 'limit-9' ? (
           /* --- Topic 9: The Overall Limit Logic --- */
           <div className="animate-fade-in">
               {activeTab === 'learn' && <TheOverallLimitVisual />}
               {activeTab === 'quiz' && <TheOverallLimitQuiz />}
               {activeTab === 'code' && <TheOverallLimitCodeLab />}
           </div>
        ) : state.topicId === 'limit-10' ? (
           /* --- Topic 10: Limit Definition Logic --- */
           <div className="animate-fade-in">
               {activeTab === 'learn' && (
                   <>
                       <LimitDefinitionVisual />
                       {state.content && (
                           <details className="mt-10 border-t border-slate-200 pt-6">
                               <summary className="cursor-pointer text-slate-500 font-medium mb-4 hover:text-indigo-600 transition select-none">
                                   Read Full Lecture Transcript
                               </summary>
                               <article className="markdown-body pb-20 text-sm text-slate-600">
                                   <ReactMarkdown>{state.content}</ReactMarkdown>
                                </article>
                           </details>
                       )}
                   </>
               )}
               {activeTab === 'quiz' && <LimitDefinitionQuiz />}
               {activeTab === 'code' && <LimitDefinitionCodeLab />}
           </div>
        ) : state.topicId === 'limit-11' ? (
           /* --- Topic 11: Limits from graphs Logic --- */
           <div className="animate-fade-in">
               {activeTab === 'learn' && (
                   <>
                       <LimitsFromGraphsVisual />
                       {state.content && (
                           <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
                               <h4 className="font-bold text-slate-700 mb-2">Practice Set</h4>
                               <p className="text-slate-600 text-sm mb-4">
                                   This section contains practice problems. Switch to the <strong>Quiz Game</strong> tab to solve the problems seen in the textbook!
                               </p>
                           </div>
                       )}
                   </>
               )}
               {activeTab === 'quiz' && <LimitsFromGraphsQuiz />}
               {activeTab === 'code' && <LimitsFromGraphsCodeLab />}
           </div>
        ) : state.topicId === 'limit-12' ? (
           /* --- Topic 12: Review Problems Logic --- */
           <div className="animate-fade-in">
               {activeTab === 'learn' && <ReviewProblemsVisual />}
               {activeTab === 'quiz' && <ReviewProblemsQuiz />}
               {activeTab === 'code' && <ReviewProblemsCodeLab />}
           </div>
        ) : state.topicId === 'limit-13' ? (
           /* --- Topic 13: Limit Laws Logic --- */
           <div className="animate-fade-in">
               {activeTab === 'learn' && (
                   <>
                       <LimitLawsVisual />
                       {state.content && (
                           <details className="mt-10 border-t border-slate-200 pt-6">
                               <summary className="cursor-pointer text-slate-500 font-medium mb-4 hover:text-indigo-600 transition select-none">
                                   Read Full Lecture Transcript
                               </summary>
                               <article className="markdown-body pb-20 text-sm text-slate-600">
                                   <ReactMarkdown>{state.content}</ReactMarkdown>
                                </article>
                           </details>
                       )}
                   </>
               )}
               {activeTab === 'quiz' && <LimitLawsQuiz />}
               {activeTab === 'code' && <LimitLawsCodeLab />}
           </div>
        ) : state.topicId === 'limit-14' ? (
           /* --- Topic 14: Limit Laws (Advanced) Logic --- */
           <div className="animate-fade-in">
               {activeTab === 'learn' && (
                   <>
                       <LimitLawsAdvancedVisual />
                       {state.content && (
                           <details className="mt-10 border-t border-slate-200 pt-6">
                               <summary className="cursor-pointer text-slate-500 font-medium mb-4 hover:text-indigo-600 transition select-none">
                                   Read Full Proof & Derivation
                               </summary>
                               <article className="markdown-body pb-20 text-sm text-slate-600">
                                   <ReactMarkdown>{state.content}</ReactMarkdown>
                                </article>
                           </details>
                       )}
                   </>
               )}
               {activeTab === 'quiz' && <LimitLawsAdvancedQuiz />}
               {activeTab === 'code' && <LimitLawsAdvancedCodeLab />}
           </div>
        ) : state.topicId === 'limit-15' ? (
           /* --- Topic 15: Summary Logic --- */
           <div className="animate-fade-in">
               {activeTab === 'learn' && (
                   <>
                       <SummaryVisual />
                       {state.content && (
                           <div className="mt-10 border-t border-slate-200 pt-6">
                               <article className="markdown-body pb-20 text-sm text-slate-600">
                                   <ReactMarkdown>{state.content}</ReactMarkdown>
                                </article>
                           </div>
                       )}
                   </>
               )}
               {activeTab === 'quiz' && <SummaryQuiz />}
               {activeTab === 'code' && <SummaryCodeLab />}
           </div>
        ) : (
          /* --- Default Behavior for other topics --- */
          <div className="animate-fade-in">
             {state.topicId === 'limit-2' && (
                <div className="mb-8">
                    <IntroLimitsQuiz />
                </div>
             )}

             {state.content ? (
               <article className="markdown-body pb-20">
                  <ReactMarkdown>{state.content}</ReactMarkdown>
               </article>
             ) : (
               <div className="text-center text-slate-400 mt-10">
                  <p>Content unavailable.</p>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};
