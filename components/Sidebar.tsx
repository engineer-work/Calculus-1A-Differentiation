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
    } else {
      onSelect(node);
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
          flex items-center justify-between p-3 cursor-pointer transition-colors duration-200 border-b border-slate-800/50
          ${isSelected ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-300'}
        `}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        <span className="font-medium text-sm mr-2 whitespace-normal leading-snug">{node.title}</span>
        
        {hasChildren && (
          <button
            onClick={handleToggle}
            className="w-6 h-6 shrink-0 flex items-center justify-center rounded hover:bg-white/10 text-lg font-bold leading-none"
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="bg-slate-900/50">
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
      <div className="p-6 border-b border-slate-800 bg-slate-900 z-20 sticky top-0">
        <h1 className="text-xl font-bold text-white tracking-tight">Calculus 1A</h1>
        <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Differentiation</p>
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
      
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        Powered by Gemini
      </div>
    </div>
  );
};
