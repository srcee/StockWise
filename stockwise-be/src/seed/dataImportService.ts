import {Injectable} from '@nestjs/common';

import {LoggerService} from 'src/core/logger.service';
import {StockPriceService} from 'src/modules/stockPrice/stockPrice.service';
import {Stopwatch} from 'src/core/stopwatch';

import {generateStockPriceHistory} from './stockPriceHistory/stockPriceHistory.seed';
import {stockPriceHistoryDataConfig} from './stockPriceHistory/stockPriceHistory.config';

@Injectable()
export class DataImportService {
  constructor(private readonly stockPriceService: StockPriceService, private readonly logger: LoggerService) {}

  async importInitialStockPriceHistoryData() {
    const stopwatch = new Stopwatch(this.logger);
    for (const dataConfig of stockPriceHistoryDataConfig) {
      this.logger.log(`Seeding initial Stock Price History data for ${dataConfig.metadata.companyName}`);
      const recordsCount = await this.stockPriceService.getCount();

      if (!recordsCount) {
        const stockPriceHistoryGenerator = generateStockPriceHistory(dataConfig);
        for (const dataBatch of stockPriceHistoryGenerator) {
          await this.stockPriceService.insertMany(dataBatch);
        }
      }

      stopwatch.stopAndLogElapsedTime(
        `Seeding initial Stock Price History data for ${dataConfig.metadata.companyName} is done. ${dataConfig.count} records inserted.`,
      );
    }
  }
}
