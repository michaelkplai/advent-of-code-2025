import { getInput } from "../utils";

const exampleInput = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

const input1 = getInput("day7/input1.txt");

function solvePart1(input: string) {
  const rows = input.split("\n").map((row) => row.split(""));

  let answer = 0;

  for (let y = 1; y < rows.length; y++) {
    const prevRow = rows[y - 1];
    const newRow = [...rows[y]];

    for (let x = 0; x < prevRow.length; x++) {
      if (prevRow[x] !== "S") continue;

      const nextSpot = newRow[x];
      if (nextSpot === ".") {
        newRow[x] = "S";
      } else if (nextSpot === "^") {
        answer++;

        // Assume the left and right cannot be splitters
        if (x - 1 >= 0) newRow[x - 1] = "S";
        if (x + 1 < newRow.length) newRow[x + 1] = "S";
      }
    }

    rows[y] = newRow;
  }

  return answer;
}

function solvePart2(input: string) {
  const rows = input
    .split("\n")
    .map((row) => row.split("").map((val) => (val === "S" ? "1" : val)));

  for (let y = 1; y < rows.length; y++) {
    const prevRow = rows[y - 1];
    const newRow = [...rows[y]];

    for (let x = 0; x < prevRow.length; x++) {
      const prevElement = prevRow[x];

      if (isNaN(Number(prevElement))) continue;

      const nextSpot = newRow[x];
      if (nextSpot === ".") {
        newRow[x] = prevElement;
      } else if (!isNaN(Number(nextSpot))) {
        newRow[x] = String(Number(nextSpot) + Number(prevElement));
      } else if (nextSpot === "^") {
        if (x - 1 >= 0) {
          const numericSplitSpot = Number(newRow[x - 1]);
          if (!isNaN(numericSplitSpot)) {
            newRow[x - 1] = String(numericSplitSpot + Number(prevElement));
          } else {
            newRow[x - 1] = prevElement;
          }
        }
        if (x + 1 < newRow.length) {
          const numericSplitSpot = Number(newRow[x + 1]);
          if (!isNaN(numericSplitSpot)) {
            newRow[x + 1] = String(numericSplitSpot + Number(prevElement));
          } else {
            newRow[x + 1] = prevElement;
          }
        }
      }
    }

    rows[y] = newRow;
  }

  return rows[rows.length - 1]
    .map(Number)
    .filter(Number)
    .reduce((sum, val) => sum + val, 0);
}

console.log(solvePart1(exampleInput));
console.log(solvePart1(input1));

console.log(solvePart2(exampleInput));
console.log(solvePart2(input1));
