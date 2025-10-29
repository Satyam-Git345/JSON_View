import { createNodeLabel } from "../components/CreateNodeLabel";

export const getNodeColor = (type) => {
  if (type === 'object') return '#6b7fd7'; // Blue-purple for objects
  if (type === 'array') return '#5eb895'; // Teal-green for arrays
  return '#e8b44f'; // Yellow-orange for primitives
};



export const createNodesFromJSON = (data) => {
  const nodeList = [];
  const edgeList = [];
  let nodeCounter = 0;

  // Tree layout configuration
  const horizontalSpacing = 180; // Space between columns
  const verticalSpacing = 90; // Space between nodes vertically
  
  // Track positions for each level
  const levelCounters = {};

  // Recursive function to process each JSON element
  const processNode = (value, currentKey, parent, level, currentPath) => {
    const nodeId = `node-${nodeCounter++}`;
    
    // Initialize level counter
    if (!levelCounters[level]) {
      levelCounters[level] = 0;
    }
    
    // Determine node type
    let nodeType = 'primitive';
    let label = currentKey;
    let displayValue = '';

    if (value === null) {
      displayValue = 'null';
      nodeType = 'primitive';
    } else if (Array.isArray(value)) {
      nodeType = 'array';
      label = currentKey;
    } else if (typeof value === 'object') {
      nodeType = 'object';
      label = currentKey;
    } else {
      // For primitive values, show both key and value
      nodeType = 'primitive';
      displayValue = String(value);
      if (displayValue.length > 15) {
        displayValue = displayValue.substring(0, 15) + '...';
      }
    }

    // Calculate position
    const xPos = level * horizontalSpacing;
    const yPos = levelCounters[level] * verticalSpacing;
    levelCounters[level]++;

    // Create the node with styling that matches reference
    nodeList.push({
      id: nodeId,
      data: { 
        label: createNodeLabel(label, displayValue, nodeType),
        rawLabel: label,
        value: displayValue,
        fullValue: value,
        path: currentPath,
        type: nodeType
      },
      position: { x: xPos, y: yPos },
      style: {
        background: getNodeColor(nodeType),
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 18px',
        fontSize: '13px',
        fontWeight: '500',
        minWidth: '70px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        cursor: 'pointer'
      }
    });

    // Create edge from parent to current node
    if (parent) {
      edgeList.push({
        id: `edge-${parent}-${nodeId}`,
        source: parent,
        target: nodeId,
        type: 'smoothstep',
        style: { stroke: '#a0a0a0', strokeWidth: 2 },
        animated: false
      });
    }

    // Process children
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        processNode(item, index, nodeId, level + 1, `${currentPath}[${index}]`);
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.keys(value).forEach(k => {
        processNode(value[k], k, nodeId, level + 1, `${currentPath}.${k}`);
      });
    }

    return nodeId;
  };

  // Start processing from root
  processNode(data, 'root', null, 0, '$');

  return { nodes: nodeList, edges: edgeList };
};
