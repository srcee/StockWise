import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export interface StockPriceMetadata {
  companyName: string;
}

@Schema({timeseries: {timeField: 'timestamp', metaField: 'metadata', granularity: 'hours'}, versionKey: false})
export class StockPrice {
  @Prop({required: true})
  timestamp: Date;

  @Prop({required: true})
  price: number;

  @Prop({type: Object, required: true})
  metadata: StockPriceMetadata;

  constructor(timestamp: Date, price: number, metadata: StockPriceMetadata) {
    this.timestamp = timestamp;
    this.price = price;
    this.metadata = metadata;
  }
}

export type StockPriceDocument = StockPrice & Document;

export const StockPriceSchema = SchemaFactory.createForClass(StockPrice);
