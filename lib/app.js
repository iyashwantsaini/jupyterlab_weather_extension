import { ReactWidget } from '@jupyterlab/apputils';
import React, { useEffect, useState } from 'react';
import WeatherInfo from './weather-info';
const has = (value) => !!value;
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const suffix = '&units=imperial&appid=435348aa7ec3b2ac924fd375be949b2a';
const AppComponent = () => {
    const [city, setCity] = useState('London');
    const [msgFromChild, setMsgFromChild] = useState('');
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        getWeather(city);
    }, []);
    async function getWeather(location) {
        const response = await fetch(baseUrl + location + suffix);
        if (response.status === 200) {
            const jsonWeather = await response.json();
            const cityTemp = jsonWeather.main;
            cityTemp.city = jsonWeather.name;
            setWeather(cityTemp);
        }
        else {
            setWeather(null);
        }
    }
    const handleChange = (event) => {
        setCity(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        getWeather(city);
        console.log(weather);
    };
    const getMsgFromChild = (msg) => setMsgFromChild(msg);
    const divStyle = {
        verticalAlign: 'middle', backgroundImage: "url(" + "https://www.xda-developers.com/files/2018/05/android-weather-apps.png" + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'repeat', width: '100%', height: '100%'
    };
    const buttonStyle = {
        backgroundColor: 'red', padding: 5, margin: 10, height: 25, color: 'white', fontSize: 15
    };
    const inputStyle = {
        margin: 10, height: 25, borderColor: '#7a42f4', borderWidth: 1, fontSize: 15, padding: 4
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: divStyle },
            React.createElement("form", { style: { textAlign: 'center', fontSize: 31, padding: 40, paddingBottom: 175 }, onSubmit: handleSubmit },
                React.createElement("input", { style: inputStyle, type: "text", placeholder: "Enter City", onInput: handleChange }),
                React.createElement("br", null),
                React.createElement("button", { style: buttonStyle, type: "submit" }, "Get Weather")),
            msgFromChild,
            has(weather) ? (React.createElement(WeatherInfo, { weather: weather, parentChannel: getMsgFromChild })) : (React.createElement("h2", { style: { textAlign: 'center' } }, "Invalid Input!")))));
};
export class AppWidget extends ReactWidget {
    constructor() {
        super();
    }
    render() {
        return React.createElement(AppComponent, null);
    }
}
