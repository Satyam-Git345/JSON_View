export const CopyNotification = ({ message }) => {
  if (!message) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#10b981',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      zIndex: 1000,
      fontSize: '14px',
      fontWeight: '500'
    }}>
      {message}
    </div>
  );
};