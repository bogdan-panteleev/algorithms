import { Logger } from './helpers';

export function shortestPath(xa: number, ya: number, xb: number, yb: number, logger: Logger) {
  if (xa === xb && ya === yb) {
    logger.write((0).toFixed(12));
    return;
  }

  const r1 = Math.sqrt(xa ** 2 + ya ** 2);
  const r2 = Math.sqrt(xb ** 2 + yb ** 2);

  const directWay = r1 + r2;

  const rDiff = r1 - r2;
  const rDiffAbs = Math.abs(rDiff);
  const targetRadius = rDiff > 0 ? r2 : r1;
  if (targetRadius === 0) {
    logger.write(rDiffAbs.toFixed(12));
    return;
  }
  const angle = Math.abs(Math.atan2(ya, xa) - Math.atan2(yb, xb));
  const shortestCircleLength = calculateWay(targetRadius, angle);

  const circleWay = shortestCircleLength + rDiffAbs;

  logger.write(Math.min(directWay, circleWay).toFixed(12));
}

function fixCos(cos: number) {
  if (Math.abs(cos) > 1) {
    return Number(cos.toFixed(0));
  }
  return cos;
}

function calculateWay(radius: number, angle: number) {
  return 2 * Math.PI * radius * (Math.abs(angle) / (Math.PI * 2));
}
