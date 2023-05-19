import React from 'react'

import DateUtil from 'src/helpers/dateUtil';
import { Loader } from 'src/components/common/Loader/Loader';
import { MaxProfitInTimeSlice } from 'src/ts/models/maxProfitInTimeSlice.model';
import { useTranslation } from 'react-i18next';

import './MaxProfitInTimeSliceResult.scss'

interface MaxProfitInTimeSliceResultProps {
	result: MaxProfitInTimeSlice | null;
	loading: boolean;
}

const MaxProfitInTimeSliceResult: React.FC<MaxProfitInTimeSliceResultProps> = ({result, loading}) => {
	const { t } = useTranslation('dashboard');
	const dateUtil = DateUtil.getInstance();

	return (
		<div className='result'>
			{loading && <Loader />}
			{result && (
				<div className="max-profit-result">
				<div className="title">{t('maxProfitTitle')}</div>
				<div className="result-container">
					<div className="result-item">
						<div className="result-label">{t('buyTime')}</div>
						<div className="result-value">{dateUtil.formatDateToTime(result.buyTime)}</div>
					</div>
					<div className="result-item">
						<div className="result-label">{t('sellTime')}</div>
						<div className="result-value">{dateUtil.formatDateToTime(result.sellTime)}</div>
					</div>
					<hr/>
					<div className="result-item">
						<div className="result-label">{t('potentialProfit')}</div>
						<div className="result-value">{result.profit.toFixed(2)}</div>
					</div>
				</div>
			</div>
			)}
		</div>
	);
}

export default MaxProfitInTimeSliceResult;