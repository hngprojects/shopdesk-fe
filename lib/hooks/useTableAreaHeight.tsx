import { useEffect, useState, useRef } from 'react';

const useTableAreaHeight = () => {
  const tableAreaRef = useRef<HTMLDivElement>(null);
  const [tableAreaHeight, setTableHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (tableAreaRef.current) {
        setTableHeight(tableAreaRef.current.clientHeight);
      }
    };

    requestAnimationFrame(updateHeight);
    
    console.log('tableAreaHeight', tableAreaHeight);
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return { tableAreaRef, tableAreaHeight };
};

export default useTableAreaHeight;
