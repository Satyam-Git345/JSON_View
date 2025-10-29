import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';

export const TreeVisualization = ({ 
  flowRef,
  nodes, 
  edges, 
  onNodesChange, 
  onEdgesChange,
  onNodeClick,
  isDark,
  isMobile
}) => {
  return (
    <div 
      ref={flowRef}
      style={{
        flex: 1,
        background: isDark ? '#1a1a1a' : '#f8f9fa',
        borderRadius: '12px',
        border: `1px solid ${isDark ? '#444' : '#e0e0e0'}`,
        overflow: 'hidden',
        minHeight: isMobile ? '300px' : '0'
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={2}
      >
        <Background 
          color={isDark ? '#333' : '#ddd'} 
          gap={16}
          size={1}
        />
        <Controls 
          style={{
            background: isDark ? '#2d2d2d' : 'white',
            border: `1px solid ${isDark ? '#444' : '#ddd'}`,
            borderRadius: '8px'
          }}
        />
      </ReactFlow>
    </div>
  );
};