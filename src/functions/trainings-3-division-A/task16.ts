export function minimumInWindow(nums: number[], k: number): number[] {
  const result: number[] = [];
  const dequeue: number[] = [];

  let j = 0;
  for (let i = 0; i <= nums.length - k; i++) {
    while (j < i + k) {
      while (dequeue[dequeue.length - 1] >= nums[j]) {
        dequeue.pop();
      }

      dequeue.push(nums[j]);

      j++;
    }

    result[i] = dequeue[0];
    if (dequeue[0] === nums[i]) dequeue.shift();
  }

  return result;
}
