import config from '../../config';
import fetch from 'isomorphic-unfetch';

import ParseKpTextData from './parseKpTextData';

const getKpForecast = async () => {
  console.log('FETCHING getKpForecast');
  const kpTextData = await fetch('http://services.swpc.noaa.gov/text/3-day-forecast.txt')
    .then(res => res.text());
  const formattedKpData = await ParseKpTextData(kpTextData);
  return formattedKpData;
}

const getWeatherForecastCurrentLocation = async () => {
  console.log('FETCHING getWeatherForecastCurrentLocation', 'key', config.IP_GEOLOCATION);
  const location = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${config.IP_GEOLOCATION}`)
    .then(res => res.json());
  const lat = await location.latitude;
  const long = await location.longitude;
  console.log('ADDRESS DATA:', 'lat', lat, 'long', long);
  const weather = await fetch(`https://api.darksky.net/forecast/${config.IP_DARK_SKY}/${lat},${long}?extend=hourly&exclude=currently,minutely,alerts,flags`, {
    mode: 'cors'
  })
    .then(res => res.json());
  console.log('WEATHER', weather);
}

const getWeatherForecastNewLocation = (address) => {
  console.log('FETCHING getWeatherForecastNewLocation');
}






export default {getKpForecast, getWeatherForecastCurrentLocation, getWeatherForecastNewLocation};


//   static async getInitialProps({ req }) {
//     const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
//     return { userAgent }
//   }


//   Page.getInitialProps = async ({ req }) => {
//   const res = await fetch('https://api.github.com/repos/zeit/next.js')
//   const json = await res.json()
//   return { stars: json.stargazers_count }
// }


// Index.getInitialProps = async function() {
//   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
//   const data = await res.json()

//   console.log(`Show data fetched. Count: ${data.length}`)

//   return {
//     shows: data
//   }
// }
