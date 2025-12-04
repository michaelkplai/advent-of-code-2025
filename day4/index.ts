import { getInput } from "../utils";

const exampleInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;
const input1 = getInput("day4/input1.txt");

function solvePart1(input: string) {
  const PAPER = "@";
  const EMPTY = ".";

  const grid: string[][] = input.split("\n").map((row) => row.split(""));
  const height = grid.length;
  const width = grid[0].length;

  const getNeighbors = (y: number, x: number) => {
    // prettier-ignore
    const neighborOffsets: [number, number][] = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],[0, 1],
      [1, -1], [1, 0], [1, 1]
    ]

    return neighborOffsets
      .flatMap(([yOffset, xOffset]) => {
        const newY = y + yOffset;
        const newX = x + xOffset;

        const inBounds =
          0 <= newY && newY < height && 0 <= newX && newX < width;
        if (!inBounds) return [];

        return grid[newY][newX];
      })
      .filter((neighbor) => neighbor !== undefined);
  };

  let answer = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const item = grid[y][x];

      if (item === EMPTY) continue;

      const neighbors = getNeighbors(y, x);
      const paperNeighbors = neighbors.filter((n) => n === PAPER);
      if (paperNeighbors.length < 4) {
        answer++;
      }
    }
  }

  return answer;
}

function solvePart2(input: string) {
  const PAPER = "@";
  const EMPTY = ".";

  const grid: string[][] = input.split("\n").map((row) => row.split(""));
  const height = grid.length;
  const width = grid[0].length;

  const getNeighbors = (y: number, x: number) => {
    // prettier-ignore
    const neighborOffsets: [number, number][] = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],[0, 1],
      [1, -1], [1, 0], [1, 1]
    ]

    return neighborOffsets
      .flatMap(([yOffset, xOffset]) => {
        const newY = y + yOffset;
        const newX = x + xOffset;

        const inBounds =
          0 <= newY && newY < height && 0 <= newX && newX < width;
        if (!inBounds) return [];

        return grid[newY][newX];
      })
      .filter((neighbor) => neighbor !== undefined);
  };

  let answer = 0;

  let papersToRemove: [number, number][] = [];
  do {
    papersToRemove = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const item = grid[y][x];

        if (item === EMPTY) continue;

        const neighbors = getNeighbors(y, x);
        const paperNeighbors = neighbors.filter((n) => n === PAPER);
        if (paperNeighbors.length < 4) {
          papersToRemove.push([y, x]);
        }
      }
    }

    for (const [y, x] of papersToRemove) {
      grid[y][x] = EMPTY;
    }

    answer += papersToRemove.length;
  } while (papersToRemove.length > 0);

  return answer;
}

console.log(solvePart1(exampleInput));
console.log(solvePart1(input1));
console.log(solvePart2(exampleInput));
console.log(solvePart2(input1));
