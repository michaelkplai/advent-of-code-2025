import { getInput } from "../utils";

const exampleInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

const input1 = getInput("day10/input1.txt");

function arrayMultiply(array: number[], coefficient: number) {
  return array.map((val) => val * coefficient);
}
function arrayAdd(array1: number[], array2: number[]) {
  return Array.from({ length: array1.length }, (_, i) => array1[i] + array2[i]);
}

function getAllBooleanCombinations(n: number) {
  const combinations = [];
  // Calculate the total number of combinations (2^n)
  const totalCombinations = Math.pow(2, n);

  for (let i = 0; i < totalCombinations; i++) {
    const currentCombination: boolean[] = [];
    for (let j = 0; j < n; j++) {
      // Use bitwise AND and right shift to check the j-th bit
      // If the bit is 1, it's true; otherwise, it's false
      const isTrue = (i >> j) & 1;
      currentCombination.push(!!isTrue); // Convert to explicit boolean
    }
    // Reverse the combination to typically match standard truth table order (most significant bit first)
    combinations.push(currentCombination.reverse());
  }

  return combinations;
}

function solvePart1(input: string) {
  type Problem = {
    buttonVectors: number[][];
    targetVector: number[];
  };
  const problems = input.split("\n").map((line) => {
    const [targetStr, ...rest] = line.split(" ");
    const targetVector = targetStr
      .slice(1, -1)
      .replaceAll(".", "0")
      .replaceAll("#", "1")
      .split("")
      .map(Number);

    const buttonVectorsStr = rest.slice(0, -1);
    const buttonVectors = buttonVectorsStr.map((vectorStr) => {
      const vectorStrIndexes = vectorStr.slice(1, -1).split(",").map(Number);
      const indices = new Set(vectorStrIndexes);

      const buttonVector = Array.from(
        { length: targetVector.length },
        (_, i) => {
          if (indices.has(i)) return 1;
          else return 0;
        }
      );
      return buttonVector;
    });

    const problem: Problem = {
      buttonVectors,
      targetVector,
    };
    return problem;
  });

  let answer = 0;

  for (const problem of problems) {
    let minCoefficients = Infinity;

    const { targetVector, buttonVectors } = problem;
    const vectorLength = targetVector.length;
    const combinations = getAllBooleanCombinations(buttonVectors.length);

    for (const combination of combinations) {
      let value = Array.from({ length: vectorLength }, () => 0);
      combination.forEach((include, i) => {
        if (!include) return;

        value = arrayAdd(value, buttonVectors[i]);
      });

      if (value.map((i) => i % 2).join("") === targetVector.join("")) {
        const coefficients = combination.reduce(
          (sum, val) => sum + Number(val),
          0
        );
        minCoefficients = Math.min(minCoefficients, coefficients);
      }
    }

    answer += minCoefficients;
  }

  return answer;
}

function solvePart2(input: string) {}

console.log(solvePart1(exampleInput));
console.log(solvePart1(input1));

// console.log(solvePart2(exampleInput));
// console.log(solvePart2(input1));
