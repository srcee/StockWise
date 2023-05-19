import {StockPrice} from 'src/modules/stockPrice/schemas/stockPrice.schema';

import {generateNextPrice} from './stockPriceHistory.utils';
import {StockPriceHistoryDataConfig} from './stockPriceHistory.config';

export function* generateStockPriceHistory(dataConfig: StockPriceHistoryDataConfig): IterableIterator<StockPrice[]> {
  const {count, startDate, startPrice, metadata, timeSeriesStepInMS} = dataConfig;
  const startTimestamp = startDate.getTime();
  let nextPrice = startPrice;
  let index = 0;

  while (index < count) {
    const batch: StockPrice[] = [];

    for (let i = 0; i < 10000 && index < count; i++) {
      nextPrice = generateNextPrice(nextPrice);

      const timestamp = new Date(startTimestamp + index * timeSeriesStepInMS);
      const price = nextPrice;

      batch.push({
        timestamp,
        price,
        metadata,
      });

      index++;
    }

    yield batch;
  }
}
