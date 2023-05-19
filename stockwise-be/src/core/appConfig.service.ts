import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  get port(): number {
    return this.configService.get<number>('PORT') || 3000;
  }

  get mongoUri(): string {
    const host = this.configService.get<string>('MONGO_HOST');
    const port = this.configService.get<number>('MONGO_PORT');
    const database = this.configService.get<string>('MONGO_DATABASE');
    return `mongodb://${host}:${port}/${database}`;
  }
}
