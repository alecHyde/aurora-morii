

const TrimWeatherData = (response) => {
  const trimmed = {};
  const trimmedDaily = response.daily.data.filter((item, index) => index < 4);
  const trimmedHourly = response.hourly.data.filter((item, index) => index < 72);
  trimmed.daily = trimmedDaily;
  trimmed.hourly = trimmedHourly;
  trimmed.coordinates = [response.latitude, response.longitude];
  trimmed.offset = response.offset;
  return trimmed;
}

export default TrimWeatherData;