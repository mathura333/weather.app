import roundOff from "./round-off";

const mpsToKph = (speedInMps: number) => {
  return roundOff(speedInMps * 3.6, 2);
};

export default mpsToKph;
