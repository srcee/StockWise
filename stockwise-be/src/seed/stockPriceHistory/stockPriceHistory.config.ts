import {StockPriceMetadata} from 'src/modules/stockPrice/schemas/stockPrice.schema';

export interface StockPriceHistoryDataConfig {
  count: number;
  startDate: Date;
  startPrice: number;
  metadata: StockPriceMetadata;
  timeSeriesStepInMS: number;
}

const lucidLinkDataConfig: StockPriceHistoryDataConfig = {
  count: 1_000_000,
  startDate: new Date(2023, 0, 1, 0, 0, 0, 0),
  startPrice: 42,
  metadata: {
    companyName: 'LucidLink',
  },
  timeSeriesStepInMS: 1000,
};

export const stockPriceHistoryDataConfig: StockPriceHistoryDataConfig[] = [lucidLinkDataConfig];
