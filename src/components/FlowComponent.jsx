import React, { useState, useEffect } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';
import { CopyNotification } from './CopyNotification';
import { Header } from './Header';
import { JsonInputPanel } from './JsonInputPanel';
import { SearchPanel } from './SearchPanel';
import { TreeVisualization } from './TreeVisualization';
import { useJsonVisualizer } from '../hooks/useJsonVisualizer';
import { sampleJSON } from '../constants';

export function FlowComponent() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const {
    jsonInput,
    setJsonInput,
    error,
    isDark,
    searchPath,
    setSearchPath,
    searchMessage,
    copyNotification,
    flowRef,
    handleGenerateTree,
    handleSearch,
    handleNodeClick,
    handleClear,
    handleDownload,
    toggleTheme
  } = useJsonVisualizer(sampleJSON);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: isMobile ? '10px' : '40px 60px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <CopyNotification message={copyNotification} />

      <div style={{
        background: isDark ? '#2d2d2d' : 'white',
        borderRadius: '16px',
        padding: isMobile ? '15px' : '40px',
        height: '100%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <Header 
          isDark={isDark} 
          isMobile={isMobile} 
          onToggleTheme={toggleTheme} 
        />

        <div style={{
          display: 'flex',
          gap: isMobile ? '15px' : '30px',
          flex: 1,
          minHeight: 0,
          flexDirection: isMobile ? 'column' : 'row',
          overflow: 'hidden'
        }}>
          <JsonInputPanel
            jsonInput={jsonInput}
            onJsonChange={setJsonInput}
            error={error}
            isDark={isDark}
            isMobile={isMobile}
            onGenerateTree={() => handleGenerateTree(setNodes, setEdges)}
            onClear={() => handleClear(setNodes, setEdges)}
          />

          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: 0,
            overflow: 'hidden'
          }}>
            <SearchPanel
              searchPath={searchPath}
              onSearchPathChange={setSearchPath}
              onSearch={() => handleSearch(nodes, setNodes)}
              searchMessage={searchMessage}
              isDark={isDark}
              isMobile={isMobile}
              nodesLength={nodes.length}
              onDownload={handleDownload}
            />

            <TreeVisualization
              flowRef={flowRef}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={handleNodeClick}
              isDark={isDark}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}