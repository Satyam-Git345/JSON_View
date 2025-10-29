export const JsonInputPanel = ({ 
  jsonInput, 
  onJsonChange, 
  error, 
  isDark, 
  isMobile,
  onGenerateTree,
  onClear 
}) => {
  return (
    <div style={{ 
      flex: isMobile ? '0 0 auto' : '0 0 420px', 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: 0,
      maxHeight: isMobile ? '40%' : 'none'
    }}>
      <label style={{
        fontSize: isMobile ? '13px' : '15px',
        color: isDark ? '#bbb' : '#666',
        marginBottom: '12px',
        fontWeight: '500'
      }}>
        Paste or type JSON data
      </label>
      
      <textarea
        value={jsonInput}
        onChange={(e) => onJsonChange(e.target.value)}
        style={{
          flex: 1,
          padding: isMobile ? '12px' : '16px',
          fontSize: isMobile ? '11px' : '13px',
          fontFamily: '"Courier New", monospace',
          border: `1px solid ${isDark ? '#444' : '#d8d8d8'}`,
          borderRadius: '10px',
          resize: 'none',
          background: isDark ? '#1a1a1a' : '#fafafa',
          color: isDark ? '#e0e0e0' : '#2a2a2a',
          lineHeight: '1.6',
          outline: 'none',
          boxSizing: 'border-box',
          minHeight: isMobile ? '150px' : '0'
        }}
      />
      
      {/* Error message */}
      {error && (
        <div style={{
          color: '#e74c3c',
          fontSize: isMobile ? '11px' : '13px',
          marginTop: '10px',
          fontWeight: '500'
        }}>
          {error}
        </div>
      )}
      
      {/* Action buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginTop: '16px',
        flexWrap: isMobile ? 'wrap' : 'nowrap'
      }}>
        <button
          onClick={onGenerateTree}
          style={{
            flex: 1,
            padding: isMobile ? '10px' : '14px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: isMobile ? '13px' : '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
            transition: 'transform 0.1s',
            minWidth: isMobile ? '100%' : '0'
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          Generate Tree
        </button>
        
        <button
          onClick={onClear}
          style={{
            flex: 1,
            padding: isMobile ? '10px' : '14px',
            background: isDark ? '#444' : '#e5e7eb',
            color: isDark ? '#e0e0e0' : '#374151',
            border: 'none',
            borderRadius: '10px',
            fontSize: isMobile ? '13px' : '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.1s',
            minWidth: isMobile ? '100%' : '0'
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          Clear/Reset
        </button>
      </div>
    </div>
  );
};