export const Header = ({ isDark, isMobile, onToggleTheme }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isMobile ? '15px' : '30px',
      flexShrink: 0
    }}>
      <h1 style={{
        fontSize: isMobile ? '20px' : '36px',
        fontWeight: '700',
        color: isDark ? '#fff' : '#69e90eff',
        margin: 0,
        letterSpacing: '-0.5px'
      }}>
        JSON Visualize
      </h1>
      
      {/* Theme toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ 
          color: isDark ? '#bbb' : '#666', 
          fontSize: isMobile ? '12px' : '15px',
          fontWeight: '500',
          display: isMobile ? 'none' : 'block'
        }}>
          Dark/Light
        </span>
        <button
          onClick={onToggleTheme}
          style={{
            width: '52px',
            height: '28px',
            borderRadius: '14px',
            background: isDark ? '#4a4a4a' : '#d1d1d1',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background 0.3s',
            flexShrink: 0
          }}
        >
          <div style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: 'white',
            position: 'absolute',
            top: '3px',
            left: isDark ? '27px' : '3px',
            transition: 'left 0.3s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }} />
        </button>
      </div>
    </div>
  );
};