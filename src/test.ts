const testArray = [[0], 1, 2, 3, [4, 5, [6, [7], 8]], 9];

export const flatAllNestedArray = <T>(arrayToFlat: T[]): T[] => {
  return arrayToFlat.reduce(
    (newArray: T[], arrayElement) =>
      Array.isArray(arrayElement)
        ? newArray.concat(flatAllNestedArray(arrayElement))
        : newArray.concat(arrayElement),
    []
  );
};

flatAllNestedArray(testArray);
