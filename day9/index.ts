import { getInput } from "../utils";

const exampleInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

const input1 = getInput("day9/input1.txt");

function solvePart1(input: string) {
  const redTiles = input
    .split("\n")
    .map((row) => row.split(",").map(Number))
    .map(([x, y]) => [x, y] as const);

  let maxArea = -Infinity;

  for (let i = 0; i < redTiles.length; i++) {
    for (let j = i + 1; j < redTiles.length; j++) {
      const [x1, y1] = redTiles[i];
      const [x2, y2] = redTiles[j];
      const width = Math.abs(x2 - x1) + 1;
      const height = Math.abs(y2 - y1) + 1;
      const area = width * height;

      maxArea = Math.max(area, maxArea);
    }
  }

  return maxArea;
}

//
function solvePart2(input: string) {
  const redTiles = input
    .split("\n")
    .map((row) => row.split(",").map(Number))
    .map(([x, y]) => [x, y] as const);

  // const xValues = redTiles.map(([x]) => x);
  // const yValues = redTiles.map(([_, y]) => y);

  // const [minX, maxX] = [Math.min(...xValues), Math.max(...xValues)];
  // const [minY, maxY] = [Math.min(...yValues), Math.max(...yValues)];
  // console.log({ minX, maxX });
  // console.log({ minY, maxY });

  // const gridByXY = Array.from({ length: maxX }, () =>
  //   Array.from({ length: maxY }, () => 0)
  // );

  type VerticalLine = { x: number; y1: number; y2: number };
  type HorizontalLine = { y: number; x1: number; x2: number };

  function hasOverlap(
    verticalLines: VerticalLine[],
    horizontalLines: HorizontalLine[]
  ) {
    for (const verticalLine of verticalLines) {
      for (const horizontalLine of horizontalLines) {
      }
    }
    return false;
  }

  const verticalLines: VerticalLine[] = [];
  const horizontalLines: HorizontalLine[] = [];

  for (let i = 0; i < redTiles.length - 1; i++) {
    const j = i + 1;
    const [x1, y1] = redTiles[i];
    const [x2, y2] = redTiles[j];

    if (x1 === x2) {
      verticalLines.push({ x: x1, y1: Math.min(y1, y2), y2: Math.max(y1, y2) });
    } else if (y1 === y2) {
      horizontalLines.push({
        y: y1,
        x1: Math.min(x1, x2),
        x2: Math.max(x1, x2),
      });
    }
  }

  let maxArea = -Infinity;

  for (let i = 0; i < redTiles.length; i++) {
    for (let j = i + 1; j < redTiles.length; j++) {
      const [x1, y1] = redTiles[i];
      const [x2, y2] = redTiles[j];

      const verticalLinesToCheck: VerticalLine[] = [
        {
          x: x1,
          y1: Math.min(y1, y2),
          y2: Math.max(y1, y2),
        },
        {
          x: x2,
          y1: Math.min(y1, y2),
          y2: Math.max(y1, y2),
        },
      ];

      const horizontalLinesToCheck: HorizontalLine[] = [
        {
          y: y1,
          x1: Math.min(x1, x2),
          x2: Math.max(x1, x2),
        },
        {
          y: y2,
          x1: Math.min(x1, x2),
          x2: Math.max(x1, x2),
        },
      ];

      if (
        hasOverlap(verticalLinesToCheck, horizontalLines) ||
        hasOverlap(verticalLines, horizontalLinesToCheck)
      ) {
        continue;
      }

      const width = Math.abs(x2 - x1) + 1;
      const height = Math.abs(y2 - y1) + 1;
      const area = width * height;

      maxArea = Math.max(area, maxArea);
    }
  }

  return maxArea;
}

console.log(solvePart1(exampleInput));
console.log(solvePart1(input1));

console.log(solvePart2(exampleInput));
console.log(solvePart2(input1));
