import { injectable } from 'inversify';

import DateUtil from 'src/helpers/dateUtil';
import { MaxProfitInTimeSlice, MaxProfitInTimeSlicePayload } from 'src/ts/models/maxProfitInTimeSlice.model';
import { TimeSlice } from 'src/ts/models/timeSlice.model';

import BaseApi from './baseApi';
import { buildUrlQueryParams } from './apiUtils';

@injectable()
class StockPriceApi extends BaseApi {
  private readonly baseEndpoint: string = 'stock-price';

  private readonly dateUtil = DateUtil.getInstance();

  constructor() {
    super(import.meta.env.VITE_BACKEND_BASE_URL);
  }

  public async getAvailableTimeSlice(): Promise<TimeSlice> {
    const result = await this.get<TimeSlice>(`${this.baseEndpoint}/time-slice`);
    const timeSlice = {
      from: new Date(result.from),
      to: new Date(result.to),
    };

    return timeSlice;
  }

  public async getMaxProfitInTimeSlice(payload: MaxProfitInTimeSlicePayload): Promise<MaxProfitInTimeSlice> {
    const endpoint = `${this.baseEndpoint}/time-range`;
    const url = buildUrlQueryParams(endpoint, payload);

    const result = await this.get<MaxProfitInTimeSlice>(url);
    const maxProfitInTimeSlice = {
      buyTime: new Date(result.buyTime),
      sellTime: new Date(result.sellTime),
      profit: result.profit,
    };

    return maxProfitInTimeSlice;
  }
}

export default StockPriceApi;
