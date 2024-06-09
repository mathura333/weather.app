const roundOff = (num: number | string, places: number = 2) => {
  return +Number(num).toFixed(places);
};

export default roundOff;
