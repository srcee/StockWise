import {NestFactory} from '@nestjs/core';

import {AppModule} from './app.module';
import {AppClusterService} from './core/appCluster.service';
import {AppConfigService} from './core/appConfig.service';
import {EnvironmentInfo} from './core/environmentInfo.service';
import {GlobalErrorFilter} from './core/globalError.filter';
import {LoggerService} from './core/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);
  const appConfig = app.get(AppConfigService);

  app.useGlobalFilters(new GlobalErrorFilter(logger));
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    allowedHeaders: [
      // default
      'Accept',
      'Authorization',
      'Content-Type',
      'If-None-Match',
    ],
    maxAge: 600,
  });

  await app.listen(appConfig.port);
}

async function startApp() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);

  if (EnvironmentInfo.isProductionZone) {
    AppClusterService.clusterize(bootstrap, logger);
  } else {
    bootstrap();
  }
}

startApp();
