type man = [number, number, number];
export function peopleInQueue(queue: man[]): number {
  queue.unshift([Infinity, Infinity, Infinity]);
  queue.unshift([Infinity, Infinity, Infinity]);
  queue.unshift([Infinity, Infinity, Infinity]);

  const dp = new Array(queue.length);
  dp[0] = 0;
  dp[1] = 0;
  dp[2] = 0;

  for (let i = 3; i < dp.length; i++) {
    try {
      dp[i] = Math.min(dp[i - 1] + queue[i][0], dp[i - 2] + queue[i - 1][1], dp[i - 3] + queue[i - 2][2]);
    } catch (e) {
      debugger;
    }
    console.log(i);
  }
  return dp[dp.length - 1];
}
