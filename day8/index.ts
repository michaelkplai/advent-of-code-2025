import { getInput } from "../utils";

const exampleInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

const input1 = getInput("day8/input1.txt");

function solvePart1(input: string, pairs: number) {
  const coords = input
    .split("\n")
    .map((row) => row.split(","))
    .map(
      (coords) =>
        [Number(coords[0]), Number(coords[1]), Number(coords[2])] as const
    );

  const distances: { i: number; j: number; distance: number }[] = [];
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const [x1, y1, z1] = coords[i];
      const [x2, y2, z2] = coords[j];
      const distance = Math.sqrt(
        (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2
      );
      distances.push({
        i,
        j,
        distance,
      });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);

  const coordsToCircuit: Set<number>[] = Array.from(
    { length: coords.length },
    (_, i) => new Set([i])
  );

  for (const pair of distances.slice(0, pairs)) {
    const { i, j } = pair;
    const newSet = new Set([...coordsToCircuit[i], ...coordsToCircuit[j]]);
    for (const coord of newSet) {
      coordsToCircuit[coord] = newSet;
    }
  }

  const circuits = Array.from(new Set(Object.values(coordsToCircuit)));
  circuits.sort((a, b) => b.size - a.size);

  const threeLargestCircuits = circuits.slice(0, 3);
  return threeLargestCircuits.reduce(
    (product, circuit) => product * circuit.size,
    1
  );
}

function solvePart2(input: string) {
  const coords = input
    .split("\n")
    .map((row) => row.split(","))
    .map(
      (coords) =>
        [Number(coords[0]), Number(coords[1]), Number(coords[2])] as const
    );

  const distances: { i: number; j: number; distance: number }[] = [];
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const [x1, y1, z1] = coords[i];
      const [x2, y2, z2] = coords[j];
      const distance = Math.sqrt(
        (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2
      );
      distances.push({
        i,
        j,
        distance,
      });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);

  const coordsToCircuit: Set<number>[] = Array.from(
    { length: coords.length },
    (_, i) => new Set([i])
  );

  for (const pair of distances) {
    const { i, j } = pair;
    const newSet = new Set([...coordsToCircuit[i], ...coordsToCircuit[j]]);
    for (const coord of newSet) {
      coordsToCircuit[coord] = newSet;
    }

    if (newSet.size === coords.length) {
      return coords[i][0] * coords[j][0];
    }
  }

  throw new Error("No solution found");
}

console.log(solvePart1(exampleInput, 10));
console.log(solvePart1(input1, 1000));

console.log(solvePart2(exampleInput));
console.log(solvePart2(input1));
