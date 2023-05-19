import {webcrypto} from 'crypto';

export const generateNextPrice = (price: number): number => {
  // Slightly better chance of price going up (5 to 4)
  const operator = getRandomIntInclusive(1, 9) % 2 === 0 ? '-' : '+';
  const nextPriceEquation = `${price}${operator}${getRandomNumber()}`;

  return Number(eval(nextPriceEquation).toFixed(2));
};

/**
 * Generates a new random integer number withing a specific range
 */
export const getRandomIntInclusive = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(getRandomNumber() * (max - min + 1)) + min;
};

/**
 * Generates a new random number
 */
export const getRandomNumber = (): number => {
  const randomBuffer = new Uint32Array(1);
  webcrypto.getRandomValues(randomBuffer);

  return randomBuffer[0] / (0xffffffff + 1);
};
