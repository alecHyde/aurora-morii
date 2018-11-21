
const ParseKpTextData = (text) => {

  let issuedMatch = text.match(/Issued: (\d+) (\w+) (\d+) (\d{2})(\d{2}) UTC/);
  if (!issuedMatch) { 
    throw new Error('Failed to parse issued timestamp'); 
  }
  let issued = new Date(issuedMatch[1] + ' ' + issuedMatch[2] + ' ' + issuedMatch[3] + ' ' + issuedMatch[4] + ':' + issuedMatch[5] + ' UTC');
  let year = issuedMatch[1];

  // Parse the breakdown dates
  let datesMatch = text.match(/([A-Z][a-z]{2}) ([0-9]{2})\s+([A-Z][a-z]{2}) ([0-9]{2})\s+([A-Z][a-z]{2}) ([0-9]{2})/);
  if (!datesMatch) { 
    throw new Error('Failed to parse issued dates'); 
  }

  // Capture the data rows
  let dataMatch = text.match(/(\d{2})-(\d{2})UT\s+(\d)\s+(\d)\s+(\d)/g);
  if (!dataMatch || !dataMatch.length == 8) { 
    throw new Error('Failed to find data'); 
  }

  // Parse the data rows
  let breakdown = [];
  for (let i = 0; i < dataMatch.length; i++) {
    let lineMatch = dataMatch[i].match(/(\d{2})-(\d{2})UT\s+(\d)\s+(\d)\s+(\d)/);
    if (!lineMatch) { 
      throw new Error('Failed to parse line'); 
    }
    breakdown.push({
      start: new Date([year, datesMatch[1], datesMatch[2], lineMatch[1] + ':00', 'UTC'].join(' ')),
      kp: lineMatch[3]
    });
    breakdown.push({
      start: new Date([year, datesMatch[3], datesMatch[4], lineMatch[1] + ':00', 'UTC'].join(' ')),
      kp: lineMatch[4]
    });
    breakdown.push({
      start: new Date([year, datesMatch[5], datesMatch[6], lineMatch[1] + ':00', 'UTC'].join(' ')),
      kp: lineMatch[5]
    });
  }
  // most of the above code was appropriated from https://github.com/evanchiu/aurora-api/blob/master/src/parse.js

  breakdown.forEach(item => {
    item.start = item.start.toString();
    item.compare = item.start.slice(8, 10) + item.start.slice(16, 18);
    item.day = item.start.slice(0, 10);
    item.time = item.start.slice(16, 18);
    item.timeNum = Number(item.start.slice(16, 18));
  });

  return {
    issued,
    breakdown
  }

}


const TrimWeatherData = (response, city) => {
  
  const trimmed = {};
  const trimmedDaily = response.daily.data.filter((item, index) => index < 5);

  trimmedDaily.forEach(item => {
    delete item.apparentTemperatureHigh;
    delete item.apparentTemperatureHighTime;
    delete item.apparentTemperatureLow;
    delete item.apparentTemperatureLowTime;
    delete item.apparentTemperatureMax;
    delete item.apparentTemperatureMaxTime;
    delete item.apparentTemperatureMin;
    delete item.apparentTemperatureMinTime;
    delete item.cloudCover;
    delete item.dewPoint;
    delete item.humidity;
    delete item.icon;
    delete item.ozone;
    delete item.precipIntensity;
    delete item.precipIntensityMax;
    delete item.precipIntensityMaxTime;
    delete item.precipProbability;
    delete item.precipType;
    delete item.pressure;
    delete item.summary;
    delete item.temperatureHigh;
    delete item.temperatureHighTime;
    delete item.temperatureLow;
    delete item.temperatureLowTime;
    delete item.temperatureMax;
    delete item.temperatureMaxTime;
    delete item.temperatureMin;
    delete item.temperatureMinTime;
    delete item.uvIndex;
    delete item.uvIndexTime;
    delete item.visibility;
    delete item.windBearing;
    delete item.windGust;
    delete item.windGustTime;
    delete item.windSpeed;
    item.time = new Date(Number(item.time.toString() + '000')).toString();
    item.sunriseTime = new Date(Number(item.sunriseTime.toString() + '000')).toString();
    item.sunsetTime = new Date(Number(item.sunsetTime.toString() + '000')).toString();
  })

  trimmedDaily.forEach(item => {
    item.time = item.time.toString();
    item.sunriseTime = item.sunriseTime.toString();
    item.sunsetTime = item.sunsetTime.toString();
    item.day = item.time.slice(0, 10);
  })

  const trimmedHourly = response.hourly.data.filter((item, index) => index < 72);
  
  trimmedHourly.forEach(item => {
    delete item.apparentTemperature;
    delete item.dewPoint;
    delete item.humidity;
    delete item.icon;
    delete item.ozone;
    delete item.precipIntensity;
    delete item.precipProbability;
    delete item.precipType;
    delete item.pressure;
    delete item.summary;
    delete item.uvIndex;
    delete item.visibility;
    delete item.windBearing;
    delete item.windGust;
    delete item.windSpeed;
    item.time = new Date(Number(item.time.toString() + '000'))
  });

  trimmedHourly.forEach(item => {
    item.time = item.time.toString();
    item.compare = item.time.slice(8, 10) + item.time.slice(16, 18);
    item.day = item.time.slice(0, 10);
  })

  trimmed.daily = trimmedDaily;
  trimmed.hourly = trimmedHourly;
  trimmed.coordinates = [response.latitude, response.longitude];
  trimmed.city = city;
  trimmed.offset = response.offset;

  return trimmed;
}



export default { ParseKpTextData, TrimWeatherData }




