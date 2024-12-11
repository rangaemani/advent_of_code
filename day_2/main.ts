function partOne(): number {
  let runningSum: number = 0;
  const numPairs = parse_input();
  numPairs.forEach((pair) => {
    runningSum += pair[0] * pair[1];
    // console.log(runningSum);
  });

  return runningSum;
}

function partTwo() {
  let runningSum: number = 0;
  const numPairs = parse_conditional_input();
  numPairs.forEach((pair) => {
    runningSum += pair[0] * pair[1];
    // console.log(runningSum);
  });

  return runningSum;
}

function parse_input(): number[][] {
  const numPairs: number[][] = [];
  const text = Deno.readTextFileSync("input.txt");
  // const newlineSplitText = text.split("\n");
  // newlineSplitText.forEach((element) => {
  //   const splitElement = element.split(" ");
  //   reportList.push(splitElement.map(Number));
  // });
  // console.log(reportList);
  const mulOperations = Array.from(text.matchAll(/mul\([0-9]+,[0-9]+\)/g));
  // console.log(mulOperations);

  const parsedOps = mulOperations.map(String).join("\n");
  // console.log(parsedOps);
  const operandPairs = Array.from(parsedOps.matchAll(/[0-9]+,[0-9]+/g)).map(
    String,
  );
  operandPairs.forEach((element) => {
    const splitElement = element.split(",").map(Number);
    // console.log(splitElement);
    numPairs.push(splitElement);
  });
  return numPairs;
}

function parse_conditional_input(): number[][] {
  const numPairs: number[][] = [];
  const validOperators: string[] = [];
  const text = Deno.readTextFileSync("input.txt");
  const mulOperations = Array.from(
    text.matchAll(/mul\([0-9]+,[0-9]+\)|don\'t\(\)|do\(\)/g),
  ).map(String);
  // console.log(mulOperations);
  let doFlag = false;
  mulOperations.forEach((operator) => {
    if (operator == "do()") {
      doFlag = true;
    } else if (operator == "don't()") {
      doFlag = false;
    } else {
      if (doFlag) {
        const trimmedElement = Array.from(operator.matchAll(/[0-9]+,[0-9]+/g))
          .map(
            String,
          );
        // console.log(trimmedElement);
        trimmedElement.forEach((element) => {
          const splitElement = element.split(",").map(Number);
          numPairs.push(splitElement);
          // console.log(splitElement);
        });
      }
    }
  });
  return numPairs;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Total mul operation sum:", partOne());
  console.log("Total mul operations sum with conditionals:", partTwo());
}
