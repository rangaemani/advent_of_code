function part_one(): number {
  let total_difference: number = 0;
  const [list_one, list_two] = parse_input();
  // console.log(list_one);
  // console.log(list_two);
  for (let index = 0; index < list_one.length; index++) {
    total_difference = total_difference +
      Math.abs((list_one[index]) - (list_two[index]));
  }
  return total_difference;
}

function part_two(): number {
  let similarity_score: number = 0;
  let [listOne, listTwo] = parse_input();
  listOne.forEach((listOneElement) => {
    similarity_score += listOneElement *
      listTwo.filter((listTwoElement) => listTwoElement == listOneElement)
        .length;
  });
  return similarity_score;
}

function parse_input(): [number[], number[]] {
  let listOne: string[] = [];
  let listTwo: string[] = [];
  const text = Deno.readTextFileSync("input.txt");
  const newlineSplitText = text.split("\n");

  newlineSplitText.forEach((element) => {
    const splitElement = element.split("   ");
    listOne.push(splitElement[0]);
    listTwo.push(splitElement[1]);
  });
  listOne = listOne.filter((element) => element !== "");
  listTwo = listTwo.filter((element) => element !== "");
  return [listOne.map(Number).sort(), listTwo.map(Number).sort()];
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(
    "Total difference between elements of list one and two:",
    part_one(),
  );
  console.log("Similarity score between list one and two:", part_two());
}
