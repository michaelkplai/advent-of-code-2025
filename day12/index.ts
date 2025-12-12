import { getInput } from "../utils";

const exampleInput = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

const input1 = getInput("day12/input1.txt");

function solvePart1(input: string) {
  const sections = input.split("\n\n");
  const shapes = sections.slice(0, -1).map((section) => {
    const chars = section.split("");
    return chars.reduce((sum, char) => {
      if (char === "#") {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
  });

  const regions = sections
    .at(-1)!
    .split("\n")
    .map((regionStr) => {
      const [dimensionStr, presentStr] = regionStr.split(": ");
      const [x, y] = dimensionStr.split("x").map(Number);
      const presentCounts = presentStr.split(" ").map(Number);
      const size = x * y;
      return { size, presentCounts };
    });

  let answer = 0;
  for (const region of regions) {
    const presentSize = region.presentCounts.reduce(
      (sum, count, i) => sum + count * shapes[i],
      0
    );
    if (presentSize <= region.size) answer++;
  }

  return answer;
}

function solvePart2(input: string) {}

console.log(solvePart1(exampleInput));
console.log(solvePart1(input1));

// console.log(solvePart2(exampleInput));
// console.log(solvePart2(input1));
