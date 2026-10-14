import {Injectable} from '@nestjs/common';

import {StockPrice} from './schemas/stockPrice.schema';
import {StockPriceRepository} from './stockPrice.repository';
import {StockPriceError} from './stockPrice.error';
import {MaxProfitInTimeSliceDto} from './dto/maxProfitInTimeSlice.dto';
import {createMaxProfitInTimeSliceWorkers} from './utils/createMaxProfitInTimeSliceWorkers.util';
import {TimeSliceDto} from './dto/timeSlice.dto';

@Injectable()
export class StockPriceService {
  constructor(private readonly stockPriceRepository: StockPriceRepository) {}

  async findByHoursTimeRange(startParam: string, endParam: string): Promise<StockPrice[]> {
    const start = new Date(startParam);
    const end = new Date(endParam);
    if (start > end) {
      throw new StockPriceError.StockPriceStartAfterEndTimeRangeError({start, end});
    }

    start.setHours(0, 0, 0, 0); // set start to the beginning of the day
    end.setHours(23, 59, 59, 999); // set end to the end of the day

    return this.stockPriceRepository.findByTimeRange(start, end);
  }

  async findAvailableTimeSlice(): Promise<TimeSliceDto> {
    const from = await this.stockPriceRepository.findFirstDocumentTimestamp();
    const to = await this.stockPriceRepository.findLastDocumentTimestamp();

    return {from, to};
  }

  async getCount() {
    return this.stockPriceRepository.getCount();
  }

  async insertMany(data: StockPrice[]) {
    await this.stockPriceRepository.insertMany(data);
  }

  async findMaxProfitInTimeRange(start: string, end: string, availableSum: string): Promise<MaxProfitInTimeSliceDto> {
    const stockPrices = await this.findByHoursTimeRange(start, end);

    return await this.findMaxProfit(stockPrices, Number(availableSum));
  }

  private async findMaxProfit(stockPrices: StockPrice[], availableSum: number): Promise<MaxProfitInTimeSliceDto> {
    const buySellTimes: MaxProfitInTimeSliceDto[] = await createMaxProfitInTimeSliceWorkers(stockPrices, availableSum);

    return buySellTimes.reduce((max, curr) => (curr.profit > max.profit ? curr : max));
  }
}
