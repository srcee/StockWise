import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormField from "src/components/common/FormField/FormField";
import { Button } from "src/components/common/Button/Button";

import TimeSliceDateRange from "../TimeSliceDateRange/TimeSliceDateRange";

export interface MaxProfitInTimeSliceFormValues {
  timeSlice: Date[];
  availableSum: number;
}

interface MaxProfitInTimeSliceFormProps {
	loading: boolean;
	onSubmit: (data: MaxProfitInTimeSliceFormValues) => void;
}

const MaxProfitInTimeSliceForm: React.FC<MaxProfitInTimeSliceFormProps> = ({loading, onSubmit}) => {
	const { t } = useTranslation('dashboard');
	const {control, handleSubmit, formState: { isValid }} = useForm();

	const onSubmitHandler = (data: MaxProfitInTimeSliceFormValues) => {
    onSubmit(data);
  };

	return (
		<form onSubmit={handleSubmit((data) => onSubmitHandler(data as MaxProfitInTimeSliceFormValues))} className="form">
			<TimeSliceDateRange name="timeSlice" control={control}/>
			<FormField name="availableSum" type="number" label={t('addAvailableSum')} required error={!isValid} control={control} />
			<Button type="submit" title={t('calculate')} disabled={loading}/>
		</form>
	);
};

export default MaxProfitInTimeSliceForm;