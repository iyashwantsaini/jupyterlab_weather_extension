import * as React from 'react';
import {Weather} from './weather';

const WeatherInfo: React.FC<{weather: Weather, parentChannel: (msg: string) => void }> = ({ weather, children, parentChannel }) => {

  const {city, humidity, pressure, temp} = weather;
  
    return (
      <div style={{ fontSize: 13 }}>
        {children}
        <div style={{ textAlign: 'center'}}>
          <h2>City        : {city}</h2>
          <h2>Temperature : {temp}</h2>
          <h2>Humidity    : {humidity}</h2> 
          <h2>Pressure    : {pressure}</h2>
        </div>
      </div>
    );
}

export default WeatherInfo;
