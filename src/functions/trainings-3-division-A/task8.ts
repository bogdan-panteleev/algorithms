type coord = [number, number];

export function minRectangle(coords: coord[]): [coord, coord] {
  const mostLeft = coords.reduce((left, curr) => (curr[0] < left[0] ? curr : left));
  const mostBottom = coords.reduce((bottom, curr) => (curr[1] < bottom[1] ? curr : bottom));
  const mostRight = coords.reduce((right, curr) => (curr[0] > right[0] ? curr : right));
  const mostTop = coords.reduce((top, curr) => (curr[1] > top[1] ? curr : top));

  return [
    [mostLeft[0], mostBottom[1]],
    [mostRight[0], mostTop[1]],
  ];
}
