export function dataToCSVFormat(data: IDataContact[] | null): string | null {
  if (!data) {
    return null;
  }

  // Replace all newline characters in each string and join properties with semicolons
  const replacedArray = data.map((obj) =>
    Object.values(obj)
      .map((value) => value.replace(/\n/g, ""))
      .join(";")
  );

  // Join array elements into a single CSV string with newline delimiter
  return replacedArray.join("\n");
}
