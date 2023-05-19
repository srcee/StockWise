import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';

import {StockPriceModule} from './modules/stockPrice/stockPrice.module';
import {AppConfigService} from './core/appConfig.service';
import {CoreModule} from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [CoreModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        uri: configService.mongoUri,
      }),
    }),
    StockPriceModule,
  ],
  providers: [CoreModule],
})
export class AppModule {}
