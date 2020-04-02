import { ReactWidget } from '@jupyterlab/apputils';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { Weather } from './weather';
import WeatherInfo from './weather-info';

const has = (value: any): value is boolean => !!value;

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const suffix = '&units=imperial&appid=435348aa7ec3b2ac924fd375be949b2a';

const AppComponent = (): JSX.Element => {
  const [city, setCity] = useState('London');
  const [msgFromChild, setMsgFromChild] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    getWeather(city); 
  }, []);

  async function getWeather(location: string) {
    const response = await fetch(baseUrl + location + suffix);
    if (response.status === 200){
      const jsonWeather = await response.json();
      const cityTemp: Weather = jsonWeather.main;
      cityTemp.city=jsonWeather.name;
      setWeather(cityTemp);
    } else {
        setWeather(null);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getWeather(city);
    console.log(weather);
  };

  const getMsgFromChild = (msg: string) => setMsgFromChild(msg);

  const divStyle={
    verticalAlign: 'middle', backgroundImage: "url(" + "https://www.xda-developers.com/files/2018/05/android-weather-apps.png" + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'repeat', width: '100%', height: '100%'
  }
  const buttonStyle={
      backgroundColor: 'red', padding: 5, margin: 10, height: 25, color: 'white', fontSize: 15
  }
  const inputStyle={
    margin: 10, height: 25, borderColor: '#7a42f4', borderWidth: 1, fontSize: 15, padding: 4
  }

return (
    <>
    <div style={ divStyle }>
      <form style={{ textAlign: 'center', fontSize: 31, padding: 40, paddingBottom: 175 }} onSubmit = {handleSubmit}>
        <input style={ inputStyle } type="text" placeholder="Enter City"
               onInput = {handleChange} />
               <br />
        <button style={ buttonStyle } type="submit">Get Weather</button>
      </form>
      {msgFromChild}
      {has(weather) ? (
        <WeatherInfo weather = {weather} parentChannel = {getMsgFromChild}>
         </WeatherInfo> 
      ) : (
        <h2 style={{ textAlign: 'center' }}>Invalid Input!</h2>
      )}
    </div>
    </>
  );
};

export class AppWidget extends ReactWidget {

  constructor() {
    super();
  }

  render(): JSX.Element {
    return <AppComponent />;
  }
}