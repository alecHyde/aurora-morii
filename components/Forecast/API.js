import config from '../../config';
import fetch from 'isomorphic-unfetch';

import modifyData from './APIDataModifiers';


const getKpForecast = async () => {
  const kpTextData = await fetch('http://services.swpc.noaa.gov/text/3-day-forecast.txt')
    .then(res => res.text());
  const formattedKpData = await modifyData.ParseKpTextData(kpTextData);
  return formattedKpData;
}

const getWeatherForecastCurrentLocation = async () => {
  const location = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${config.IP_GEOLOCATION}`)
    .then(res => res.json());
  const lat = await location.latitude;
  const long = await location.longitude;
  const city = await location.city;
  // https://cors-anywhere.herokuapp.com/ is a workaround for CORS authentication. In production, all of this code would be 
  // behind a proxy server, and I would add CORS credentials from an express server to prevent exposing API keys. All of the 
  // API keys I am using are free accounts, with limits that reset every day or week, so I am not too concerned in this usecase.
  const weather = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${config.IP_DARK_SKY}/${lat},${long}?extend=hourly&exclude=currently,minutely,alerts,flags`)
    .then(res => res.text())
  const weatherObj = await JSON.parse(weather);
  // console.log('WEATHER', weatherObj);
  const trimmedWeatherObj = await modifyData.TrimWeatherData(weatherObj, city);
  return trimmedWeatherObj;
}

// FUTURE PLANS
// const getWeatherForecastNewLocation = (address) => {
//   console.log('FETCHING getWeatherForecastNewLocation');
// }


const combineDataObj = (kpForecast, cloudForecast) => {
  combineHourlyDataObj(kpForecast, cloudForecast)
  return combineDailyDataObj(kpForecast, cloudForecast)
}

const combineHourlyDataObj = (kpForecast, cloudForecast) => {
  kpForecast.coordinates = cloudForecast.coordinates;
  kpForecast.city = cloudForecast.city;
  
  let hourlyDataObj = {};
  kpForecast.breakdown.forEach(item => {
    hourlyDataObj[item.compare] = item;
  });

  kpForecast.hourlyDataObj = hourlyDataObj;
  // console.log('kpForecast one', kpForecast);
  cloudForecast.hourly.forEach(item => {
    if(kpForecast.hourlyDataObj[item.compare]) {
      kpForecast.hourlyDataObj[item.compare].cloudCover = item.cloudCover;
    }
  });
 
}

const combineDailyDataObj = (kpForecast, cloudForecast) => {
  let dailyDataObj = {};
  kpForecast.breakdown.forEach(item => {
    if(!dailyDataObj[item.day]) {
      dailyDataObj[item.day] = [ item ];
    } else {
      dailyDataObj[item.day].push(item);
    }
  });

  kpForecast.dailyDataObj = dailyDataObj;
  // console.log('kpForecast THIRD', kpForecast);
  cloudForecast.daily.forEach(item => {
    if(kpForecast.dailyDataObj[item.day]) {
      let arr = kpForecast.dailyDataObj[item.day];
      arr.sort((a, b) => a.timeNum - b.timeNum);
      let moon = item.moonPhase;
      arr.forEach(obj => obj.moonPhase = moon);
    }
  });

  let kpDailyForecastArray = [];
  for(let i in kpForecast.dailyDataObj) {
    kpDailyForecastArray.push(kpForecast.dailyDataObj[i]);
  }
  
  kpDailyForecastArray.sort((a, b) => {
    let aDate = new Date(a[0].start);
    let bDate = new Date(b[0].start);
    return aDate - bDate
  });
  
  kpForecast.dailyForecastArray = kpDailyForecastArray;
  return kpForecast
}


export default { getKpForecast, getWeatherForecastCurrentLocation, combineDataObj };



