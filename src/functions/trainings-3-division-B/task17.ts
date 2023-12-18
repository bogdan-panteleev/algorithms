import { Queue } from './task16';

export function playGame(first: number[], second: number[]): string {
  const firstQueue = new Queue(first);
  const secondQueue = new Queue(second);
  let counter = 0;

  while (counter < 10e6 && firstQueue.size() && secondQueue.size()) {
    const firstCard = firstQueue.pop()!;
    const secondCard = secondQueue.pop()!;

    const targetQueue = compareCards(firstCard, secondCard) === 1 ? firstQueue : secondQueue;

    targetQueue.push(firstCard);
    targetQueue.push(secondCard);
    counter++;
  }

  if (counter === 10e6) {
    return 'botva';
  }
  if (firstQueue.size() === 0) {
    return `second ${counter}`;
  }
  if (secondQueue.size() === 0) {
    return `first ${counter}`;
  }

  throw new Error('Unexpected case');
}

function compareCards(a: number, b: number): 1 | -1 {
  if (a === 0 && b === 9) {
    return 1;
  }
  if (b === 0 && a === 9) {
    return -1;
  }
  return a > b ? 1 : -1;
}
