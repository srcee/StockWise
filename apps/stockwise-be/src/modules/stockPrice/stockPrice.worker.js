const { parentPort, workerData } = require('worker_threads');
const { stockPrices, startIdx, endIdx, availableSum } = workerData;

function calculateMaxProfitInTimeSlice(stockPrices, startIdx, endIdx, availableSum) {
  let minPrice = stockPrices[startIdx]._doc.price;
  let maxProfit = 0;
  let buyTime = stockPrices[startIdx]._doc.timestamp;
  let sellTime = stockPrices[startIdx]._doc.timestamp;
  let numStocks = Math.floor(availableSum / minPrice);

  for (let i = startIdx + 1; i < endIdx; i++) {
    const price = stockPrices[i]._doc.price;
    const timestamp = stockPrices[i]._doc.timestamp;

    if (price < minPrice) {
      minPrice = price;
      buyTime = timestamp;
      numStocks = Math.floor(availableSum / minPrice);
    } else {
      const availableProfit = numStocks * (price - minPrice);
      const maxPossibleProfit = availableSum + numStocks * (price - minPrice);
      const profit = availableProfit <= maxPossibleProfit ? availableProfit : maxPossibleProfit;

      if (profit > maxProfit) {
        maxProfit = profit;
        buyTime = stockPrices[startIdx]._doc.timestamp;
        sellTime = timestamp;
      }
    }
  }

  const maxProfitInTimeSliceResult = {
    buyTime,
    sellTime,
    amount: numStocks,
    profit: maxProfit,
  }

  return maxProfitInTimeSliceResult;
}

const maxProfit = calculateMaxProfitInTimeSlice(stockPrices, startIdx, endIdx, availableSum);

parentPort.postMessage(maxProfit);
