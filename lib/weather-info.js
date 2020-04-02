import * as React from 'react';
const WeatherInfo = ({ weather, children, parentChannel }) => {
    const { city, humidity, pressure, temp } = weather;
    return (React.createElement("div", { style: { fontSize: 13 } },
        children,
        React.createElement("div", { style: { textAlign: 'center' } },
            React.createElement("h2", null,
                "City        : ",
                city),
            React.createElement("h2", null,
                "Temperature : ",
                temp),
            React.createElement("h2", null,
                "Humidity    : ",
                humidity),
            React.createElement("h2", null,
                "Pressure    : ",
                pressure))));
};
export default WeatherInfo;
