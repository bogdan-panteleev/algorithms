export function trash(rules: string[], command: string): number {
  const directions = ['N', 'S', 'W', 'E', 'U', 'D'];
  const dp = Array.from({ length: 101 }, () => new Array(directions.length));
  for (let i = 0; i < dp[0].length; i++) {
    dp[1][i] = 1;
    dp[0][i] = 0;
  }

  const rulesMap: Record<string, string[]> = {
    N: rules[0].split(''),
    S: rules[1].split(''),
    W: rules[2].split(''),
    E: rules[3].split(''),
    U: rules[4].split(''),
    D: rules[5].split(''),
  };

  const rulesIndexesMap: Record<string, number> = {
    N: 0,
    S: 1,
    W: 2,
    E: 3,
    U: 4,
    D: 5,
  };

  const [direction, parameterAsString] = command.split(' ');
  const parameter = Number(parameterAsString);

  for (let i = 2; i < dp.length; i++) {
    for (let j = 0; j < dp[i].length; j++) {
      const sumOfPreviousStep = rulesMap[directions[j]].reduce((s, command) => {
        return s + dp[i - 1][rulesIndexesMap[command]];
      }, 0);

      dp[i][j] = 1 + sumOfPreviousStep;

      if (i === parameter && direction === directions[j]) {
        return dp[i][j];
      }
    }
  }

  throw new Error('Unreachable command');
}
