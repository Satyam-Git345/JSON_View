export const SearchPanel = ({ 
  searchPath, 
  onSearchPathChange, 
  onSearch, 
  searchMessage,
  isDark,
  isMobile,
  nodesLength,
  onDownload
}) => {
  return (
    <div style={{ marginBottom: '16px', flexShrink: 0 }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: isMobile ? 'wrap' : 'nowrap', marginBottom: '12px' }}>
        <input
          type="text"
          value={searchPath}
          onChange={(e) => onSearchPathChange(e.target.value)}
          placeholder="$.user.address.city"
          style={{
            flex: 1,
            padding: isMobile ? '10px 12px' : '12px 16px',
            fontSize: isMobile ? '12px' : '14px',
            border: `1px solid ${isDark ? '#444' : '#d8d8d8'}`,
            borderRadius: '10px',
            background: isDark ? '#1a1a1a' : 'white',
            color: isDark ? '#e0e0e0' : '#2a2a2a',
            outline: 'none',
            boxSizing: 'border-box',
            minWidth: isMobile ? '100%' : '0'
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
        />
        <button
          onClick={onSearch}
          style={{
            padding: isMobile ? '10px 20px' : '12px 32px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: isMobile ? '13px' : '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
            transition: 'transform 0.1s',
            width: isMobile ? '100%' : 'auto'
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          Search
        </button>
      </div>
      
      {/* Download button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>  
        <button
          onClick={onDownload}
          disabled={nodesLength === 0}
          style={{
            padding: isMobile ? '8px 16px' : '10px 24px',
            background: nodesLength === 0 ? (isDark ? '#333' : '#d1d5db') : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: '600',
            cursor: nodesLength === 0 ? 'not-allowed' : 'pointer',
            boxShadow: nodesLength === 0 ? 'none' : '0 2px 8px rgba(16,185,129,0.3)',
            transition: 'transform 0.1s',
            opacity: nodesLength === 0 ? 0.5 : 1
          }}
          onMouseDown={(e) => {
            if (nodesLength > 0) e.target.style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            if (nodesLength > 0) e.target.style.transform = 'scale(1)';
          }}
        >
          Download JSON Image
        </button>
      </div>
      
      {/* Search result message */}
      {searchMessage && (
        <div style={{
          fontSize: isMobile ? '11px' : '13px',
          marginTop: '8px',
          fontWeight: '500',
          color: searchMessage.includes('found!') ? '#10b981' : '#ef4444'
        }}>
          {searchMessage}
        </div>
      )}
    </div>
  );
};