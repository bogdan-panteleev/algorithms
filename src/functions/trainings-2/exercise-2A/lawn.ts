type Coordinate = {
  x: number;
  y: number;
};

type Rectangle = {
  leftBottom: Coordinate;
  rightTop: Coordinate;
};

type Circle = {
  center: Coordinate;
  radius: number;
};

export function lawn(rect: Rectangle, circle: Circle): number {
  let counter = 0;

  let maxY = Math.min(rect.rightTop.y, circle.center.y + circle.radius);
  let minY = Math.max(rect.leftBottom.y, circle.center.y - circle.radius);

  for (let row = minY; row <= maxY; row++) {
    const deltaX = Math.sqrt(circle.radius ** 2 - (circle.center.y - row) ** 2);

    const leftBorder = Math.ceil(circle.center.x - deltaX);
    const rightBorder = Math.floor(circle.center.x + deltaX);

    counter += getIntersectionLength(leftBorder, rightBorder, rect.leftBottom.x, rect.rightTop.x);
  }

  function getIntersectionLength(left1: number, right1: number, left2: number, right2: number): number {
    const maxLeft = Math.max(left1, left2);
    const minRight = Math.min(right1, right2);

    const length = minRight - maxLeft + 1;

    return length < 0 ? 0 : length;
  }

  return counter;
}
