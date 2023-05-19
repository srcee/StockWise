import {Worker} from 'worker_threads';

import {StockPrice} from '../schemas/stockPrice.schema';
import {MaxProfitInTimeSliceDto} from '../dto/maxProfitInTimeSlice.dto';

export const createMaxProfitInTimeSliceWorkers = async (stockPrices: StockPrice[], availableSum: number) => {
  // Manage into how many workers the computation to be split.
  // It turns out that 1 thread is faster than when using os.cpus().length
  // When using os.cpus().length the main thread is blocked for the entire time
  const numWorkers = 1;
  const workSize = Math.ceil(stockPrices.length / numWorkers);

  const workers: Worker[] = [];
  for (let i = 0; i < numWorkers; i++) {
    const startIdx = i * workSize;
    const endIdx = Math.min(startIdx + workSize, stockPrices.length);

    const worker = new Worker('./src/modules/stockPrice/stockPrice.worker.js', {
      workerData: {
        startIdx,
        endIdx,
        stockPrices,
        availableSum,
      },
    });

    workers.push(worker);
  }

  const promises: Promise<MaxProfitInTimeSliceDto>[] = workers.map((worker) => {
    return new Promise((resolve, reject) => {
      worker.on('message', (maxProfit: MaxProfitInTimeSliceDto) => {
        resolve(maxProfit);
      });
      worker.on('error', reject);
    });
  });

  const results = await Promise.all(promises);
  workers.forEach((worker) => worker.terminate());

  return results.filter((result) => !!result);
};
