import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {DataImportService} from 'src/seed/dataImportService';
import {LoggerService} from 'src/core/logger.service';

import {StockPrice, StockPriceSchema} from './schemas/stockPrice.schema';
import {StockPriceRepository} from './stockPrice.repository';
import {StockPriceService} from './stockPrice.service';
import {StockPriceController} from './stockPrice.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: StockPrice.name, schema: StockPriceSchema}])],
  providers: [StockPriceService, StockPriceRepository, DataImportService, LoggerService],
  controllers: [StockPriceController],
})
export class StockPriceModule {
  constructor(private readonly dataImportService: DataImportService) {}

  async onApplicationBootstrap() {
    await this.dataImportService.importInitialStockPriceHistoryData();
  }
}
