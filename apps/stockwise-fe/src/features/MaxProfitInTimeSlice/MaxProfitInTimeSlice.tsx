import React from 'react';

import MaxProfitInTimeSliceForm from './components/MaxProfitInTimeSliceForm/MaxProfitInTimeSliceForm';
import MaxProfitResult from './components/MaxProfitInTimeSliceResult/MaxProfitInTimeSliceResult';

import './MaxProfitInTimeSlice.scss';
import useMaxProfitInTimeSlice from './hooks/useMaxProfitInTimeSlice';

const MaxProfitInTimeSlice: React.FC = () => {
  const {maxProfitInTimeSlice, getMaxProfitInTimeSlice, loading} = useMaxProfitInTimeSlice();

  const onSubmit = (data: any) => {
    getMaxProfitInTimeSlice(data);
  }

  return (
    <div className='max-profit-in-time-slice-container'>
      <MaxProfitInTimeSliceForm onSubmit={onSubmit} loading={loading}/>
      <MaxProfitResult result={maxProfitInTimeSlice} loading={loading}/>
    </div>
  );
}

export default MaxProfitInTimeSlice;
