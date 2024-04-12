export const calculateSimilarityCoefficient = (query: any, resultName: any) => {
  const startIndex = resultName.toLowerCase().indexOf(query.toLowerCase());
  if (startIndex === -1) {
    return 0;
  }
  return 1 / (startIndex + 1);
};
