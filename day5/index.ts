import { getInput } from "../utils";

const exampleInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

const input1 = getInput("day5/input1.txt");

function solvePart1(input: string) {
  const [rangesStr, itemsStr] = input.split("\n\n");
  const ranges = rangesStr
    .split("\n")
    .map((rangeStr) => {
      const rangeArr = rangeStr.split("-");
      return [Number(rangeArr[0]), Number(rangeArr[1])];
    })
    .sort(([aMin], [bMin]) => {
      return aMin - bMin;
    }) as [number, number][];
  const items = itemsStr
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);

  if (!ranges.length || !items.length) return 0;

  let answer = 0;

  let rangeIndex = 0;
  let itemIndex = 0;
  while (rangeIndex < ranges.length && itemIndex < items.length) {
    const item = items[itemIndex];
    const [min, max] = ranges[rangeIndex];
    // console.log(item, { min, max });

    if (item < min) {
      itemIndex++;
    } else if (min <= item && item <= max) {
      itemIndex++;
      answer++;
      continue;
    } else {
      rangeIndex++;
    }
  }

  return answer;
}

console.log(solvePart1(exampleInput));
console.log(solvePart1(input1));

const exampleInput2 = `3-5
10-14
16-20
12-18`;

const input2 = getInput("day5/input2.txt");

const EMPTY_RANGE: [number, number] = [1, 0];

function solvePart2(input: string) {
  const ranges = input
    .split("\n")
    .map((rangeStr) => {
      const rangeArr = rangeStr.split("-");
      return [Number(rangeArr[0]), Number(rangeArr[1])];
    })
    .sort(([aMin, aMax], [bMin, bMax]) => {
      if (aMin === bMin) return aMax - bMax;
      return aMin - bMin;
    }) as [number, number][];

  if (ranges.length === 0) return 0;
  if (ranges.length === 1) return ranges[0][1] - ranges[0][0] + 1;

  for (let i = 0; i < ranges.length - 1; i++) {
    const [min, max] = ranges[i];
    const [nextMin, nextMax] = ranges[i + 1];

    if (min === nextMin) {
      // Merge since we know that max <= nextMax
      ranges[i] = EMPTY_RANGE;
      continue;
    }

    // min < nextMin
    if (max < nextMin) continue;

    if (max <= nextMax) {
      // Order is min, nextMin|max, nextMax
      ranges[i] = EMPTY_RANGE;
      ranges[i + 1] = [min, nextMax];
    } else {
      // max > nextMax
      ranges[i] = EMPTY_RANGE;
      ranges[i + 1] = [min, max];
    }
  }

  return ranges.reduce((sum, [min, max]) => {
    return sum + (max - min + 1);
  }, 0);
}

console.log(solvePart2(exampleInput2));
console.log(solvePart2(input2));
