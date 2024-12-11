type Report = number[];

function partOne(): number {
  let safeReportCount: number = 0;
  let unsafeReportCount: number = 0;
  const unsafeReports: Report[] = [];
  const reportList = parse_input();
  reportList.forEach((report) => {
    // console.log("\n", report);

    if (isSafe(report)) {
      safeReportCount++;
      console.log(report, "\n");
    } else {
      unsafeReports.push(report);
    }
  });
  unsafeReports.forEach((report) => {
    unsafeReportCount++;
    // console.log("This report is unsafe: \n", report);
  });
  console.log("Unsafe reports: ", unsafeReportCount);

  return safeReportCount;
}

function isSafe(report: Report): boolean {
  if (report.length <= 1) {
    return false;
  }
  let isOnlyIncreasing = true;
  let isOnlyDecreasing = true;
  for (let index = 1; index < report.length; index++) {
    const difference = report[index] - report[index - 1];
    if (difference < 0) {
      isOnlyIncreasing = false;
    }
    if (difference > 0) {
      isOnlyDecreasing = false;
    }
    if (Math.abs(difference) > 3 || Math.abs(difference) < 1) {
      return false;
    }
  }
  return isOnlyIncreasing || isOnlyDecreasing;
}

function partTwo(): number {
  let safeReportCount: number = 0;
  let unsafeReportCount: number = 0;
  const reportList = parse_input();
  reportList.forEach((report: Report) => {
    // console.log("\n", report);

    if (isSafeWithDampener(report)) {
      safeReportCount++;
      console.log(report, "\n");
    } else {
      unsafeReportCount++;
    }
  });

  // console.log("Unsafe reports: ", unsafeReportCount);
  return safeReportCount;
}

function isSafeWithDampener(report: Report): boolean {
  if (isSafe(report)) {
    return true;
  }
  for (let i = 0; i < report.length; i++) {
    const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
    if (isSafe(modifiedReport)) {
      return true;
    }
  }
  return false;
}

function parse_input(): number[][] {
  const reportList: Report[] = [];
  const text = Deno.readTextFileSync("input.txt");
  const newlineSplitText = text.split("\n");
  newlineSplitText.forEach((element) => {
    const splitElement = element.split(" ");
    reportList.push(splitElement.map(Number));
  });
  // console.log(reportList);

  return reportList;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  // console.log("Safe reports: ", partOne());
  console.log("Safe reports with damper engaged: ", partTwo());
}
