type TVraw = {
  start: string;
  timePerOneNail: string;
};

type TV = {
  start: number;
  timePerOneNail: number;
};

export function buratino(rawTvs: TVraw[]): number {
  const tvs = rawTvs.map((tv) => ({
    start: convertTimeToMs(tv.start),
    timePerOneNail: Number(tv.timePerOneNail),
  }));

  const beforeLunch = getMaxForTimePeriod(convertTimeToMs('9:00:00'), convertTimeToMs('13:00:00'));
  const afterLunch = getMaxForTimePeriod(convertTimeToMs('14:00:00'), convertTimeToMs('18:00:00'));

  return beforeLunch + afterLunch;

  function getMaxForTimePeriod(start: number, end: number): number {
    // go over all seconds in a given period.
    // We store the maximum number of processed nails at moment i. The moment itself is INCLUDED
    const dp = new Array(end - start + 1).fill(0);

    dp.forEach((_, index) => {
      const time = index + start;
      const currentSpeed = getTimePerOneNailAtMoment(time, tvs);

      // calculate the max value including already calculated future values.
      // By doing so we iterate over all possible options
      dp[index] = Math.max(dp[index], dp[index - 1] || 0);

      const futureIndex = index + currentSpeed;
      if (futureIndex < dp.length) {
        // calculate future value if Karlo looks at TV right now
        dp[futureIndex] = Math.max(dp[futureIndex], dp[index] + 1);
      }
    });

    // return the last value in dp
    return dp[dp.length - 1];
  }
}

function convertTimeToMs(time: string): number {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 60 ** 2 + minutes * 60 + seconds;
}

function getTimePerOneNailAtMoment(moment: number, tvs: TV[]): number {
  let start = 0;
  let end = tvs.length - 1;

  while (start !== end) {
    const middle = Math.ceil((start + end) / 2);
    if (tvs[middle].start > moment) {
      end = middle - 1;
    } else {
      start = middle;
    }
  }

  if (tvs[start].start <= moment) {
    return tvs[start].timePerOneNail;
  } else {
    return 1_000_000_000;
  }
}
