import { getInput } from "../utils";

const exampleInput = `987654321111111
811111111111119
234234234234278
818181911112111`;
const input1 = getInput("day3/input1.txt");

function solvePart1(input: string) {
  let answer = 0;

  const batteryPacks = input.split("\n");
  for (const batteryPack of batteryPacks) {
    const batteryArr = batteryPack.split("").map(Number);

    const maxOnesColumnByTenColumnIndex: Record<number, number> = {};

    let maxVal = -Infinity;
    for (let i = batteryPack.length - 2; i >= 0; i--) {
      maxVal = Math.max(batteryArr[i + 1], maxVal);
      maxOnesColumnByTenColumnIndex[i] = maxVal;
    }

    const maxValues = batteryArr
      .slice(0, -1)
      .map(
        (tensColumnValue, i) =>
          tensColumnValue * 10 + maxOnesColumnByTenColumnIndex[i]
      );

    answer += Math.max(...maxValues);
  }

  return answer;
}

function solvePart2(input: string) {
  function getMaxJoltage(batteryPack: string) {
    const batteryArr = batteryPack.split("").map(Number);

    let maxValues: number[] = [...batteryArr];

    let maxVal = -Infinity;
    for (let i = batteryArr.length - 1; i >= 0; i--) {
      maxVal = Math.max(batteryArr[i], maxVal);
      maxValues[i] = maxVal;
    }

    for (let column = 2; column <= 12; column++) {
      const maxColumnValues = [...maxValues];

      maxVal = -Infinity;
      for (let i = batteryArr.length - column; i >= 0; i--) {
        maxVal = Math.max(
          batteryArr[i] * 10 ** (column - 1) + maxValues[i + 1],
          maxVal
        );
        maxColumnValues[i] = maxVal;
      }

      maxValues = maxColumnValues;
    }

    return Math.max(...maxValues);
  }

  let answer = 0;

  const batteryPacks = input.split("\n");
  for (const batteryPack of batteryPacks) {
    answer += getMaxJoltage(batteryPack);
  }

  return answer;
}

console.log(solvePart1(exampleInput));
console.log(solvePart1(input1));
console.log(solvePart2(exampleInput));
console.log(solvePart2(input1));
