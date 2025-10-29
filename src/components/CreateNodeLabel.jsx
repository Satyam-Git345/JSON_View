export const createNodeLabel = (label, value, type) => {
  // For primitive values, show value below label
  if (type === 'primitive' && value) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontWeight: '500', marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: '11px', opacity: '0.9' }}>{value}</div>
      </div>
    );
  }
  return <div style={{ fontWeight: '500' }}>{label}</div>;
};