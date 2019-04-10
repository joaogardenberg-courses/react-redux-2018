import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  render() {
    const cities = this.props.weather.map(this.renderWeather);

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          { cities }
        </tbody>
      </table>
    );
  }

  renderWeather(cityData) {
    const name = cityData.city.name;
    const temperatures = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const { lat, lon } = cityData.city.coord;

    return (
      <tr key={ name }>
        <td>
          <GoogleMap lat={ lat } lon={ lon } />
        </td>
        <td>
          <Chart data={ temperatures } color="green" unit="K" />
        </td>
        <td>
          <Chart data={ pressures } color="red" unit="hPa" />
        </td>
        <td>
          <Chart data={ humidities } color="blue" unit="%" />
        </td>
      </tr>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);