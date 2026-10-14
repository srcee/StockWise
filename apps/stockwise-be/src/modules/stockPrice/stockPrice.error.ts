import {HttpStatus} from '@nestjs/common';

import {AppErrorBase, ErrorBaseConstructor} from 'src/core/appErrorBase';
import {ErrorList} from 'src/core/errorList.decorator';

@ErrorList()
export class StockPriceError extends AppErrorBase {
  public static StockPriceTimeRangeError: ErrorBaseConstructor<{start: Date; end: Date}> =
    AppErrorBase.createErrorConstructor<{start: Date; end: Date}>(
      'StockPriceTimeRangeError',
      'Stock price time range error',
      HttpStatus.BAD_REQUEST,
    );
  public static StockPriceStartAfterEndTimeRangeError: ErrorBaseConstructor<{start: Date; end: Date}> =
    AppErrorBase.createErrorConstructor<{start: Date; end: Date}>(
      'StockPriceStartAfterEndTimeRangeError',
      'Start time must be before end time',
      HttpStatus.BAD_REQUEST,
    );
  public static StockPriceNotFoundError: ErrorBaseConstructor<{id: string}> = AppErrorBase.createErrorConstructor<{
    id: string;
  }>('StockPriceNotFoundError', 'Stock price not found error', HttpStatus.NOT_FOUND);

  public static CalculateMaxProfitForTimeSliceWorkerError: ErrorBaseConstructor<{exitCode: number}> =
    AppErrorBase.createErrorConstructor<{
      exitCode: number;
    }>(
      'CalculateMaxProfitForTimeSlice',
      'Error occurred when calculating max profit in time slice',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
}
