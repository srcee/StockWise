import { useState } from 'react';

import StockPriceApi from 'src/api/stockPriceApi';
import DateUtil from 'src/helpers/dateUtil';
import { useInjection } from 'src/context/inversifyContextProvider';
import { MaxProfitInTimeSlice, MaxProfitInTimeSlicePayload } from 'src/ts/models/maxProfitInTimeSlice.model';

import { MaxProfitInTimeSliceFormValues } from '../components/MaxProfitInTimeSliceForm/MaxProfitInTimeSliceForm';

interface UseMaxProfitInTimeSliceHook {
  maxProfitInTimeSlice: MaxProfitInTimeSlice | null;
  loading: boolean;
  getMaxProfitInTimeSlice: (formValues: MaxProfitInTimeSliceFormValues) => Promise<void>;
}

const useMaxProfitInTimeSlice = (): UseMaxProfitInTimeSliceHook => {
  const dateUtil = DateUtil.getInstance();
  const stockPriceApi = useInjection(StockPriceApi);
  const [loading, setLoading] = useState<boolean>(false);
  const [maxProfitInTimeSlice, setMaxProfitInTimeSlice] = useState<MaxProfitInTimeSlice | null>(null);

  const getMaxProfitInTimeSlice = async (formValues: MaxProfitInTimeSliceFormValues) => {
    setMaxProfitInTimeSlice(null);
    setLoading(true);

    const [start, end] = formValues.timeSlice;
    const payload: MaxProfitInTimeSlicePayload = {
      start: dateUtil.formatDatePayload(start),
      end: dateUtil.formatDatePayload(end),
      sum: formValues.availableSum,
    };

    try {
      const fetchedMaxProfitInTimeSlice = await stockPriceApi.getMaxProfitInTimeSlice(payload);
      setMaxProfitInTimeSlice(fetchedMaxProfitInTimeSlice);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    maxProfitInTimeSlice,
    loading,
    getMaxProfitInTimeSlice,
  };
};

export default useMaxProfitInTimeSlice;
