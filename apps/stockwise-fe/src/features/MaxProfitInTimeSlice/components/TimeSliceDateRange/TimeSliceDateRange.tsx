import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateRangePicker } from '@mui/x-date-pickers-pro';

import useTimeSlice from 'src/features/MaxProfitInTimeSlice/hooks/useTimeSlice';

import './TimeSliceDateRange.scss';

interface DateRangeProps {
	name: string;
  control: Control<FieldValues>;
}

const TimeSliceDateRange: React.FC<DateRangeProps> = ({ name, control }: DateRangeProps) => {
	const { t } = useTranslation('general');
	const {timeSlice, loaded} = useTimeSlice();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DateRangePicker
						disabled={!loaded}
						calendars={1}
						className='date-range'
						minDate={timeSlice?.from}
						maxDate={timeSlice?.to}
						value={field.value}
						onChange={(newValue) => field.onChange(newValue)}
						localeText={{ start: t('from')!, end: t('to')! }}
						/>
				</LocalizationProvider>
			)}
		/>
	);
} 

export default TimeSliceDateRange;