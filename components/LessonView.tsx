
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { LessonState } from '../types';
import * as Limits from './introductionToLimitComponent';
import { SelectionReader } from './TextToSpeech';

interface LessonViewProps {
  state: LessonState;
}

// Map topic IDs to their respective components
const COMPONENT_MAP: Record<string, {
  Visual?: React.ComponentType<any>;
  Quiz?: React.ComponentType<any>;
  Code?: React.ComponentType<any>;
}> = {
  'limit-1': { Visual: Limits.MotivationSimulators, Quiz: Limits.MotivationQuiz, Code: Limits.CodeLab },
  'limit-3': { Visual: Limits.MovingCloser, Quiz: Limits.MovingCloserQuiz, Code: Limits.MovingCloserCodeLab },
  'limit-4': { Visual: Limits.OneSidedLimits, Quiz: Limits.OneSidedLimitsQuiz, Code: Limits.OneSidedLimitsCodeLab },
  'limit-5': { Visual: Limits.LimitDefinitions }, // Visualization only, no tabs
  'limit-6': { Visual: Limits.MoreLimitsVisual, Quiz: Limits.MoreLimitsQuiz, Code: Limits.MoreLimitsCodeLab },
  'limit-7': { Visual: Limits.PossibleLimitBehaviors, Quiz: Limits.PossibleLimitBehaviorsQuiz, Code: Limits.PossibleLimitBehaviorsCodeLab },
  'limit-8': { Visual: Limits.QuickLimitQuestionsVisual, Quiz: Limits.QuickLimitQuestionsQuiz, Code: Limits.QuickLimitQuestionsCodeLab },
  'limit-9': { Visual: Limits.TheOverallLimitVisual, Quiz: Limits.TheOverallLimitQuiz, Code: Limits.TheOverallLimitCodeLab },
  'limit-10': { Visual: Limits.LimitDefinitionVisual, Quiz: Limits.LimitDefinitionQuiz, Code: Limits.LimitDefinitionCodeLab },
  'limit-11': { Visual: Limits.LimitsFromGraphsVisual, Quiz: Limits.LimitsFromGraphsQuiz, Code: Limits.LimitsFromGraphsCodeLab },
  'limit-12': { Visual: Limits.ReviewProblemsVisual, Quiz: Limits.ReviewProblemsQuiz, Code: Limits.ReviewProblemsCodeLab },
  'limit-13': { Visual: Limits.LimitLawsVisual, Quiz: Limits.LimitLawsQuiz, Code: Limits.LimitLawsCodeLab },
  'limit-14': { Visual: Limits.LimitLawsAdvancedVisual, Quiz: Limits.LimitLawsAdvancedQuiz, Code: Limits.LimitLawsAdvancedCodeLab },
  'limit-15': { Visual: Limits.SummaryVisual, Quiz: Limits.SummaryQuiz, Code: Limits.SummaryCodeLab },
};

export const LessonView: React.FC<LessonViewProps> = ({ state }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz' | 'code'>('learn');

  // Reset tab when topic changes
  useEffect(() => {
    setActiveTab('learn');
  }, [state.topicId]);

  // Global MathJax Typeset Trigger
  useEffect(() => {
    if ((window as any).MathJax && (window as any).MathJax.typesetPromise) {
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

  // Determine active components
  const components = COMPONENT_MAP[state.topicId];
  const hasTabs = components && (components.Quiz || components.Code);

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
        {components?.Quiz && (
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
        )}
        {components?.Code && (
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

      {/* Render Tabs if applicable */}
      {hasTabs && renderTabs()}

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

        {/* Special case for Intro to Limits (limit-2) which doesn't follow standard tab structure */}
        {state.topicId === 'limit-2' && (
            <div className="mb-8 animate-fade-in">
                <Limits.IntroLimitsQuiz />
            </div>
        )}

        {/* Dynamic Component Rendering */}
        {components ? (
            <div className="animate-fade-in">
                {activeTab === 'learn' && components.Visual && (
                    <>
                        <components.Visual />
                        {state.content && (
                            <details className="mt-10 border-t border-slate-200 pt-6" open={!components.Quiz && !components.Code}>
                                <summary className="cursor-pointer text-slate-500 font-medium mb-4 hover:text-indigo-600 transition select-none">
                                    {components.Quiz ? "Read Full Lecture Transcript" : "Lesson Content"}
                                </summary>
                                <article className="markdown-body pb-20 text-sm text-slate-600">
                                    <ReactMarkdown>{state.content}</ReactMarkdown>
                                </article>
                            </details>
                        )}
                    </>
                )}
                {activeTab === 'quiz' && components.Quiz && <components.Quiz />}
                {activeTab === 'code' && components.Code && <components.Code />}
            </div>
        ) : (
            /* Fallback for text-only topics */
            <div className="animate-fade-in">
                {state.content ? (
                    <article className="markdown-body pb-20">
                        <ReactMarkdown>{state.content}</ReactMarkdown>
                    </article>
                ) : (
                    <div className="text-center text-slate-400 mt-10">
                        <p>Select a topic to load content.</p>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};
