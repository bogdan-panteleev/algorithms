export function cleverPetya(source: string, target: string): string {
  const prefix = target.slice(0, source.length);
  const suffixLength = getSuffixLength(source, prefix);
  if (suffixLength === 0) {
    return target;
  }
  const pattern = `(${source})+`;
  const regExp = new RegExp(pattern);

  const check = regExp.exec(target);

  const manualTypeStartIndex: number = check ? check.index + check[0].length : suffixLength;

  return target.slice(manualTypeStartIndex);
}

function getSuffixLength(source: string, prefix: string): number {
  for (let length = prefix.length; length >= 0; length--) {
    if (prefix.slice(0, length) === source.slice(-length)) return length;
  }

  return 0;
}
