import { Container } from 'inversify';
import StockPriceApi from './api/stockPriceApi';

const container = new Container({
  skipBaseClassChecks: true,
});

// Libs
container.bind(StockPriceApi).toSelf().inSingletonScope();

export default container;
