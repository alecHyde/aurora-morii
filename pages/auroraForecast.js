
import React from 'react';
import Layout from '../components/Layout/layout';
import API from '../components/Forecast/API';
import ForecastTable from '../components/Forecast/ForecastTable'

class AuroraForecast extends React.Component {
  constructor(props) {
    super(props)



    

    this.state = {
      lat: this.props.forecastData.coordinates[0],
      long: this.props.forecastData.coordinates[0],
      city: this.props.forecastData.city,
      issued: this.props.forecastData.issued
    }

  }

   

  static async getInitialProps() {
    const kpForecast = await API.getKpForecast();
    const weatherAndLocation = await API.getWeatherForecastCurrentLocation();
    const mergedData = await API.combineDataObj(kpForecast, weatherAndLocation);
    console.log('SHARED DATA', mergedData);
    return {
      forecastData: mergedData
    }
  }







  render () {
    return (
      <Layout>
        <h3> The Forecast goes here </h3>
        {console.log('UPDATED PROPS', this.props)}
        {console.log('UPDATED STATE', this.state)}
        <ForecastTable 
          forecastData={this.props.forecastData}
        />




      </Layout>
    )
  } 
} 




export default AuroraForecast;



