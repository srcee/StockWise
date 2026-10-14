import { useLayoutEffect, useState } from 'react';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = () => {
  const [size, setSize] = useState(getWindowDimensions());

  useLayoutEffect(() => {
    const updateSize = () => setSize(getWindowDimensions());

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};

export default useWindowDimensions;
