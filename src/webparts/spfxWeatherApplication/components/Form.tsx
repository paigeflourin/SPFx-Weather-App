import * as React from 'react';
import PropTypes from 'prop-types';

import appClasses from './SpfxWeatherApplication.module.scss';

interface IForm {
  flexDirection:string;
  onSubmit: any;
}

export default class Form extends React.Component<any,any> {
    static defaultProps: {};
    static propTypes: {};

  constructor(props: any) {
    super(props);
    this.state = { city: '' };
  }

  handleInputChange = (event) => {
    this.setState({ city: event.target.value });
  }

  render() {
    const { city } = this.state;

    const styles = {
      formContainer: {
        alignItems: 'center' as 'center',
        display: 'flex' as 'flex',
        justifyContent: 'center' as 'center',
        flexDirection: 'column' as 'column'
      },
      input: {
        backgroundColor: '#ffffff' as '#ffffff',
        border: '1px solid #cccccc' as '1px solid #cccccc',
        borderRadius: '4px' as '4px',
        boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, .075)' as 'inset 0 1px 1px rgba(0, 0, 0, .075)',
        color: '#555555' as '#555555',
        display: 'block' as 'block',
        fontSize: '14px' as '14px',
        height: '34px' as '34px',
        lineHeight: '1.42857143' as '1.42857143',
        padding: '6px 12px' as '6px 12px',
        transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s' as 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
        width: '100%' as '100%'
      },
      button: {
        backgroundColor: '#5cb85c' as '#5cb85c',
        border: '1px solid transparent' as '1px solid transparent',
        borderColor: '#4cae4c' as '#4cae4c' ,
        borderRadius: '4px' as '4px', 
        color: '#ffffff' as '#ffffff',
        cursor: 'pointer' as 'pointer',
        display: 'inline-block' as 'inline-block',
        fontSize: '14px' as '14px',
        fontWeight: 'bold' as 'bold',
        lineFeight: '1.42857143' as '1.42857143',
        margin: '10px' as '10px',
        padding: '6px 12px' as '6px 12px',
        whiteSpace: 'nowrap' as 'nowrap'
      }
    };
    


    return (
      <div style={styles.formContainer}>
        <input
          style={styles.input}
          onChange={this.handleInputChange}
          placeholder="Cambridge"
          type="text"
          value={city}
        />
        <button style={styles.button} onClick={() => this.props.onSubmit(city)} type="button">
          Get Weather Forecast
        </button>
      </div>
    );
  }
}

Form.defaultProps = {
  flexDirection: 'column',
};

/*Form.propTypes = {
  flexDirection: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};*/

//export default Form;