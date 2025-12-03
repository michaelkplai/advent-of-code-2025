import { getInput } from "../utils";

const exampleInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;
const input1 = getInput("day2/input1.txt");

function solvePart1(input: string) {
  const idRanges = input.split(",").map((ids) => {
    const idsArray = ids.split("-").map(Number);
    return [idsArray[0], idsArray[1]];
  });

  function isInvalid(id: number) {
    const idString = id.toString(10);
    if (idString.length % 2 !== 0) return false;

    const midIndex = idString.length / 2;

    return idString.slice(0, midIndex) === idString.slice(midIndex);
  }

  let answer = 0;

  for (const range of idRanges) {
    const [start, end] = range;
    for (let i = start; i <= end; i++) {
      if (isInvalid(i)) answer += i;
    }
  }

  return answer;
}

function solvePart2(input: string) {
  const idRanges = input.split(",").map((ids) => {
    const idsArray = ids.split("-").map(Number);
    return [idsArray[0], idsArray[1]];
  });

  function isInvalid(id: number) {
    const idString = id.toString(10);

    const midIndex = Math.floor(idString.length / 2);

    for (let index = 1; index <= midIndex; index++) {
      const value = idString.slice(0, index);
      const remaining = idString.slice(index);

      const regex = new RegExp(`^(${value})+$`);

      if (remaining.match(regex)) return true;
    }

    return false;
  }

  let answer = 0;

  for (const range of idRanges) {
    const [start, end] = range;
    for (let i = start; i <= end; i++) {
      if (isInvalid(i)) {
        answer += i;
      }
    }
  }

  return answer;
}

console.log(solvePart1(exampleInput));
console.log(solvePart1(input1));
console.log(solvePart2(exampleInput));
console.log(solvePart2(input1));
