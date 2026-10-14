import { useEffect, useState } from 'react';

import { TimeSlice } from 'src/ts/models/timeSlice.model';

import { useInjection } from '../../../context/inversifyContextProvider';
import StockPriceApi from '../../../api/stockPriceApi';

interface UseTimeSliceHook {
  timeSlice: TimeSlice;
  loaded: boolean;
}

const useTimeSlice = (): UseTimeSliceHook => {
  const stockPriceApi = useInjection(StockPriceApi);

  const [loaded, setLoaded] = useState<boolean>(false);
  const [timeSlice, setTimeSlice] = useState<TimeSlice>({
    from: new Date(),
    to: new Date(),
  });

  useEffect(() => {
    const fetchTimeSlice = async () => {
      try {
        const { from, to } = await stockPriceApi.getAvailableTimeSlice();

        setTimeSlice({ from, to });
        setLoaded(true);
      } catch (error) {
        setLoaded(false);
      }
    };

    fetchTimeSlice();
  }, []);

  return { timeSlice, loaded };
};

export default useTimeSlice;
