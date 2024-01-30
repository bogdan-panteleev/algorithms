export function SNTP(A: string, B: string, C: string): string {
  const a = stringToSeconds(A);
  let c = stringToSeconds(C);
  if (c < a) {
    c += 3600 * 24;
  }

  const diff = Math.round((c - a) / 2);
  const b = stringToSeconds(B);
  return secondsToString(b + diff);
}

function stringToSeconds(str: string): number {
  const [hh, mm, ss] = str.split(':').map(Number);
  return ss + mm * 60 + hh * 3600;
}

function secondsToString(seconds: number): string {
  const withouthh = seconds % 3600;
  const ss = (withouthh % 60).toString().padStart(2, '0');
  const mm = Math.floor(withouthh / 60)
    .toString()
    .padStart(2, '0');
  const hh = (Math.floor(seconds / 3600) % 24).toString().padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
}
