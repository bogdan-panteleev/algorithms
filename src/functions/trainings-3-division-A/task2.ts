// Sliding Window implementation. Или метод двух указателей, как его назвал Густокашин

export function beautifulString(k: number, str: string): number {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

  let maxWindowLength = 0;

  for (let base of alphabet) {
    let rightPointer = 0;
    let currentK = k;

    for (let leftPointer = 0; leftPointer < str.length; leftPointer++) {
      let char = str[leftPointer];

      while (currentK >= 0 && rightPointer < str.length) {
        if (base !== str[rightPointer]) {
          currentK--;
        }

        if (currentK === 0) {
          const length = rightPointer - leftPointer + 1;
          if (length > maxWindowLength) maxWindowLength = length;
        }

        rightPointer++;
      }

      if (char !== base) {
        currentK++;
      }
    }
  }

  return maxWindowLength;
}
