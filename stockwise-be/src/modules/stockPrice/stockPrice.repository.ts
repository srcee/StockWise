import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {StockPrice, StockPriceDocument} from './schemas/stockPrice.schema';

@Injectable()
export class StockPriceRepository {
  constructor(@InjectModel(StockPrice.name) private readonly stockPriceModel: Model<StockPriceDocument>) {}

  async insertMany(data: StockPrice[]) {
    await this.stockPriceModel.insertMany(data);
  }

  async getCount(): Promise<number> {
    const countResult = await this.stockPriceModel
      .aggregate([
        {
          $count: 'total',
        },
      ])
      .exec();

    return countResult[0]?.total ?? 0;
  }

  async findByTimeRange(start: Date, end: Date): Promise<StockPrice[]> {
    return await this.stockPriceModel
      .find({
        timestamp: {
          $gte: start,
          $lte: end,
        },
      })
      .exec();
  }

  async findFirstDocumentTimestamp(): Promise<Date> {
    const firstTimestamp = await this.stockPriceModel.aggregate([
      {$group: {_id: null, timestamp: {$first: '$timestamp'}}},
    ]);

    return firstTimestamp[0].timestamp;
  }

  async findLastDocumentTimestamp(): Promise<Date> {
    const lastTimestamp = await this.stockPriceModel.aggregate([
      {$group: {_id: null, timestamp: {$last: '$timestamp'}}},
    ]);

    return lastTimestamp[0].timestamp;
  }
}
