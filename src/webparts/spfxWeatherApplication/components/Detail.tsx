import * as React from 'react';

import { Day } from './Forecast';
import appClasses from './SpfxWeatherApplication.module.scss';

export default class Detail extends React.Component<any,any> {


  
  render() {
    const { state } = this.props.location; // eslint-disable-line

    const styles = {
      detailContainer: {
        fontSize: '34px' as '34px' ,
        fontWeight: 'normal' as 'normal',
        maxWidth: '400px' as '400px',
        margin: '0 auto' as '0 auto' ,
        textAlign: 'center' as 'center'
      },
      details: {
        fontSize: '20px' as '20px'
      }
    };
    
    console.log(state);
    return (
      <div>
        <Day day={state} />
        <div style={styles.detailContainer}>
          <p>{state.city}</p>
          <p style={styles.details}>{state.weather[0].description}</p>
          <p style={styles.details}>Low: {state.main.temp_min}°C</p>
          <p style={styles.details}>High: {state.main.temp_max}°C</p>
          <p style={styles.details}>Humidity: {state.main.humidity}</p>
        </div>
      </div>
    );
  }
}