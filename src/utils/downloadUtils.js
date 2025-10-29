import { toPng } from 'html-to-image';

export const downloadTreeAsImage = (flowRef, isDark) => {
  if (flowRef.current) {
    const flowElement = flowRef.current.querySelector('.react-flow__viewport');
    if (flowElement) {
      toPng(flowElement, {
        backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa',
        width: flowElement.offsetWidth,
        height: flowElement.offsetHeight,
        style: {
          width: flowElement.offsetWidth + 'px',
          height: flowElement.offsetHeight + 'px'
        }
      })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'json-tree.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Failed to download image:', err);
        });
    }
  }
};