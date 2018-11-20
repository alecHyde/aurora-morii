
import React from 'react';
import Layout from '../components/Layout/layout';
import API from '../components/Forecast/API';

class AuroraForecast extends React.Component {
  constructor(props) {
    super(props)

  }

  static async getInitialProps() {
    const kpForecast = await API.getKpForecast();
    const weatherAndLocation = await API.getWeatherForecastCurrentLocation();
    return {
      kpForecastData: kpForecast,
      weatherAndLocationData: weatherAndLocation
    }
  }




  render () {
    return (
      <Layout>
        <h3> The Forecast goes here </h3>
        {console.log('UPDATED PROPS', this.props)}



      </Layout>
    )
  } 
} 




export default AuroraForecast;



