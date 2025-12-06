import { getInput } from "../utils";

const exampleInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

const input1 = getInput("day6/input1.txt");

function solvePart1(input: string) {
  const grid = input.split("\n").map((row) => {
    return row.trim().split(/\s+/);
  });
  const height = grid.length;
  const width = grid[0].length;

  const columns: string[][] = [];
  for (let i = 0; i < width; i++) {
    const column: string[] = [];
    for (let j = 0; j < height; j++) {
      column.push(grid[j][i]);
    }

    columns.push(column);
  }

  let answer = 0;

  for (const column of columns) {
    const operator = column.at(-1);
    const terms = column.slice(0, -1);
    if (operator === "*") {
      answer += terms.reduce((product, term) => product * Number(term), 1);
    } else {
      answer += terms.reduce((sum, term) => sum + Number(term), 0);
    }
  }

  return answer;
}

function solvePart2(input: string) {
  const lines = input.split("\n");
  const width = lines[0].length;
  const height = lines.length;

  let answer = 0;
  let terms: number[] = [];
  let operator: string | undefined;

  const computeCurrentColumn = () => {
    if (operator === "*") {
      answer += terms.reduce((product, term) => product * Number(term), 1);
    } else {
      answer += terms.reduce((sum, term) => sum + Number(term), 0);
    }

    terms = [];
    operator = undefined;
  };

  for (let x = 0; x < width; x++) {
    if (!operator) {
      operator = lines[height - 1][x];
    }

    let strTerm = ``;
    for (let y = 0; y < height - 1; y++) {
      strTerm += lines[y][x];
    }
    const numericTerm = Number(strTerm);

    if (numericTerm === 0) {
      computeCurrentColumn();
    } else {
      terms.push(Number(strTerm));
    }
  }

  computeCurrentColumn();

  return answer;
}

console.log(solvePart1(exampleInput));
console.log(solvePart1(input1));

console.log(solvePart2(exampleInput));
console.log(solvePart2(input1));
