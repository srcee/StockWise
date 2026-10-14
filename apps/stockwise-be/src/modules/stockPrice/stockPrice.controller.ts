import {Controller, Get, Query} from '@nestjs/common';

import {StockPriceService} from './stockPrice.service';
import {MaxProfitInTimeSliceDto} from './dto/maxProfitInTimeSlice.dto';
import {TimeSliceDto} from './dto/timeSlice.dto';

@Controller('stock-price')
export class StockPriceController {
  constructor(private readonly stockPriceService: StockPriceService) {}

  @Get('/time-range')
  async findMaxProfitInTimeRange(
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('sum') sum: string,
  ): Promise<MaxProfitInTimeSliceDto> {
    return await this.stockPriceService.findMaxProfitInTimeRange(start, end, sum);
  }

  @Get('time-slice')
  async findAvailableTimeSlice(): Promise<TimeSliceDto> {
    return await this.stockPriceService.findAvailableTimeSlice();
  }
}
