import * as React from 'react';
import Detail from './Detail';
import Forecast from './Forecast';
import  Form   from './Form';
import { BrowserRouter, Route } from 'react-router-dom';
import styles from './SpfxWeatherApplication.module.scss';
import { ISpfxWeatherApplicationProps } from './ISpfxWeatherApplicationProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SpfxWeatherApplication extends React.Component<ISpfxWeatherApplicationProps, void> {
  public render(): React.ReactElement<ISpfxWeatherApplicationProps> {
      return (
        <BrowserRouter>
        <div style={{ height: '100%' }}>
        <Route
            render={props => (
              <div className={styles.navbar}>
            
                <Form
                  flexDirection="row"
                  onSubmit={(city) => {
                    props.history.push({ // eslint-disable-line
                      pathname: '/forecast',
                      search: `?city=${city}`,
                    });
                  }}
                />
              </div>
            )}
          />
          
          <Route path="/forecast" component={Forecast} />
          <Route path="/details/:day" component={Detail} />
        </div>
      </BrowserRouter>
    );
  }
}
