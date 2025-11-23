import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { CALCULUS_CURRICULUM } from './constants';
import { TopicNode, LessonState } from './types';

const App: React.FC = () => {
  const [lessonState, setLessonState] = useState<LessonState>({
    topicId: null,
    topicTitle: '',
    content: '',
    imageUrl: null,
    isLoading: false,
    error: null,
  });

  // Handle topic selection from Sidebar
  const handleTopicSelect = useCallback((node: TopicNode) => {
    // Update state immediately to show static content
    setLessonState(prev => {
      if (prev.topicId === node.id) return prev; // No change if same topic

      return {
        topicId: node.id,
        topicTitle: node.title,
        imageUrl: node.imageUrl || null,
        content: node.content || '', 
        isLoading: false,
        error: null
      };
    });
  }, []);

  return (
    <div className="flex h-screen w-screen bg-slate-100 font-sans overflow-hidden">
      {/* Left Panel: Navigation */}
      <Sidebar 
        data={CALCULUS_CURRICULUM} 
        selectedId={lessonState.topicId} 
        onSelect={handleTopicSelect} 
      />

      {/* Right Panel: Content */}
      <main className="flex-1 h-full min-w-0 relative">
        <LessonView 
            state={lessonState} 
        />
      </main>
    </div>
  );
};

export default App;