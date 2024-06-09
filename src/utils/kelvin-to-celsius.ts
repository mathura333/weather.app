import roundOff from "./round-off";

const kelvinToCelsius = (tempInKelvin: number) => {
  return roundOff(tempInKelvin - 273.15, 1);
};

export default kelvinToCelsius;
