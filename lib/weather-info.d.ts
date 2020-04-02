import * as React from 'react';
import { Weather } from './weather';
declare const WeatherInfo: React.FC<{
    weather: Weather;
    parentChannel: (msg: string) => void;
}>;
export default WeatherInfo;
