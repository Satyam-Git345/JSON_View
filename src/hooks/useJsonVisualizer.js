import { useState, useCallback, useRef } from 'react';
import { createNodesFromJSON } from '../utils/nodeUtils';
import { downloadTreeAsImage } from '../utils/downloadUtils';

export const useJsonVisualizer = (initialJson) => {
  const [jsonInput, setJsonInput] = useState(initialJson);
  const [error, setError] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [searchPath, setSearchPath] = useState('$.user.address.city');
  const [searchMessage, setSearchMessage] = useState('');
  const [copyNotification, setCopyNotification] = useState('');
  const flowRef = useRef(null);

  const handleGenerateTree = useCallback((setNodes, setEdges) => {
    try {
      setError('');
      setSearchMessage('');
      
      const parsedJSON = JSON.parse(jsonInput);
      const { nodes: newNodes, edges: newEdges } = createNodesFromJSON(parsedJSON);
      
      setNodes(newNodes);
      setEdges(newEdges);
    } catch (e) {
      setError('Invalid JSON format. Please check your input.');
      setNodes([]);
      setEdges([]);
    }
  }, [jsonInput]);

  const handleSearch = useCallback((nodes, setNodes) => {
    if (!searchPath.trim()) {
      setSearchMessage('Please enter a search path');
      return;
    }

    const matchingNode = nodes.find(node => {
      const nodePath = node.data.path || '';
      return nodePath === searchPath || nodePath.includes(searchPath);
    });

    if (matchingNode) {
      const updatedNodes = nodes.map(node => {
        if (node.id === matchingNode.id) {
          return {
            ...node,
            style: {
              ...node.style,
              boxShadow: '0 0 0 3px #ff6b6b, 0 2px 8px rgba(0,0,0,0.15)'
            }
          };
        }
        return {
          ...node,
          style: {
            ...node.style,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }
        };
      });
      
      setNodes(updatedNodes);
      setSearchMessage('Match found!');
    } else {
      setSearchMessage('No match found');
    }
  }, [searchPath]);

  const handleNodeClick = useCallback((event, node) => {
    const path = node.data.path;
    if (path) {
      navigator.clipboard.writeText(path).then(() => {
        setCopyNotification(`Copied: ${path}`);
        setTimeout(() => setCopyNotification(''), 2000);
      }).catch(() => {
        setCopyNotification('Failed to copy');
        setTimeout(() => setCopyNotification(''), 2000);
      });
    }
  }, []);

  const handleClear = useCallback((setNodes, setEdges) => {
    setJsonInput('');
    setNodes([]);
    setEdges([]);
    setError('');
    setSearchMessage('');
    setSearchPath('');
    setCopyNotification('');
  }, []);

  const handleDownload = useCallback(() => {
    downloadTreeAsImage(flowRef, isDark);
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  return {
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
  };
};