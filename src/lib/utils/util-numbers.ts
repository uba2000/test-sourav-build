export const formatNumberWithCommas = (val: number) => {
  return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
};
