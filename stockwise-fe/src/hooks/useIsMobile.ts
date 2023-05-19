import useWindowDimensions from './useWindowDimensions';

const isMobile = (width: number): boolean => width < 770;

const useIsMobile = (): boolean => {
  const { width } = useWindowDimensions();

  return isMobile(width);
};

export default useIsMobile;
