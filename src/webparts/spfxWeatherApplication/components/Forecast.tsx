/* global fetch */

import * as React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import ReactAnimatedWeather from 'react-animated-weather';
import appClasses from './SpfxWeatherApplication.module.scss';
import { getIcon } from '../utils/getIcon';

const baseURL = 'https://api.openweathermap.org/data/2.5/';
const APIKEY = 'e157ce238d967d8f28da1df242247ae9';



const styles = {
  dayContainer: {
    alignItems: 'center' as 'center',
    cursor: 'pointer' as 'pointer',
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    margin: '35px' as '35px',
    flex: '1' as '1'
  },
  dateStyle: {
    fontSize: '20px' as '20px',
    color: '#333333' as '#333333',
    fontWeight: 'normal' as 'normal',
    width: '200px' as '200px',
    textAlign: 'center' as 'center'
  },
  
  temperature: {
    fontSize: '15px' as '15px',
    color: '#0A98F5' as '#0A98F5',
    paddingBottom: '10px' as '10px'
  },

  forecastContainer: {
    display: 'flex' as 'flex',
    justifyContent:'space-between' as 'space-between',
    alignItems: 'center' as 'center',
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap',
    margin: '50px auto' as '50px auto',
    maxWidth: '1200px' as '1200px'
  },
  forecastHeader: {
    fontSize: '45px' as '45px',
    color: '#333333' as '#333333',
    fontWeight: 'normal' as 'normal',
    textAlign: 'center' as 'center',
    width: '100%' as '100%'
  }
};


export const Day: React.SFC<any> = props => {
//export const Day = (props) => {
  const date = props.day.dt;
  const icon = getIcon(props.day.weather[0].id);
  const animate = true;
  const iconSize = 64;
  const iconColor = 'black';
  console.log(props);
  return (
    <div style={styles.dayContainer} onClick={props.onClick} role="link">
        <h2 style={styles.dateStyle}>{(new Date(date * 1000)).toDateString()} - {(new Date(date * 1000)).toLocaleTimeString()}</h2>
        <span style={styles.temperature}>{props.day.main.temp} &#176;C </span>
       <ReactAnimatedWeather
            icon={icon}
            color={iconColor}
            size={iconSize}
            animate={animate}
        />
    </div>
  );
};

Day.defaultProps = {
  onClick: () => {},
};

Day.propTypes = {
  //day: PropTypes.shape({
  //  dt: PropTypes.number.isRequired,
  //  weather: PropTypes.array.isRequired,
  //}).isRequired,
  //onClick: PropTypes.func,


};

class Forecast extends React.Component<any,any> {

  

  constructor(props: any) {
    super(props);
    this.state = { city: '', forecast: [], loading: true };
  }

  componentDidMount() {
    console.log(this.props.location.search);
    let cityName = this.props.location.search.split('=')[1];
    console.log(cityName);
    //const city = queryString.parse(this.props.location.search).city; // eslint-disable-line
    this.fetchWeather(cityName);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search === nextProps.location.search) { // eslint-disable-line
      return;
    }
    let cityName = nextProps.location.search.split('=')[1];
    //const city = queryString.parse(nextProps.location.search).city; // eslint-disable-line
    this.fetchWeather(cityName);
  }

  fetchWeather = (city) => {
    console.log(city);
    this.setState({ city, loading: true });
    const cityHTTP = city.split(' ').join('%20');
    fetch(`${baseURL}forecast?q=${cityHTTP}&APPID=${APIKEY}&units=metric&cnt=6&type=accurate`)
      .then(response => response.json())
      .then((json) => {
        this.setState({ forecast: json.list, loading: false });
      });
      console.log("forecast");
      console.log(this.state);
  }

  handleClick = (day) => {
    this.props.history.push({ // eslint-disable-line
      pathname: `/details/${this.state.city}`,
      state: day,
    });
  }

  render() {
      console.log("render");
      //console.log(this.state);
    const { city, forecast } = this.state;
    console.log(forecast);
    return this.state.loading ?
      <h1 style={styles.forecastHeader}>Loading...</h1> :
      (
        <div style={styles.forecastContainer}>
          <h1 style={styles.forecastHeader}>{city}</h1>
          {forecast.map(day =>
            <Day key={day.dt} day={day} onClick={() => this.handleClick(day)} />,
          )}
        </div>
      );
  }
}

export default Forecast;