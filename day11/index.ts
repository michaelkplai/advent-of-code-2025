import { getInput } from "../utils";

const exampleInput = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

const OUT = "out";

const YOU = "you";

const input1 = getInput("day11/input1.txt");

type Node = {
  name: string;
  outputs: string[];
};
function solvePart1(input: string) {
  const nodes: Record<string, Node> = Object.fromEntries(
    input.split("\n").map((line) => {
      const [name, rest] = line.split(": ");
      const outputs = rest.split(" ");
      return [
        name,
        {
          name,
          outputs,
        },
      ];
    })
  );

  const stack = [YOU];

  let answer = 0;
  while (stack.length > 0) {
    const nodeName = stack.pop()!;
    if (nodeName === OUT) {
      answer++;
      continue;
    }

    const node = nodes[nodeName];
    stack.push(...node.outputs);
  }

  return answer;
}

// console.log(solvePart1(exampleInput));
// console.log(solvePart1(input1));

function part1Dp(input: string) {
  const nodes: Record<string, Node> = Object.fromEntries(
    input.split("\n").map((line) => {
      const [name, rest] = line.split(": ");
      const outputs = rest.split(" ");
      return [
        name,
        {
          name,
          outputs,
        },
      ];
    })
  );

  function numPaths(start: string, end: string): number {
    const cache: Record<string, number> = {};

    function _numPaths(_start: string) {
      if (cache[_start]) return cache[_start];

      let answer = 0;

      if (start === end) {
        answer = 1;
      } else {
        answer = nodes[_start].outputs.reduce(
          (sum, node) => sum + numPaths(node, end),
          0
        );
      }

      cache[_start] = answer;
      return answer;
    }

    return _numPaths(start);
  }

  return numPaths(YOU, OUT);
}
// console.log(part1Dp(exampleInput));
// console.log(part1Dp(input1));

const exampleInput2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

function solvePart2(input: string) {
  const nodes: Record<string, Node> = Object.fromEntries(
    input.split("\n").map((line) => {
      const [name, rest] = line.split(": ");
      const outputs = rest.split(" ");
      return [
        name,
        {
          name,
          outputs,
        },
      ];
    })
  );

  function numPaths(start: string, end: string): number {
    const cache: Record<string, number> = {};

    function _numPaths(_start: string) {
      if (cache[_start] !== undefined) return cache[_start];

      let answer = 0;

      if (_start === end) {
        answer = 1;
      } else if (nodes[_start]) {
        answer = nodes[_start].outputs.reduce(
          (sum, node) => sum + _numPaths(node),
          0
        );
      } else {
        // _start === out && end !== out
        answer = 0;
      }

      cache[_start] = answer;
      return answer;
    }

    return _numPaths(start);
  }

  return (
    numPaths("svr", "fft") * numPaths("fft", "dac") * numPaths("dac", OUT) +
    numPaths("svr", "dac") * numPaths("dac", "fft") * numPaths("fft", OUT)
  );
}

// console.log(solvePart2(exampleInput2));
console.log(solvePart2(input1));
