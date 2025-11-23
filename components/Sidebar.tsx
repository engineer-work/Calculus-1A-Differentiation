
import React, { useState, useEffect } from 'react';
import { TopicNode } from '../types';

interface SidebarItemProps {
  node: TopicNode;
  depth?: number;
  selectedId: string | null;
  onSelect: (node: TopicNode) => void;
  expandedIds: Set<string>;
  toggleExpand: (id: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ node, depth = 0, selectedId, onSelect, expandedIds, toggleExpand }) => {
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;
  const isExpanded = expandedIds.has(node.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      toggleExpand(node.id);
    }
  };

  const handleSelect = () => {
      if (!hasChildren) {
          onSelect(node);
      } else {
          toggleExpand(node.id);
      }
  }

  return (
    <div className="select-none">
      <div
        onClick={handleSelect}
        className={`
          flex items-center justify-between p-3 cursor-pointer transition-all duration-200 border-b border-slate-800/50
          ${isSelected ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-300'}
        `}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        <span className={`text-sm mr-2 whitespace-normal leading-snug ${isSelected ? 'font-bold' : 'font-medium'}`}>
            {node.title}
        </span>
        
        {hasChildren && (
          <button
            onClick={handleToggle}
            className={`
                w-6 h-6 shrink-0 flex items-center justify-center rounded text-xs font-bold leading-none border
                ${isSelected 
                    ? 'bg-indigo-500 border-indigo-400 text-white hover:bg-indigo-400' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
                }
            `}
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="bg-black/20 shadow-inner">
          {node.children!.map((child) => (
            <SidebarItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              expandedIds={expandedIds}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  data: TopicNode[];
  selectedId: string | null;
  onSelect: (node: TopicNode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ data, selectedId, onSelect }) => {
  // Persistence Logic
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('calcMaster_sidebarExpanded');
      return saved ? new Set(JSON.parse(saved)) : new Set(['unit-0-limits']); // Default expand Unit 0 Limits
    } catch (e) {
      return new Set(['unit-0-limits']);
    }
  });

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedIds(newSet);
    try {
      localStorage.setItem('calcMaster_sidebarExpanded', JSON.stringify(Array.from(newSet)));
    } catch (e) {
      console.warn("Failed to save sidebar state", e);
    }
  };

  return (
    <div className="w-80 bg-slate-900 h-full flex flex-col border-r border-slate-800 shadow-xl z-10">
      <div className="p-6 border-b border-slate-800 bg-slate-900 z-20 sticky top-0 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
             Calculus 1A
        </h1>
        <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider font-semibold">
            <span>Differentiation</span>
            <span className="bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded">1A</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-10 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        {data.map((node) => (
          <SidebarItem
            key={node.id}
            node={node}
            selectedId={selectedId}
            onSelect={onSelect}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-slate-800 text-[10px] text-slate-600 text-center font-mono">
        Learn, Understand, Practise, Test        
      </div>
    </div>
  );
};
