export function interactor(args: [number, number, number]): number {
  const [completion, interactor, checker] = args;

  if (interactor === 0) {
    return completion === 0 ? checker : 3;
  }

  if (interactor === 1) {
    return checker;
  }

  if (interactor === 4) {
    return completion === 0 ? 4 : 3;
  }

  if (interactor === 6) {
    return 0;
  }

  if (interactor === 7) {
    return 1;
  }

  return interactor;
}
