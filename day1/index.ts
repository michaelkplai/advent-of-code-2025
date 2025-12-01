import { getInput } from "../utils";

const MIN = 0;
const MAX = 99;
const DIAL_SIZE = MAX - MIN + 1;

const DIAL_START = 50;

const exampleInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
const input1 = getInput("day1/input1.txt");

const parseTurn = (turnStr: string) => {
  const dir = turnStr.at(0);
  const value = Number(turnStr.slice(1));

  if (dir === "L") return -1 * value;
  else return value;
};

const getPassword = (inputStr: string) => {
  const getNextValue = (current: number, turn: number) => {
    const step1 = (current + turn) % DIAL_SIZE;
    if (step1 < 0) return step1 + DIAL_SIZE;
    else return step1;
  };

  let dialValue = DIAL_START;
  let passwordCount = 0;

  const directions = inputStr.split("\n");
  for (const direction of directions) {
    dialValue = getNextValue(dialValue, parseTurn(direction));
    if (dialValue === 0) passwordCount++;
  }

  return passwordCount;
};

const getPasswordPart2 = (inputStr: string) => {
  let dialValue = DIAL_START;
  let passwordCount = 0;

  const getNextValueV2 = (current: number, turn: number) => {
    const fullRotations = Math.floor(Math.abs(turn) / DIAL_SIZE);
    passwordCount += fullRotations;

    const absoluteTurnAmount = turn % DIAL_SIZE;
    if (absoluteTurnAmount === 0) return current;

    const reflexValue = current + absoluteTurnAmount;

    if (reflexValue >= MIN && reflexValue <= MAX) {
      if (reflexValue === 0) passwordCount++;
      return reflexValue;
    } else {
      // If we're not at the start, we've passed through the start and need to count it
      if (current !== 0) passwordCount++;

      if (reflexValue < MIN) return (reflexValue % DIAL_SIZE) + DIAL_SIZE;
      else return reflexValue % DIAL_SIZE;
    }
  };

  const directions = inputStr.split("\n");
  for (const direction of directions) {
    dialValue = getNextValueV2(dialValue, parseTurn(direction));
  }

  return passwordCount;
};

console.log(getPassword(exampleInput));
console.log(getPassword(input1));
console.log(getPasswordPart2(exampleInput));
console.log(getPasswordPart2(input1));
